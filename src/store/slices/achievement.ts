import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { getAchievements } from "../../services/achievementService";
import { NormalizedTreeAchievements } from "../../models/NormalizedTreeAchievements";
import { StatusAchievements } from "../../enums/StatusAchievements";
import { normalizeTree } from "../../utils/normalizeTree";
import { RootState } from "..";

export const fetchAchievements = createAsyncThunk(
  "skill-tree/fetchAchievements",
  async () => {
    const data = await getAchievements();
    return data;
  }
);

export interface AchievementState {
  achievements: NormalizedTreeAchievements | null;
  status: StatusAchievements;
  error: string;
}

const initialState: AchievementState = {
  achievements: null,
  status: StatusAchievements.IDLE,
  error: "",
};

export const slice = createSlice({
  name: "skill-tree",
  initialState,
  reducers: {
    completeAchievement(state, action: PayloadAction<number>) {
      if (state.achievements)
        state.achievements[action.payload].completed = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAchievements.pending, (state) => {
      state.status = StatusAchievements.LOADING;
    });
    builder.addCase(fetchAchievements.fulfilled, (state, action) => {
      state.status = StatusAchievements.SUCCESS;
      state.achievements = normalizeTree(action.payload).normalizedTree;
    });
    builder.addCase(fetchAchievements.rejected, (state, action) => {
      state.status = StatusAchievements.ERROR;
      state.error = `${action.error.name ?? ""} ${action.error.message}`;
    });
  },
});

// Action creators are generated for each case reducer function
export const { completeAchievement } = slice.actions;

// Selectors
export const selectAchievements = (
  state: RootState
): NormalizedTreeAchievements | null => state.achievement.achievements;

export const selectStateAchievements = (state: RootState): AchievementState =>
  state.achievement;

const makeSelectAchievementById = () =>
  createSelector(
    [selectAchievements, (_: RootState, id: number | null) => id],
    (achievements, id) => {
      if (!achievements || !id) return null;
      return achievements[id];
    }
  );

export const selectAchievement = makeSelectAchievementById();

export default slice.reducer;
