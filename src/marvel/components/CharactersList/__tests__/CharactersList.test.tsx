import { CharactersMock } from "@marvel/helpers/__mocks__/getCharactersMocks";
import { useCharacters } from "@marvel/hooks";
import { render, screen } from "@testing-library/react";
import { CharactersList } from "../CharactersList";

vi.mock("@marvel/hooks", () => ({
  useCharacters: vi.fn(),
}));

vi.mock("../CharacterCard/CharacterCard", () => ({
  CharacterCard: vi.fn(),
}));

describe("CharactersList", () => {
  it("should render the searchbar and show the spinner while is loading characters", () => {
    vi.mocked(useCharacters).mockReturnValue({
      areMoreCharactersAvailable: true,
      getCharacters: vi.fn(),
      getByName: vi.fn(),
      characters: [],
      numberCharactersShowing: 0,
      isLoading: true,
    });

    render(<CharactersList />);

    const searchbar = screen.getByPlaceholderText("Name of character");
    const spinner = screen.getByTestId("spinner-container");

    expect(searchbar).toBeInTheDocument();
    expect(spinner).toBeInTheDocument();
  });

  it("should render characters and pagination where is not loading and there are characters", () => {
    vi.mocked(useCharacters).mockReturnValue({
      areMoreCharactersAvailable: true,
      getCharacters: vi.fn(),
      getByName: vi.fn(),
      characters: CharactersMock,
      numberCharactersShowing: 10,
      isLoading: false,
    });

    render(<CharactersList />);

    const characterCards = screen.getAllByRole("listitem");
    const pagination = screen.getByRole("button", { name: "Load More Arrow right black" });

    expect(characterCards.length).toBe(1);
    expect(pagination).toBeInTheDocument();
    expect(pagination).toBeEnabled();
  });

  it("should render No Results message when there are not charactes", () => {
    vi.mocked(useCharacters).mockReturnValue({
      areMoreCharactersAvailable: true,
      getCharacters: vi.fn(),
      getByName: vi.fn(),
      characters: [],
      numberCharactersShowing: 0,
      isLoading: false,
    });

    render(<CharactersList />);

    const noResults = screen.getByText("No Results");

    expect(noResults).toBeInTheDocument();
  });

  it("should disable pagination button when loading characters", () => {
    vi.mocked(useCharacters).mockReturnValue({
      areMoreCharactersAvailable: true,
      getCharacters: vi.fn(),
      getByName: vi.fn(),
      characters: CharactersMock,
      numberCharactersShowing: 10,
      isLoading: true,
    });

    render(<CharactersList />);

    const pagination = screen.getByRole("button", { name: "Load More Arrow right black" });

    expect(pagination).toBeInTheDocument();
    expect(pagination).toBeDisabled();
  });
});
