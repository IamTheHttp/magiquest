import {AllowedLevelLocationIDs, CHARACTERS} from "gameConstants";
import {ILevelLocation} from "../../../interfaces/levels.i";

let spawnableOneLocation:ILevelLocation;

spawnableOneLocation = {
  id: AllowedLevelLocationIDs.SPAWNABLE_1,
  spawnableEnemies: [
    {
      chance: 0.01,
      characterType: CHARACTERS.ENEMY,
      characterLevel: 1
    },
    {
      chance: 0.01,
      characterType: CHARACTERS.IMP,
      characterLevel: 1
    },
    {
      chance: 0.01,
      characterType: CHARACTERS.GARGOYLE,
      characterLevel: 1
    },
    {
      chance: 0.01,
      characterType: CHARACTERS.DEMON,
      characterLevel: 1
    },
    {
      chance: 0.01,
      characterType: CHARACTERS.DEMON,
      characterLevel: 1
    },
  ],
  name: 'JUST_LOCATION_NAME',
  start: {
    col: 32,
    row: 0,
  },
  end: {
    col: 100,
    row: 18,
  },
  locationCharacterLevel: 1
};


export default spawnableOneLocation;