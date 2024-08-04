import { fireEvent, render } from "@testing-library/react";
import { Pagination } from "../Pagination";

describe("Pagination component", () => {
  it("renders pagination button with disabled state", () => {
    const { getByRole } = render(<Pagination isDisabled={true} onClick={() => {}} />);
    expect(getByRole("button")).toBeDisabled();
  });

  it("calls onClick function when clicked", () => {
    const handleClick = vi.fn();
    const { getByRole } = render(<Pagination onClick={handleClick} isDisabled={false} />);
    fireEvent.click(getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
