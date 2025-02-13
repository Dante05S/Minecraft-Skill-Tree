import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.root_loader}>
      <div
        className={styles.loader}
        style={{ animation: "loader-anim 1s infinite linear" }}
      />
      <p>Cargando logros...</p>
    </div>
  );
}

export default Loader;
