import {ILevelLocation} from '../../../../interfaces/IZones';
import {AllowedLevelLocationIDs} from '../../../../gameEngine/gameConstants';

let spawnableOneLocation: ILevelLocation;

spawnableOneLocation = {
  id: AllowedLevelLocationIDs.SPAWNABLE_1,
  name: 'JUST_LOCATION_NAME',
  start: {
    col: 33,
    row: 0
  },
  end: {
    col: 100,
    row: 18
  },
  locationCharacterLevel: 50
};

export default spawnableOneLocation;
