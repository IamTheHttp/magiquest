import {AllowedLevelLocationIDs} from "gameConstants";
import {ILevelLocation} from "../../../interfaces/levels.i";

let townLocation:ILevelLocation;

townLocation = {
  id: AllowedLevelLocationIDs.TOWN,
  name: 'town',
  locationCharacterLevel: 1,
  start: {
    col: 0,
    row: 0,
  },
  end: {
    col: 32,
    row: 18,
  }
};


export default townLocation;