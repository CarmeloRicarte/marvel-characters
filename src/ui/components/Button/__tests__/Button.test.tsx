import { fireEvent, render } from "@testing-library/react";
import { Button } from "../Button";

describe("Button component", () => {
  it("should call onClick function when clicked", () => {
    const handleClick = vi.fn();
    const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should set disabled prop correctly", () => {
    const { getByText } = render(<Button isDisabled={true}>Click me</Button>);
    expect(getByText("Click me")).toBeDisabled();
  });

  it("should set name prop correctly", () => {
    const { getByText } = render(<Button name="my-button">Click me</Button>);
    expect(getByText("Click me")).toHaveAttribute("name", "my-button");
  });
});
