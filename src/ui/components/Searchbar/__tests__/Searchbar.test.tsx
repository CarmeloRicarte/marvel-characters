import { fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';
import { Searchbar } from '../Searchbar';

describe('Searchbar', () => {
  const defaultProps = {
    placeholder: 'Search',
    inputName: 'search-input',
    registerToSearch: '',
    setRegisterToSearch: vi.fn(),
    setResetSearchState: vi.fn(),
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.clearAllMocks();
  });

  it('should render the search bar with a placeholder', () => {
    const { getByPlaceholderText } = render(<Searchbar {...defaultProps} />);
    expect(getByPlaceholderText(defaultProps.placeholder)).toBeInTheDocument();
  });

  it('should update registerToSearch on input change', () => {
    const { getByRole } = render(<Searchbar {...defaultProps} />);
    const searchInput = getByRole('textbox');

    fireEvent.change(searchInput, { target: { value: 'search text' } });

    expect(defaultProps.setRegisterToSearch).toHaveBeenCalledWith(
      'search text'
    );
  });

  it('should reset search state on blur when value is empty', () => {
    const { getByRole } = render(<Searchbar {...defaultProps} />);
    const searchInput = getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'search text' } });
    fireEvent.blur(searchInput);
    fireEvent.change(searchInput, { target: { value: '' } });
    expect((searchInput as HTMLInputElement).value).toBe('');
  });

  it('should not trigger onChange if input length is less than 5 characters', () => {
    const { getByRole } = render(<Searchbar {...defaultProps} />);
    const searchInput = getByRole('textbox');

    fireEvent.change(searchInput, { target: { value: 'test' } });

    vi.runAllTimers();
    expect(defaultProps.onChange).not.toHaveBeenCalled();
  });

  it('should trigger debounced onChange when input length is greater than 4 characters', async () => {
    const { getByRole } = render(<Searchbar {...defaultProps} />);
    const searchInput = getByRole('textbox');

    fireEvent.change(searchInput, { target: { value: 'search text' } });

    expect(defaultProps.onChange).not.toHaveBeenCalled();
    vi.runAllTimers();

    expect(defaultProps.onChange).toHaveBeenCalledWith('search text');
  });
});
