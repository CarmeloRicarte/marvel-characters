import { useState } from "react";
import { getCharactersByName, getCharactersPaginated } from "../helpers";
import type { Character, CharacterDataWrapper } from "../models";

const DEFAULT_STATE_VALUE = {
  characters: [],
  total: 0,
  count: 0,
  areMoreCharactersAvailable: true,
};
export const useCharacters = () => {
  const [charactersData, setCharactersData] = useState<{
    characters: Character[];
    total: number;
    count: number;
    areMoreCharactersAvailable: boolean;
  }>(DEFAULT_STATE_VALUE);
  const [isLoading, setIsLoading] = useState(true);

  const getCharacters = (limit: number) => {
    setIsLoading(true);
    getCharactersPaginated(limit)
      .then((charactersDataWrapper: CharacterDataWrapper | undefined) => {
        if (charactersDataWrapper) {
          const { data } = charactersDataWrapper;
          setCharactersData({
            characters: data?.results ?? [],
            total: data?.total ?? 0,
            count: data?.count ?? 0,
            areMoreCharactersAvailable: data.count && data.total ? data.count < data.total : false,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getByName = (name: string) => {
    setIsLoading(true);
    setCharactersData(DEFAULT_STATE_VALUE);
    getCharactersByName(name)
      .then((charactersDataWrapper: CharacterDataWrapper | undefined) => {
        if (charactersDataWrapper) {
          const { data } = charactersDataWrapper;
          setCharactersData({
            characters: data?.results ?? [],
            total: data?.total ?? 0,
            count: data?.count ?? 0,
            areMoreCharactersAvailable: data.count && data.total ? data.count < data.total : false,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    characters: charactersData.characters,
    getCharacters,
    getByName,
    areMoreCharactersAvailable: charactersData.areMoreCharactersAvailable,
    isLoading,
    numberCharactersShowing: charactersData.count,
  };
};
