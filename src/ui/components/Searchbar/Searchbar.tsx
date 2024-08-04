import { useState } from "react";
import { Button, ButtonStyles } from "../Button/Button";
import styles from "./Searchbar.module.css";

type SearchbarProps = {
  placeholder: string;
  onClick: (textToSearch: string) => void;
  inputName: string;
};

export const Searchbar: React.FC<SearchbarProps> = ({ placeholder, onClick, inputName }) => {
  const [registerToSearch, setRegisterToSearch] = useState("");
  const [isSubmitPending, setIsSubmitPending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setRegisterToSearch(e.currentTarget.value);
  };

  const handleSearch = () => {
    setIsSubmitPending(true);
    console.log("onClick llamado");
    onClick(registerToSearch);
    setIsSubmitPending(false);
  };

  return (
    <div className={styles["searchbar-container"]}>
      <form data-testid="search-form" className={styles.form} onSubmit={handleSubmit}>
        <input
          name={inputName}
          type="text"
          defaultValue={registerToSearch}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={styles["searchbar-input"]}
        />
        <Button
          type="button"
          onClick={handleSearch}
          styleType={ButtonStyles.INPUT}
          isDisabled={isSubmitPending || registerToSearch === ""}
        >
          <img src="search.svg" alt="Search icon" />
        </Button>
      </form>
    </div>
  );
};
