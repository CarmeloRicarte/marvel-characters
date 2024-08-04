import type { CharacterDataWrapper } from '../models';
import type { ErrorResponse } from '../models/ErrorResponse';
import { getApiParams } from './getApiParams';

export const BASE_URL = `${
  import.meta.env.VITE_MARVEL_API_BASE_URL
}/v1/public/characters`;

export async function getCharactersByName(
  name: string
): Promise<CharacterDataWrapper | ErrorResponse | undefined> {
  const params = new URLSearchParams({
    ...getApiParams(),
    name,
  });

  try {
    const response = await fetch(`${BASE_URL}?${params}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getCharactersPaginated(
  limit = 10,
  offset = 0
): Promise<CharacterDataWrapper | ErrorResponse | undefined> {
  const params = new URLSearchParams({
    ...getApiParams(),
    limit: `${limit}`,
    offset: `${offset}`,
    apikey: `${import.meta.env.VITE_MARVEL_API_KEY}`,
  });

  try {
    const response = await fetch(`${BASE_URL}?${params}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
}
