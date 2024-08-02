import { fireEvent, render, waitFor } from "@testing-library/react";
import { Attribution } from "../Attribution";

describe("Attribution component", () => {
  it("renders the correct attribution text", () => {
    const { getByText } = render(<Attribution />);
    expect(getByText("Data provided by Marvel.")).toBeInTheDocument();
  });

  it("displays the current year in the copyright notice", () => {
    const { getByText } = render(<Attribution />);
    expect(getByText(`© ${new Date().getFullYear()} Marvel`)).toBeInTheDocument();
  });

  it("renders a link to marvel.com with the correct href and target attributes", () => {
    const { getByRole } = render(<Attribution />);
    const link = getByRole("link");
    expect(link).toHaveAttribute("href", "https://marvel.com");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("does not allow the link to be clicked when target is set to _blank", () => {
    const { getByRole } = render(<Attribution />);
    const link = getByRole("link");
    fireEvent.click(link);
    waitFor(() => expect(window.open).not.toHaveBeenCalled());
  });
});
