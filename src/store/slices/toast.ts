import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AchievementType } from "../../models/NormalizedTreeAchievements";
import { RootState } from "..";

export type ToastType = Omit<
  AchievementType,
  "parentId" | "children" | "completed" | "description" | "id"
>;

export interface ToastState {
  queue: ToastType[];
}

const initialState: ToastState = {
  queue: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<ToastType>) => {
      state.queue.push(action.payload);
    },
    removeToast: (state) => {
      state.queue.shift();
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export const selectQueue = (state: RootState): ToastType[] => state.toast.queue;

export default toastSlice.reducer;
