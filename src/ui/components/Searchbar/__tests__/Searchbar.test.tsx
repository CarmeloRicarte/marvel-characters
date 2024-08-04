import { act, fireEvent, getByPlaceholderText, render, waitFor } from "@testing-library/react";
import { Searchbar } from "../Searchbar";

describe("Searchbar", () => {
  const defaultProps = {
    placeholder: "Search",
    onClick: vi.fn(),
    inputName: "search-input",
  };

  it("should render the search bar with a placeholder and an image button", () => {
    const { getByPlaceholderText, getByAltText } = render(<Searchbar {...defaultProps} />);
    expect(getByPlaceholderText(defaultProps.placeholder)).toBeInTheDocument();
    expect(getByAltText("Search icon")).toHaveAttribute("src", "search.svg");
  });

  it("should call the onClick function when the search button is clicked and the input field has a value", () => {
    const { getByRole, getByTestId, container } = render(<Searchbar {...defaultProps} />);
    const searchInput = getByPlaceholderText(container, defaultProps.placeholder);
    fireEvent.change(searchInput, { target: { value: "search text" } });
    const searchButton = getByRole("button");
    const form = getByTestId("search-form");
    fireEvent.click(searchButton);
    fireEvent.submit(form);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it("should not call the onClick function when the search button is clicked and the input field has no value", () => {
    const { getByRole, container } = render(<Searchbar {...defaultProps} />);
    const searchInput = getByPlaceholderText(container, defaultProps.placeholder);
    fireEvent.change(searchInput, { target: { value: "" } });
    const searchButton = getByRole("button");
    fireEvent.click(searchButton);
    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });

  it("should disable the search button when submitting is pending", () => {
    const { getByRole, container, getByTestId } = render(<Searchbar {...defaultProps} />);
    const searchInput = getByPlaceholderText(container, defaultProps.placeholder);
    act(() => {
      fireEvent.change(searchInput, { target: { value: "search text" } });
    });
    const searchButton = getByRole("button");
    const form = getByTestId("search-form");
    fireEvent.click(searchButton);
    fireEvent.submit(form);
    expect(searchButton).toBeDisabled();
  });

  it("should enable the search button when submitting is complete", () => {
    const { getByRole, getByTestId, container } = render(<Searchbar {...defaultProps} />);
    const searchInput = getByPlaceholderText(container, defaultProps.placeholder);
    fireEvent.change(searchInput, { target: { value: "search text" } });
    const searchButton = getByRole("button");
    const form = getByTestId("search-form");
    fireEvent.click(searchButton);
    fireEvent.submit(form);
    expect(searchButton).toBeDisabled();
    waitFor(() => {
      expect(searchButton).not.toBeDisabled();
    });
  });
});
