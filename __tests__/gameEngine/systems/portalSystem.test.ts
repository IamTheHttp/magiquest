import createSystemArgs from '../../__TEST__UTILS__/createTestSystemArguments';
import portalSystem from 'gameEngine/systems/portalSystem';
import {getTileIdxByEnt} from 'gameEngine/utils/componentUtils/tileUtils/tileIdxUtils';
import SpyFns, {fn} from '../../__TEST__UTILS__/SpyFns';
import {ISystemArguments} from '../../../src/interfaces/IGameLoop';
import createTestPlayer from '../../__TEST__UTILS__/createTestPlayer';
import {Entity} from 'game-platform';
import {BaseEntity} from '../../../src/gameEngine/BaseEntity';

describe('Tests for the AI system', () => {
  let systemArguments: ISystemArguments;
  let spyHandleAreaChange: fn;
  let player: BaseEntity;

  beforeEach(() => {
    Entity.reset();
    spyHandleAreaChange = jest.fn();
    player = createTestPlayer(0, 0);

    systemArguments = createSystemArgs(new SpyFns(null, null, null, null, spyHandleAreaChange)) as ISystemArguments;
  });

  it('doesnt break with no portals to run', () => {
    portalSystem(systemArguments);
  });

  it('triggers the handleZoneChange if player is on a tile with a correct trigger on it', () => {
    const idx = getTileIdxByEnt(player);
    systemArguments.zone.triggers.move[idx] = [
      {
        act: 99,
        chapter: 66,
        type: 'portal',
        oneOff: true,
        exitTile: {
          col: 0,
          row: 0
        }
      }
    ];

    portalSystem(systemArguments);

    expect(spyHandleAreaChange.mock.calls[0][0]).toBe(99);
    expect(spyHandleAreaChange.mock.calls[0][1]).toBe(66);
  });
});
