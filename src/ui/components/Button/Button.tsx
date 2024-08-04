import styles from "./Button.module.css";

export enum ButtonStyles {
  PRIMARY = "button-primary",
  SECONDARY = "button-secondary",
  INPUT = "button-input",
}

type Props = {
  children?: React.ReactNode;
  styleType?: ButtonStyles;
  isDisabled?: boolean;
  name?: string | undefined;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
};

export const Button: React.FC<Props> = ({
  children,
  name,
  onClick = () => {},
  type = "button",
  isDisabled = false,
  styleType = ButtonStyles.PRIMARY,
}) => {
  return (
    <button
      type={type}
      name={name}
      className={`${styles[styleType]} ${styles.button}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};
