import type { CharacterDataWrapper, ErrorResponse } from '@marvel/models';
import {
  getByNameWithNoResultsMock,
  getByNameWithResultsMock,
  getPaginatedErrorMock,
  getPaginatedNoResultsMock,
  getPaginatedWithResultsMock,
} from '../__mocks__/getCharactersMocks';
import { getCharactersByName, getCharactersPaginated } from '../getCharacters';

describe('getCharactersByName', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('returns a Promise that resolves to an empty array when the API returns no characters', async () => {
    const response = new Response(
      JSON.stringify(
        getByNameWithNoResultsMock as unknown as CharacterDataWrapper
      ),
      {
        status: 200,
        headers: { 'Content-type': 'application/json' },
      }
    );

    vi.spyOn(global, 'fetch').mockResolvedValue(response);

    const result = (await getCharactersByName('Iron')) as CharacterDataWrapper;
    expect(result?.data.results).toHaveLength(0);
  });

  it('returns a Promise that resolves to an array of characters when the API returns characters', async () => {
    const response = new Response(
      JSON.stringify(
        getByNameWithResultsMock as unknown as CharacterDataWrapper
      ),
      {
        status: 200,
        headers: { 'Content-type': 'application/json' },
      }
    );

    vi.spyOn(global, 'fetch').mockResolvedValue(response);
    const result = (await getCharactersByName(
      'Iron Man'
    )) as CharacterDataWrapper;
    expect(result?.data?.results?.length).toBe(1);
  });

  it('catches an error thrown by getCharactersByName', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => {
      throw new Error('Network error');
    });

    const result = await getCharactersByName('Iron Man');

    expect(result).toBeUndefined();
  });
});

describe('getCharactersPaginated', () => {
  it('returns a Promise that resolves to an empty array when the API returns no characters', async () => {
    const response = new Response(
      JSON.stringify(
        getPaginatedNoResultsMock as unknown as CharacterDataWrapper
      ),
      {
        status: 200,
        headers: { 'Content-type': 'application/json' },
      }
    );

    vi.spyOn(global, 'fetch').mockResolvedValue(response);
    const result = (await getCharactersPaginated(
      10,
      0
    )) as CharacterDataWrapper;
    expect(result?.data.results).toHaveLength(0);
  });

  it('returns a Promise that resolves to an array of characters when the API returns characters', async () => {
    const response = new Response(
      JSON.stringify(
        getPaginatedWithResultsMock as unknown as CharacterDataWrapper
      ),
      {
        status: 200,
        headers: { 'Content-type': 'application/json' },
      }
    );

    vi.spyOn(global, 'fetch').mockResolvedValue(response);
    const result = (await getCharactersPaginated(
      10,
      0
    )) as CharacterDataWrapper;
    expect(result).toBeDefined();
    expect(result?.data.results).toHaveLength(1);
  });

  it('returns a Promise that resolves to an ErrorResponse when pass a limit below 1', async () => {
    const response = new Response(
      JSON.stringify(getPaginatedErrorMock as unknown as ErrorResponse),
      {
        status: 409,
        headers: { 'Content-type': 'application/json' },
      }
    );

    vi.spyOn(global, 'fetch').mockResolvedValue(response);
    const result = (await getCharactersPaginated(0, 0)) as ErrorResponse;
    expect(result).toBeDefined();
    expect(result).toEqual(getPaginatedErrorMock);
  });

  it('catches an error thrown by getCharactersPaginated', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => {
      throw new Error('Network error');
    });

    const result = await getCharactersPaginated(10, 0);

    expect(result).toBeUndefined();
  });
});
