import type { Image } from "@marvel/models";
import { Button, ButtonStyles } from "@ui/components";
import styles from "./CharacterCard.module.css";

type CharacterCardProps = {
  character: {
    name: string;
    description: string;
    imageData: Image | undefined;
    linkToMoreInfo: string;
  };
};

export const CharacterCard = ({ character }: CharacterCardProps) => {
  return (
    <div className={styles.card} role="listitem">
      <img src={`${character.imageData?.path}.${character.imageData?.extension}`} alt={character.name} />
      <div className={styles["card-data-container"]}>
        <h2>{character.name}</h2>
        <p className={styles["card-description"]}>{character.description}</p>
      </div>
      <Button
        type="button"
        styleType={ButtonStyles.PRIMARY}
        onClick={() => window.open(character.linkToMoreInfo, "__blank")}
      >
        <span>
          Read more <img src="arrow-right-white.svg" alt="Arrow right white" />
        </span>
      </Button>
    </div>
  );
};
