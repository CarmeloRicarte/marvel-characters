import { useCallback } from "react";
import { debounce } from "../../../utils/debounce";
import styles from "./Searchbar.module.css";

type SearchbarProps = {
  placeholder: string;
  onChange: (textToSearch: string) => void;
  inputName: string;
  registerToSearch: string;
  setRegisterToSearch: (textToSearch: string) => void;
  setResetSearchState: () => void;
};

export const Searchbar: React.FC<SearchbarProps> = ({
  placeholder,
  onChange,
  inputName,
  registerToSearch,
  setRegisterToSearch,
  setResetSearchState,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const debounceSearch = useCallback(debounce(onChange, 500), []);

  const handleChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    setRegisterToSearch(e.currentTarget.value);
    if (!value) {
      setResetSearchState();
    }

    if (value.length > 4) {
      debounceSearch(value);
    }
  };

  return (
    <div className={styles["searchbar-container"]}>
      <form data-testid="search-form" className={styles.form} onSubmit={handleSubmit}>
        <input
          name={inputName}
          type="text"
          value={registerToSearch}
          onChange={handleChange}
          placeholder={placeholder}
          className={styles["searchbar-input"]}
        />
      </form>
    </div>
  );
};
