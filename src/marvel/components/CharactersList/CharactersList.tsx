import { Pagination, Spinner } from "@ui/components";
import { useEffect } from "react";
import { useCharacters } from "../../hooks";
import { CharacterCard } from "../CharacterCard/CharacterCard";
import styles from "./CharactersList.module.css";

export const CharactersList: React.FC = () => {
  const { areMoreCharactersAvailable, getCharacters, characters, numberCharactersShowing, isLoading } = useCharacters();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getCharacters(10);
  }, []);

  return isLoading && characters.length === 0 ? (
    <Spinner visibility={isLoading ? "visible" : "hidden"} />
  ) : (
    <>
      <Spinner visibility={isLoading ? "visible" : "hidden"} />{" "}
      {/* Show spinner with characters at the background when click in Pagination */}
      {characters.length === 0 ? (
        <p>No results</p>
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
          <div className={styles.pagination}>
            <Pagination
              isDisabled={isLoading ? true : !areMoreCharactersAvailable}
              onClick={() => getCharacters(numberCharactersShowing + 10)}
            />
          </div>
        </>
      )}
    </>
  );
};
