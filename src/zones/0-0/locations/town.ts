import {ILevelLocation} from '../../../interfaces/zones.i';
import {AllowedLevelLocationIDs} from '../../../gameEngine/gameConstants';

let townLocation: ILevelLocation;

townLocation = {
  id: AllowedLevelLocationIDs.TOWN,
  name: 'town',
  locationCharacterLevel: 1,
  start: {
    col: 0,
    row: 0
  },
  end: {
    col: 32,
    row: 18
  }
};

export default townLocation;
