import { render, screen } from "@testing-library/react";
import { Spinner } from "../Spinner";

describe("Spinner Component", () => {
  it("renders without crashing", () => {
    render(<Spinner />);
    expect(screen.getByTestId("spinner-container")).toBeDefined();
  });

  it("has the correct structure", () => {
    render(<Spinner />);
    const container = screen.getByTestId("spinner-container");
    const spinner = screen.getByTestId("spinner");

    expect(container).toBeInTheDocument();
    expect(spinner).toBeInTheDocument();
    expect(container).toContainElement(spinner);
  });
});
