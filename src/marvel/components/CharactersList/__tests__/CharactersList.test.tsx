import { render } from "@testing-library/react";
import { CharactersList } from "../CharactersList";
describe("CharactersList", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<CharactersList />);

    expect(baseElement).toBeTruthy();
  });
});
