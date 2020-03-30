import charImageURL from 'assets/characters.png';
import commonAnimations from "entities/animations/characterAnimations";

const playerAnimations = {
  ...commonAnimations(charImageURL)
};

export default playerAnimations;