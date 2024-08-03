import { Button, ButtonStyles } from "../Button/Button";

type PaginationProps = {
  isDisabled: boolean;
  onClick: () => void;
};

export const Pagination: React.FC<PaginationProps> = ({ isDisabled, onClick }) => {
  return (
    <Button type="button" onClick={onClick} styleType={ButtonStyles.SECONDARY} isDisabled={isDisabled}>
      <span>
        Load More <img src="arrow-right-black.svg" alt="Arrow right black" />
      </span>
    </Button>
  );
};
