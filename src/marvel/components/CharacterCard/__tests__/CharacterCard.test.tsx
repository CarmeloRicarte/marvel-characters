import { fireEvent, render } from "@testing-library/react";
import { CharacterCard } from "../CharacterCard";

describe("CharacterCard component", () => {
  const character = {
    name: "Test Character",
    description: "This is a test character.",
    imageData: { path: "/test/path", extension: "jpg" },
    linkToMoreInfo: "https://www.test.com",
  };

  it("renders character card with image and data container", () => {
    const { getByText } = render(<CharacterCard character={character} />);
    expect(getByText(character.name)).toBeInTheDocument();
    expect(getByText(character.description)).toBeInTheDocument();
  });

  it("calls onClick function when button is clicked for open in a new tab, more info about the character", () => {
    const character = {
      name: "Test Character",
      description: "This is a test character.",
      imageData: { path: "/test/path", extension: "jpg" },
      linkToMoreInfo: "https://www.test.com",
    };
    const { getByRole } = render(<CharacterCard character={character} />);
    const windowOpenSpy = vi.spyOn(window, "open");
    fireEvent.click(getByRole("button"));
    expect(windowOpenSpy).toHaveBeenCalledTimes(1);
    expect(windowOpenSpy).toHaveBeenCalledWith(character.linkToMoreInfo, "__blank");
  });

  it("sets imageData prop correctly", () => {
    const character = {
      name: "Test Character",
      description: "This is a test character.",
      imageData: { path: "/test/path", extension: "jpg" },
      linkToMoreInfo: "https://www.test.com",
    };
    const { getByAltText } = render(<CharacterCard character={character} />);
    expect(getByAltText(character.name)).toHaveAttribute(
      "src",
      `${character.imageData.path}.${character.imageData.extension}`,
    );
  });
});
