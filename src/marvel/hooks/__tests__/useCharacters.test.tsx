import type { CharacterDataWrapper } from "@marvel/models";
import { act, renderHook, waitFor } from "@testing-library/react";
import {
  CharactersMock,
  getByNameWithResultsMock,
  getPaginatedWithResultsMock,
} from "../../helpers/__mocks__/getCharactersMocks";
import { useCharacters } from "../useCharacters";

describe("useCharacters", () => {
  it("should set the default value at init", async () => {
    const { result } = renderHook(() => useCharacters());
    expect(result.current.characters).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.areMoreCharactersAvailable).toBe(false);
  });

  it("should get characters paginated", async () => {
    const response = new Response(JSON.stringify(getPaginatedWithResultsMock as unknown as CharacterDataWrapper), {
      status: 200,
      headers: { "Content-type": "application/json" },
    });

    vi.spyOn(global, "fetch").mockResolvedValue(response);
    const { result } = renderHook(() => useCharacters());
    act(() => {
      result.current.getCharacters(10, 0);
    });
    await waitFor(() => {
      expect(result.current.characters).toEqual(CharactersMock);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.areMoreCharactersAvailable).toBe(false);
    });
  });

  it("should get characters paginated without results", async () => {
    const response = new Response(JSON.stringify({ data: {} } as unknown as CharacterDataWrapper), {
      status: 200,
      headers: { "Content-type": "application/json" },
    });

    vi.spyOn(global, "fetch").mockResolvedValue(response);
    const { result } = renderHook(() => useCharacters());
    act(() => {
      result.current.getCharacters(10, 0);
    });
    await waitFor(() => {
      expect(result.current.characters).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.areMoreCharactersAvailable).toBe(false);
    });
  });

  it("should get characters by name", async () => {
    const response = new Response(JSON.stringify(getByNameWithResultsMock as unknown as CharacterDataWrapper), {
      status: 200,
      headers: { "Content-type": "application/json" },
    });

    vi.spyOn(global, "fetch").mockResolvedValue(response);
    const { result } = renderHook(() => useCharacters());
    act(() => {
      result.current.getByName("Iron Man");
    });
    console.log(result.current.characters);
    await waitFor(() => {
      expect(result.current.searchedCharacterResults).toEqual(CharactersMock);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.areMoreCharactersSearchedAvailable).toBe(false);
    });
  });

  it("should get characters by name without results", async () => {
    const response = new Response(JSON.stringify({ data: {} } as unknown as CharacterDataWrapper), {
      status: 200,
      headers: { "Content-type": "application/json" },
    });

    vi.spyOn(global, "fetch").mockResolvedValue(response);
    const { result } = renderHook(() => useCharacters());
    act(() => {
      result.current.getByName("");
    });
    await waitFor(() => {
      expect(result.current.searchedCharacterResults).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.areMoreCharactersSearchedAvailable).toBe(false);
    });
  });
});
