import { Pagination, Searchbar, Spinner } from "@ui/components";
import { useEffect } from "react";
import { useCharacters } from "../../hooks";
import { CharacterCard } from "../CharacterCard/CharacterCard";
import styles from "./CharactersList.module.css";

export const CharactersList: React.FC = () => {
  const { areMoreCharactersAvailable, getCharacters, getByName, characters, numberCharactersShowing, isLoading } =
    useCharacters();

  useEffect(() => {
    getCharacters(10);
  }, []);

  return (
    <>
      <Searchbar placeholder="Name of character" onClick={getByName} inputName="searchCharacter" />

      {/* Show spinner with characters at the background when click in Pagination */}
      <Spinner visibility={isLoading ? "visible" : "hidden"} />

      {!isLoading && characters.length === 0 ? (
        <div>No Results</div>
      ) : (
        <>
          <div className={styles.charactersList}>
            {characters.map((character) => {
              const cardData = {
                name: character?.name ?? "",
                description: character?.description || "(No description available)",
                imageData: character?.thumbnail ?? { path: undefined, extension: undefined },
                linkToMoreInfo: character?.urls?.find((url) => url.type === "comiclink")?.url ?? "", // setted comiclink because detail and wiki urls are not working properly in the Marvel API
              };

              return <CharacterCard key={character.id} character={cardData} />;
            })}
          </div>
          {characters.length > 0 && (
            <div className={styles.pagination}>
              <Pagination
                isDisabled={isLoading ? true : !areMoreCharactersAvailable}
                onClick={() => getCharacters(numberCharactersShowing + 10)}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
