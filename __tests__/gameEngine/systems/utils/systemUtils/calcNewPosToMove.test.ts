import calcNewPosToMove from 'utils/systemUtils/calcNewPosToMove';
import Player from 'entities/characters/Player';
import {MOVEMENT_COMP, POSITION_COMP} from 'components/ComponentNamesConfig';
import createTestPlayer from "../../../../__TEST__UTILS__/createTestPlayer";

describe ('calc new pos to movet tests', () => {
  it ('works', () => {
    let player = createTestPlayer(0, 0);
    let res = calcNewPosToMove(player, 448, 432, 16, 16);
    
    expect(res.x).toBe(448 - player[MOVEMENT_COMP].speed);
  });
});