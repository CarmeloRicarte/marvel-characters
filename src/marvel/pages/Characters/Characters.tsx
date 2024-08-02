import { CharactersList } from "@marvel/components";
import { Attribution, Pagination } from "@ui/components";
import { useEffect } from "react";
import { getCharactersPaginated } from "../../helpers";

const getCharacters = async () => {
  await getCharactersPaginated()
    .then((res) => console.log(res))
    .catch((error) => {
      console.log(error);
    });
};

export const CharactersPage: React.FC = () => {
  useEffect(() => {
    getCharacters();
  }, []);

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
