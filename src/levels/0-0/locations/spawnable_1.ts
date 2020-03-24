import {AllowedLevelLocationIDs, CHARACTERS} from "gameConstants";
import {ILevelLocation} from "../../../interfaces/levels.i";

let spawnableOneLocation:ILevelLocation;

spawnableOneLocation = {
  id: AllowedLevelLocationIDs.SPAWNABLE_1,
  spawnableEnemies: [
    {
      chance: 0.01,
      characterType: CHARACTERS.ENEMY
    },
    {
      chance: 0.01,
      characterType: CHARACTERS.IMP
    },
    {
      chance: 0.01,
      characterType: CHARACTERS.GARGOYLE
    },
    {
      chance: 0.01,
      characterType: CHARACTERS.DEMON
    },
    {
      chance: 0.01,
      characterType: CHARACTERS.VAMPIRE
    },
  ],
  name: 'JUST_LOCATION_NAME',
  start: {
    col: 33,
    row: 0,
  },
  end: {
    col: 100,
    row: 18,
  },
  locationCharacterLevel: 50
};


export default spawnableOneLocation;