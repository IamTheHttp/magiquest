import calcNewPosToMove from '../../../../../src/gameEngine/utils/systemUtils/calcNewPosToMove';
import {MOVEMENT} from '../../../../../src/gameEngine/components/_ComponentNames';
import createTestPlayer from '../../../../__TEST__UTILS__/createTestPlayer';

describe('calc new pos to movet tests', () => {
  it('works', () => {
    const player = createTestPlayer(0, 0);
    const res = calcNewPosToMove(player, 448, 432, 16, 16);

    expect(res.x).toBe(448 - player[MOVEMENT].speed);
  });
});
