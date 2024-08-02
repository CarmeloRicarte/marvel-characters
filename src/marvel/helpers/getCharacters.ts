import md5 from 'crypto-js/md5';
import type { CharacterDataWrapper } from '../models';

const BASE_URL = `${
  import.meta.env.VITE_MARVEL_API_BASE_URL
}/v1/public/characters`;

const getApiParams = () => {
  const ts = new Date().getTime();
  const key = `${import.meta.env.VITE_MARVEL_API_KEY}`;
  const pass = `${import.meta.env.VITE_MARVEL_API_PASS}`;
  const hashedData = md5(ts + pass + key);
  return {
    ts: `${ts}`,
    hash: `${hashedData}`,
    apikey: key,
  };
};

export async function getCharactersByName(name: string) {
  const params = new URLSearchParams({
    ...getApiParams(),
    name,
  });

  try {
    const response = await fetch(`${BASE_URL}?${params}`);
    const mappedResponse = response.json() as unknown as CharacterDataWrapper;
  } catch (error) {
    console.error(error);
  }
}

export async function getCharactersPaginated(limit = 10, offset = 0) {
  const params = new URLSearchParams({
    ...getApiParams(),
    limit: `${limit}`,
    offset: `${offset}`,
    apikey: `${import.meta.env.VITE_MARVEL_API_KEY}`,
  });

  try {
    const response = await fetch(`${BASE_URL}?${params}`);
    const mappedResponse = response.json() as unknown as CharacterDataWrapper;
  } catch (error) {
    console.error(error);
  }
}
