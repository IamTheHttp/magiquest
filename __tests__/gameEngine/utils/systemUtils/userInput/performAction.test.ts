import createSystemArgs from '../../../../__TEST__UTILS__/createTestSystemArguments';
import SpyFns from '../../../../__TEST__UTILS__/SpyFns';
import {ISystemArguments} from '../../../../../src/interfaces/IGameLoop';
import createNewEnemy from '../../../../__TEST__UTILS__/createTestEnemy';
import createTestPlayer from '../../../../__TEST__UTILS__/createTestPlayer';
import {Entity} from 'game-platform';
import {updateIndexedTileMap} from '../../../../../src/gameEngine/utils/systemUtils/move/updateIndexedTileMap';
import {DIRECTIONS} from '../../../../../src/gameEngine/gameConstants';
import performAction from '../../../../../src/gameEngine/utils/systemUtils/userInput/performAction';
import {BaseEntity} from '../../../../../src/gameEngine/BaseEntity';
import {ATTACKING} from '../../../../../src/gameEngine/components/_ComponentNames';

describe('Tests the placeLevelEntities util', () => {
  let systemArguments: ISystemArguments = null;
  let player: BaseEntity = null;
  beforeEach(() => {
    // set up the test
    Entity.reset();

    player = createTestPlayer(0, 0);
    systemArguments = createSystemArgs(new SpyFns()) as ISystemArguments;
  });

  it('performs an action when there is no adjacent entity', () => {
    performAction(systemArguments, null);
  });

  it('Performs an action on an enemy entity(attack)', () => {
    const enemy = createNewEnemy(0, 1, 1, 'TOWN');
    updateIndexedTileMap({
      entity: enemy,
      indexedTileMap: systemArguments.indexedTileMap,
      newX: enemy.getPos().x,
      newY: enemy.getPos().y
    });
    updateIndexedTileMap({
      entity: player,
      indexedTileMap: systemArguments.indexedTileMap,
      newX: player.getPos().x,
      newY: player.getPos().y
    });

    player.setOrientation(DIRECTIONS.DOWN);

    performAction(systemArguments, null);

    expect(player.hasComponents(ATTACKING)).toBeTruthy();
    // expect action to attack
  });

  it('Acts on triggers in a tile', () => {});

  it('if no triggers or entities in target tile', () => {});

  it('tests invalid target tiles', () => {});
});
