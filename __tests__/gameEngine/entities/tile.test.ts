import createSystemArgs from '../../__TEST__UTILS__/createTestSystemArguments';
import SpyFns from '../../__TEST__UTILS__/SpyFns';
import {ISystemArguments} from '../../../src/interfaces/IGameLoop';
import {Entity} from 'game-platform';
import {SPAWNER} from '../../../src/gameEngine/components/_ComponentNames';
import {AllowedZoneLocationIDs} from '../../../src/gameEngine/gameConstants';
import Tile from '../../../src/gameEngine/entities/Tile';

describe('Tile tests', () => {
  let systemArguments: ISystemArguments, spyPan;

  beforeEach(() => {
    Entity.reset();
    spyPan = jest.fn();
    systemArguments = createSystemArgs(new SpyFns(spyPan)) as ISystemArguments;
  });

  it('Should populate tileLocationID correctly in CAN_SPAWN_COMP', () => {
    let tileLocationID = AllowedZoneLocationIDs.TOWN;
    let tileEntityLevel = 1;

    // TODO move to util to abstract the comma (the 0,0)
    let tileArgs = {
      x: 0,
      y: 0,
      tileIdx: '0,0',
      height: 16,
      width: 16,
      tileType: 1,
      tileLocationID,
      tileEntityLevel
    };
    let tile = new Tile(tileArgs);

    let comp = tile[SPAWNER];
    expect(comp.tileLocationID).toBe(AllowedZoneLocationIDs.TOWN);
  });
});
