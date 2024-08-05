import { useState } from "react";
import { getCharactersByName, getCharactersPaginated } from "../helpers";
import type { Character, CharacterDataWrapper, ErrorResponse } from "../models";

export const DEFAULT_STATE_VALUE = {
  characters: [],
  total: 0,
  count: 0,
  areMoreCharactersAvailable: false,
};
export const useCharacters = () => {
  const [charactersData, setCharactersData] = useState<{
    characters: Character[];
    total: number;
    count: number;
    areMoreCharactersAvailable: boolean;
  }>(DEFAULT_STATE_VALUE);
  const [searchedCharacterResults, setSearchedCharacterResults] = useState<{
    characters: Character[];
    total: number;
    count: number;
    areMoreCharactersAvailable: boolean;
  }>(DEFAULT_STATE_VALUE);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSearchedByName, setHasSearchedByName] = useState<boolean>(false);

  const getCharacters = (limit: number, offset: number) => {
    setIsLoading(true);
    setHasSearchedByName(false);
    getCharactersPaginated(limit, offset)
      .then((charactersDataWrapper: CharacterDataWrapper | ErrorResponse | undefined) => {
        if (charactersDataWrapper && "data" in charactersDataWrapper) {
          const { data } = charactersDataWrapper;
          setCharactersData({
            characters: [...charactersData.characters, ...(data?.results ?? [])] ?? [],
            total: data?.total ?? 0,
            count: data?.count ?? 0,
            areMoreCharactersAvailable: data.count && data.total ? data.count < data.total : false,
          });
        } else {
          setCharactersData(DEFAULT_STATE_VALUE);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getByName = (name: string, limit = 10, offset = 0) => {
    setIsLoading(true);
    setHasSearchedByName(false);
    setSearchedCharacterResults(DEFAULT_STATE_VALUE);
    getCharactersByName(name, limit, offset)
      .then((charactersDataWrapper: CharacterDataWrapper | ErrorResponse | undefined) => {
        if (charactersDataWrapper && "data" in charactersDataWrapper) {
          const { data } = charactersDataWrapper;
          setSearchedCharacterResults({
            characters: [...searchedCharacterResults.characters, ...(data?.results ?? [])] ?? [],
            total: data?.total ?? 0,
            count: data?.count ?? 0,
            areMoreCharactersAvailable: data.count && data.total ? data.count < data.total : false,
          });
        } else {
          setCharactersData(DEFAULT_STATE_VALUE);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
        setHasSearchedByName(true);
      });
  };

  return {
    characters: charactersData.characters,
    searchedCharacterResults: searchedCharacterResults.characters,
    setSearchedCharacterResults,
    hasSearchedByName,
    setHasSearchedByName,
    getCharacters,
    getByName,
    areMoreCharactersAvailable: charactersData.areMoreCharactersAvailable,
    areMoreCharactersSearchedAvailable: searchedCharacterResults.areMoreCharactersAvailable,
    isLoading,
    numberCharactersShowing: charactersData.count,
    numberSearchedCharacterResultsShowing: searchedCharacterResults.count,
  };
};
