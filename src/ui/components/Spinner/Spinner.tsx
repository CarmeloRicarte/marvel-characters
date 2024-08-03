import styles from "./Spinner.module.css";

type SpinnerProps = {
  visibility: "hidden" | "visible";
};

export const Spinner = ({ visibility }: SpinnerProps) => {
  return (
    <div
      style={{ visibility: visibility }}
      className={styles["fullscreen-container"]}
      data-testid="fullscreen-container"
    >
      <div className={styles["spinner-container"]} data-testid="spinner-container">
        <div className={styles.spinner} data-testid="spinner" />
      </div>
    </div>
  );
};
