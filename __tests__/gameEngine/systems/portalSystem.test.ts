import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';
import portalSystem from 'gameEngine/systems/portalSystem';
import { getTileIdxByEnt } from 'gameEngine/utils/componentUtils/tileUtils/getTileIdx';
import SpyFns, {fn} from "../../__TEST__UTILS__/SpyFns";
import {ISystemArguments} from "../../../src/interfaces/gameloop.i";
import createTestPlayer from "../../__TEST__UTILS__/createTestPlayer";
import {Entity} from "game-platform";
import {BaseEntity} from "../../../src/gameEngine/BaseEntity";


describe('Tests for the AI system', () => {
  let systemArguments: ISystemArguments, spyHandleAreaChange: fn, player: BaseEntity;

  beforeEach(() => {
    Entity.reset();
    spyHandleAreaChange = jest.fn();
    player = createTestPlayer(0, 0);

    systemArguments = createSystemArgs(new SpyFns(null, null, null, null, spyHandleAreaChange))  as ISystemArguments;
  });

  it('doesnt break with no portals to run', () => {
    portalSystem(systemArguments);
  });

  it('triggers the handleAreaChange if player is on a tile with a correct trigger on it', () => {
    let idx = getTileIdxByEnt(player);
    systemArguments.levelArea.triggers.move[idx] = [{
      level: 99,
      area: 66,
      type: 'portal',
      oneOff: true,
      exitTile: {
        col:0,
        row:0
      }
    }];

    portalSystem(systemArguments);

    expect(spyHandleAreaChange.mock.calls[0][0]).toBe(99);
    expect(spyHandleAreaChange.mock.calls[0][1]).toBe(66);
  });
});