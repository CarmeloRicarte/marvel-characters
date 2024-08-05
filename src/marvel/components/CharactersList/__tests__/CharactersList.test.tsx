import { CharactersMock } from "@marvel/helpers/__mocks__/getCharactersMocks";
import { useCharacters } from "@marvel/hooks";
import { fireEvent, render, screen } from "@testing-library/react";
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
      areMoreCharactersAvailable: false,
      areMoreCharactersSearchedAvailable: false,
      setSearchedCharacterResults: vi.fn(),
      hasSearchedByName: false,
      setHasSearchedByName: vi.fn(),
      getCharacters: vi.fn(),
      getByName: vi.fn(),
      characters: [],
      searchedCharacterResults: [],
      isLoading: true,
      recordsPerPageCharacters: 10,
      recordsPerPageSearch: 10,
      getFromRecordNumberCharacters: 0,
      getFromRecordNumberSearch: 0,
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
      areMoreCharactersSearchedAvailable: false,
      setSearchedCharacterResults: vi.fn(),
      hasSearchedByName: false,
      setHasSearchedByName: vi.fn(),
      getCharacters: vi.fn(),
      getByName: vi.fn(),
      characters: CharactersMock,
      searchedCharacterResults: [],
      isLoading: false,
      recordsPerPageCharacters: 10,
      recordsPerPageSearch: 10,
      getFromRecordNumberCharacters: 0,
      getFromRecordNumberSearch: 0,
    });

    render(<CharactersList />);

    const characterCards = screen.getAllByRole("listitem");
    const pagination = screen.getByRole("button", { name: "Load More Arrow right black" });

    expect(characterCards.length).toBe(1);
    expect(pagination).toBeInTheDocument();
    expect(pagination).toBeEnabled();
  });

  it("should render No Results message when there are not characters", () => {
    vi.mocked(useCharacters).mockReturnValue({
      areMoreCharactersAvailable: false,
      areMoreCharactersSearchedAvailable: false,
      setSearchedCharacterResults: vi.fn(),
      hasSearchedByName: false,
      setHasSearchedByName: vi.fn(),
      getCharacters: vi.fn(),
      getByName: vi.fn(),
      characters: [],
      searchedCharacterResults: [],
      isLoading: false,
      recordsPerPageCharacters: 10,
      recordsPerPageSearch: 10,
      getFromRecordNumberCharacters: 0,
      getFromRecordNumberSearch: 0,
    });

    render(<CharactersList />);

    const noResults = screen.getByText("No Results");

    expect(noResults).toBeInTheDocument();
  });

  it("should render No Results message when there are not characters after search", () => {
    vi.mocked(useCharacters).mockReturnValue({
      areMoreCharactersAvailable: false,
      areMoreCharactersSearchedAvailable: false,
      setSearchedCharacterResults: vi.fn(),
      hasSearchedByName: true,
      setHasSearchedByName: vi.fn(),
      getCharacters: vi.fn(),
      getByName: vi.fn(),
      characters: CharactersMock,
      searchedCharacterResults: [],
      isLoading: false,
      recordsPerPageCharacters: 10,
      recordsPerPageSearch: 10,
      getFromRecordNumberCharacters: 0,
      getFromRecordNumberSearch: 0,
    });

    render(<CharactersList />);

    const noResults = screen.getByText("No Results");

    expect(noResults).toBeInTheDocument();
  });

  it("should disable pagination button when loading characters", () => {
    vi.mocked(useCharacters).mockReturnValue({
      areMoreCharactersAvailable: false,
      areMoreCharactersSearchedAvailable: false,
      setSearchedCharacterResults: vi.fn(),
      hasSearchedByName: false,
      setHasSearchedByName: vi.fn(),
      getCharacters: vi.fn(),
      getByName: vi.fn(),
      characters: CharactersMock,
      searchedCharacterResults: [],
      isLoading: true,
      recordsPerPageCharacters: 10,
      recordsPerPageSearch: 10,
      getFromRecordNumberCharacters: 0,
      getFromRecordNumberSearch: 0,
    });

    render(<CharactersList />);

    const pagination = screen.getByRole("button", { name: "Load More Arrow right black" });

    expect(pagination).toBeInTheDocument();
    expect(pagination).toBeDisabled();
  });

  it("should disable pagination button when loading search results", () => {
    vi.mocked(useCharacters).mockReturnValue({
      areMoreCharactersAvailable: false,
      areMoreCharactersSearchedAvailable: false,
      setSearchedCharacterResults: vi.fn(),
      hasSearchedByName: true,
      setHasSearchedByName: vi.fn(),
      getCharacters: vi.fn(),
      getByName: vi.fn(),
      characters: CharactersMock,
      searchedCharacterResults: CharactersMock,
      isLoading: true,
      recordsPerPageCharacters: 10,
      recordsPerPageSearch: 10,
      getFromRecordNumberCharacters: 0,
      getFromRecordNumberSearch: 0,
    });

    render(<CharactersList />);

    const pagination = screen.getByRole("button", { name: "Load More Arrow right black" });

    expect(pagination).toBeInTheDocument();
    expect(pagination).toBeDisabled();
  });

  it("should render searched characters and pagination where is not loading and there are result after search", () => {
    vi.mocked(useCharacters).mockReturnValue({
      areMoreCharactersAvailable: false,
      areMoreCharactersSearchedAvailable: true,
      setSearchedCharacterResults: vi.fn(),
      hasSearchedByName: true,
      setHasSearchedByName: vi.fn(),
      getCharacters: vi.fn(),
      getByName: vi.fn(),
      characters: CharactersMock,
      searchedCharacterResults: CharactersMock,
      isLoading: false,
      recordsPerPageCharacters: 10,
      recordsPerPageSearch: 10,
      getFromRecordNumberCharacters: 0,
      getFromRecordNumberSearch: 0,
    });

    render(<CharactersList />);

    const characterCards = screen.getAllByRole("listitem");
    const pagination = screen.getByRole("button", { name: "Load More Arrow right black" });

    expect(characterCards.length).toBe(1);
    expect(pagination).toBeInTheDocument();
    expect(pagination).toBeEnabled();
  });

  it("should render searched characters and pagination with default values where is not loading and there are result after search", () => {
    vi.mocked(useCharacters).mockReturnValue({
      areMoreCharactersAvailable: false,
      areMoreCharactersSearchedAvailable: true,
      setSearchedCharacterResults: vi.fn(),
      hasSearchedByName: true,
      setHasSearchedByName: vi.fn(),
      getCharacters: vi.fn(),
      getByName: vi.fn(),
      characters: CharactersMock,
      searchedCharacterResults: [
        {
          id: 1,
        },
      ],
      isLoading: false,
      recordsPerPageCharacters: 10,
      recordsPerPageSearch: 10,
      getFromRecordNumberCharacters: 0,
      getFromRecordNumberSearch: 0,
    });

    render(<CharactersList />);

    const characterCards = screen.getAllByRole("listitem");
    const pagination = screen.getByRole("button", { name: "Load More Arrow right black" });

    expect(characterCards.length).toBe(1);
    expect(pagination).toBeInTheDocument();
    expect(pagination).toBeEnabled();
    expect(screen.getByText("(No description available)")).toBeInTheDocument();
  });

  it("should render searched characters and pagination with default values where is not loading and there are result after search", () => {
    vi.mocked(useCharacters).mockReturnValue({
      areMoreCharactersAvailable: true,
      areMoreCharactersSearchedAvailable: false,
      setSearchedCharacterResults: vi.fn(),
      hasSearchedByName: false,
      setHasSearchedByName: vi.fn(),
      getCharacters: vi.fn(),
      getByName: vi.fn(),
      characters: [
        {
          id: 1,
        },
      ],
      searchedCharacterResults: [],
      isLoading: false,
      recordsPerPageCharacters: 10,
      recordsPerPageSearch: 10,
      getFromRecordNumberCharacters: 0,
      getFromRecordNumberSearch: 0,
    });

    render(<CharactersList />);

    const characterCards = screen.getAllByRole("listitem");
    const pagination = screen.getByRole("button", { name: "Load More Arrow right black" });

    expect(characterCards.length).toBe(1);
    expect(pagination).toBeInTheDocument();
    expect(pagination).toBeEnabled();
    expect(screen.getByText("(No description available)")).toBeInTheDocument();
  });

  it("should handle click after click on pagination with search results", () => {
    const mockGetCharacters = vi.fn();
    vi.mocked(useCharacters).mockReturnValue({
      areMoreCharactersAvailable: false,
      areMoreCharactersSearchedAvailable: true,
      setSearchedCharacterResults: vi.fn(),
      hasSearchedByName: true,
      setHasSearchedByName: vi.fn(),
      getCharacters: mockGetCharacters,
      getByName: vi.fn(),
      characters: CharactersMock,
      searchedCharacterResults: CharactersMock,
      isLoading: false,
      recordsPerPageCharacters: 10,
      recordsPerPageSearch: 10,
      getFromRecordNumberCharacters: 0,
      getFromRecordNumberSearch: 0,
    });

    render(<CharactersList />);

    const characterCards = screen.getAllByRole("listitem");
    const pagination = screen.getByRole("button", { name: "Load More Arrow right black" });

    expect(characterCards.length).toBe(1);
    expect(pagination).toBeInTheDocument();
    expect(pagination).toBeEnabled();
    fireEvent.click(pagination);
    expect(mockGetCharacters).toHaveBeenCalled();
  });

  it("should handle click after click on pagination with initial characters", () => {
    const mockGetCharacters = vi.fn();
    vi.mocked(useCharacters).mockReturnValue({
      areMoreCharactersAvailable: true,
      areMoreCharactersSearchedAvailable: false,
      setSearchedCharacterResults: vi.fn(),
      hasSearchedByName: false,
      setHasSearchedByName: vi.fn(),
      getCharacters: mockGetCharacters,
      getByName: vi.fn(),
      characters: CharactersMock,
      searchedCharacterResults: [],
      isLoading: false,
      recordsPerPageCharacters: 10,
      recordsPerPageSearch: 10,
      getFromRecordNumberCharacters: 0,
      getFromRecordNumberSearch: 0,
    });

    render(<CharactersList />);

    const characterCards = screen.getAllByRole("listitem");
    const pagination = screen.getByRole("button", { name: "Load More Arrow right black" });

    expect(characterCards.length).toBe(1);
    expect(pagination).toBeInTheDocument();
    expect(pagination).toBeEnabled();
    fireEvent.click(pagination);
    expect(mockGetCharacters).toHaveBeenCalled();
  });
});
