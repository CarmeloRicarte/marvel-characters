import type { CharacterDataWrapper } from '../models';
import { getApiParams } from './getApiParams';

const BASE_URL = `${
  import.meta.env.VITE_MARVEL_API_BASE_URL
}/v1/public/characters`;

export async function getCharactersByName(
  name: string
): Promise<CharacterDataWrapper | undefined> {
  const params = new URLSearchParams({
    ...getApiParams(),
    name,
  });

  try {
    const response = await fetch(`${BASE_URL}?${params}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as unknown as CharacterDataWrapper;
  } catch (error) {
    console.error(error);
  }
}

export async function getCharactersPaginated(
  limit = 10,
  offset = 0
): Promise<CharacterDataWrapper | undefined> {
  const params = new URLSearchParams({
    ...getApiParams(),
    limit: `${limit}`,
    offset: `${offset}`,
    apikey: `${import.meta.env.VITE_MARVEL_API_KEY}`,
  });

  try {
    const response = await fetch(`${BASE_URL}?${params}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as unknown as CharacterDataWrapper;
  } catch (error) {
    console.error(error);
  }
}
