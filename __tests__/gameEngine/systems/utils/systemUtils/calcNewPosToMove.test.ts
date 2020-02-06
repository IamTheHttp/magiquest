import calcNewPosToMove from 'utils/systemUtils/calcNewPosToMove';
import Player from 'entities/Player';
import {MOVEMENT_COMP, POSITION_COMP} from 'components/ComponentNamesConfig';

describe ('calc new pos to movet tests', () => {
  it ('works', () => {
    let player = new Player({col:0, row:0});
    let res = calcNewPosToMove(player, 448, 432, 16, 16);
    
    expect(res.x).toBe(448 - player[MOVEMENT_COMP].speed);
  });
});