import styles from "./Spinner.module.css";

export const Spinner = () => {
  return (
    <div className={styles["fullscreen-container"]} data-testid="fullscreen-container">
      <div className={styles["spinner-container"]} data-testid="spinner-container">
        <div className={styles.spinner} data-testid="spinner" />
      </div>
    </div>
  );
};
