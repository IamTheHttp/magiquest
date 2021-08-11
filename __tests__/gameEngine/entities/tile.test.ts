import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';
import SpyFns from "../../__TEST__UTILS__/SpyFns";
import {ISystemArguments} from "../../../src/interfaces/gameloop.i";
import {Entity} from "game-platform";
import {CAN_SPAWN_COMP} from "../../../src/gameEngine/components/ComponentNamesConfig";
import {AllowedLevelLocationIDs} from "../../../src/gameEngine/gameConstants";
import Tile from "../../../src/gameEngine/entities/Tile";



describe('Tile tests', () => {
  let systemArguments: ISystemArguments, spyPan;

  beforeEach(() => {
    Entity.reset();
    spyPan = jest.fn();
    systemArguments = createSystemArgs(new SpyFns(spyPan));
  });

  it('Should populate tileLocationID correctly in CAN_SPAWN_COMP', () => {
    let tileLocationID = AllowedLevelLocationIDs.TOWN;
    let tileCharacterLevel = 1;

    // TODO move to util to abstract the comma (the 0,0)
    let tileArgs = {x: 0, y: 0, tileIdx: '0,0', height: 16, width: 16, tileType: 1, tileLocationID, tileCharacterLevel};
    let tile = new Tile(tileArgs);

    let comp = tile[CAN_SPAWN_COMP];
    expect(comp.tileLocationID).toBe(AllowedLevelLocationIDs.TOWN);
  });
});