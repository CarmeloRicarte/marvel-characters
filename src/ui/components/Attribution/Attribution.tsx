import styles from "./Attribution.module.css";
export const Attribution = () => {
  const actualYear = new Date().getFullYear();
  return (
    <small>
      Data provided by Marvel.
      <a className={styles.link} href="https://marvel.com" target="_blank" rel="noreferrer">
        {` © ${actualYear} Marvel`}
      </a>
    </small>
  );
};
