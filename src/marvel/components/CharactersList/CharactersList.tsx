import { DEFAULT_STATE_VALUE, useCharacters } from "@marvel/hooks";
import { Pagination, Searchbar, Spinner } from "@ui/components";
import { useEffect, useState } from "react";
import { CharacterCard } from "../CharacterCard/CharacterCard";
import styles from "./CharactersList.module.css";

export const CharactersList: React.FC = () => {
  const {
    areMoreCharactersAvailable,
    getCharacters,
    getByName,
    characters,
    searchedCharacterResults,
    areMoreCharactersSearchedAvailable,
    recordsPerPageCharacters,
    recordsPerPageSearch,
    setSearchedCharacterResults,
    getFromRecordNumberCharacters,
    getFromRecordNumberSearch,
    isLoading,
    hasSearchedByName,
    setHasSearchedByName,
  } = useCharacters();

  const [registerToSearch, setRegisterToSearch] = useState("");

  useEffect(() => {
    getCharacters(10, 0);
  }, []);

  const resetSearchbar = () => {
    setSearchedCharacterResults(DEFAULT_STATE_VALUE);
    setHasSearchedByName(false);
  };

  const onClickPaginationCharacters = () => {
    getCharacters(recordsPerPageCharacters, getFromRecordNumberCharacters + 10);
  };

  const onClickPaginationSearchResults = () => {
    getByName(registerToSearch, recordsPerPageSearch, getFromRecordNumberSearch + 10);
  };

  return (
    <>
      <Searchbar
        placeholder="Name of character"
        onClick={getByName}
        registerToSearch={registerToSearch}
        setRegisterToSearch={setRegisterToSearch}
        setResetSearchState={resetSearchbar}
        inputName="searchCharacter"
      />
      {/* Show spinner with characters at the background when click in Pagination */}
      <Spinner visibility={isLoading ? "visible" : "hidden"} />
      {!isLoading &&
        ((characters.length === 0 && searchedCharacterResults.length === 0) ||
          (hasSearchedByName && searchedCharacterResults.length === 0)) && <div>No Results</div>}

      {characters.length > 0 && searchedCharacterResults.length === 0 && (
        <>
          {characters.length > 0 && searchedCharacterResults.length === 0 && !hasSearchedByName && (
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
                  onClick={onClickPaginationCharacters}
                />
              </div>
            </>
          )}
        </>
      )}

      {searchedCharacterResults.length > 0 && (
        <>
          <div className={styles.charactersList}>
            {searchedCharacterResults.map((character) => {
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
              isDisabled={isLoading ? true : !areMoreCharactersSearchedAvailable}
              onClick={onClickPaginationSearchResults}
            />
          </div>
        </>
      )}
    </>
  );
};
