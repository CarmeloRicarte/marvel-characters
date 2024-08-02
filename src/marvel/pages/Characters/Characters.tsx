import { CharactersList } from "@marvel/components";
import { Attribution, Pagination } from "@ui/components";

export const CharactersPage: React.FC = () => {
  return (
    <>
      <h1>Search your character</h1>
      <CharactersList />
      <Pagination />
      <footer>
        <Attribution />
      </footer>
    </>
  );
};
