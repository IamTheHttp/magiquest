import calcNewPosToMove from '../../../../../src/gameEngine/utils/systemUtils/calcNewPosToMove';
import {MOVEMENT} from '../../../../../src/gameEngine/components/_ComponentNames';
import createTestPlayer from '../../../../__TEST__UTILS__/createTestPlayer';
import {TILE_SIZE} from '../../../../../src/gameEngine/gameConstants';

describe('calc new pos to move tests', () => {
  it('works', () => {
    const player = createTestPlayer(0, 0);
    const newPosition = calcNewPosToMove(player, 448, 432, 16, 16);

    const tilesMovedPerTick = player[MOVEMENT].speedTilesPerSecond / 60;
    const pxMovedPerTick = tilesMovedPerTick * TILE_SIZE;

    expect(newPosition.x).toBe(448 - pxMovedPerTick);
  });
});
