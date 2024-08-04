import { render } from "@testing-library/react";
import { CharactersPage } from "../Characters";

describe("Characters", () => {
  it("renders main component", () => {
    const { getByText } = render(<CharactersPage />);
    expect(getByText("Search your character")).toBeInTheDocument();
    expect(getByText("Data provided by Marvel.")).toBeInTheDocument();
  });
});
