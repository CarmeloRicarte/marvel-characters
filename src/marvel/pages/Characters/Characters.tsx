import { CharactersList } from "@marvel/components";
import { Attribution } from "@ui/components";
import styles from "./Characters.module.css";

export const CharactersPage: React.FC = () => {
  return (
    <main className={styles.main}>
      <h1>Search your character</h1>
      <CharactersList />
      <footer className={styles.footer}>
        <Attribution />
      </footer>
    </main>
  );
};
