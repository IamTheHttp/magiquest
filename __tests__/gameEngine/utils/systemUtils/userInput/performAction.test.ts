import createSystemArgs from '../../../../__TEST__UTILS__/createSystemArguments';
import SpyFns from "../../../../__TEST__UTILS__/SpyFns";
import {ISystemArguments} from "../../../../../src/interfaces/gameloop.i";
import createNewEnemy from "../../../../__TEST__UTILS__/createEnemy";
import createTestPlayer from "../../../../__TEST__UTILS__/createTestPlayer";
import {Entity} from "game-platform";
import updateMapTileIdx from "../../../../../src/gameEngine/utils/systemUtils/move/updateMapTileIdx";
import {AllowedLevelLocationIDs, DIRECTIONS_OPTIONS} from "../../../../../src/gameEngine/gameConstants";
import performAction from "../../../../../src/gameEngine/utils/systemUtils/userInput/performAction";
import {BaseEntity} from "../../../../../src/gameEngine/BaseEntity";
import {IS_ATTACKING_COMP} from "../../../../../src/gameEngine/components/ComponentNamesConfig";

describe('Tests the placeLevelEntities util', () => {
  let systemArguments: ISystemArguments = null;
  let player: BaseEntity = null;
  beforeEach(() => {
    // setup the test
    Entity.reset();

    player = createTestPlayer(0, 0);
    systemArguments = createSystemArgs(new SpyFns());
  });

  it('performs an action when there is no adjacent entity', () => {
    performAction(systemArguments);
  });

  it('Performs an action on an enemy entity(attack)', () => {
    let enemy = createNewEnemy(0, 1, 1,  AllowedLevelLocationIDs.TOWN);
    updateMapTileIdx({entity: enemy, tileIdxMap: systemArguments.tileIdxMap, newX: enemy.getPos().x, newY: enemy.getPos().y });
    updateMapTileIdx({entity: player, tileIdxMap: systemArguments.tileIdxMap, newX: player.getPos().x, newY: player.getPos().y });

    player.setOrientation(DIRECTIONS_OPTIONS.DOWN);

    performAction(systemArguments);

    expect(player.hasComponents(IS_ATTACKING_COMP)).toBeTruthy();
    // expect action to attack
  });

  it('Acts on triggers in a tile', () => {
  });

  it('if no triggers or entities in target tile', () => {
  });

  it('tests invalid target tiles', () => {
  });
});