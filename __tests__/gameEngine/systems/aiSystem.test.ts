import createSystemArgs from '../../__TEST__UTILS__/createTestSystemArguments';

import SpyFns from '../../__TEST__UTILS__/SpyFns';
import {ISystemArguments} from '../../../src/interfaces/IGameLoop';
import createNewEnemy from '../../__TEST__UTILS__/createTestEnemy';
import createTestPlayer from '../../__TEST__UTILS__/createTestPlayer';
import {Entity} from 'game-platform';
import {updateIndexedTileMap} from '../../../src/gameEngine/utils/systemUtils/move/updateIndexedTileMap';
import attackSystem from '../../../src/gameEngine/systems/attackSystem';
import moveSystem from '../../../src/gameEngine/systems/moveSystem';
import Moving from '../../../src/gameEngine/components/Moving';
import {I_ALLOWED_ZONE_LOCATION_IDS, TILE_SIZE} from '../../../src/gameEngine/gameConstants';
import aiSystem from '../../../src/gameEngine/systems/aiSystem';
import {HEALTH} from '../../../src/gameEngine/components/_ComponentNames';

describe('Tests for the AI system', () => {
  let systemArguments: ISystemArguments;
  let spyPan;

  beforeEach(() => {
    Entity.reset();
    spyPan = jest.fn();
    systemArguments = createSystemArgs(new SpyFns(spyPan)) as ISystemArguments;
  });

  it('doesnt break with no ents', () => {
    aiSystem(systemArguments as ISystemArguments);
  });

  it('Moves the AI', () => {
    // position in the center, so it can move up down left or right
    const ent = createNewEnemy(1, 1, 1, 'TOWN');

    aiSystem(systemArguments as ISystemArguments);
    moveSystem(systemArguments as ISystemArguments);

    const {x, y} = ent.getPos();

    const xOrYDiff = x !== 48 || y !== 48;
    expect(xOrYDiff).toBe(true);
  });

  it('doesnt move an already moving AI', () => {
    const ent = createNewEnemy(1, 1, 1, 'TOWN');

    ent.addComponent(new Moving());

    aiSystem(systemArguments);
    moveSystem(systemArguments);

    const {x, y} = ent.getPos();

    const xOrYDiff = x !== 48 || y !== 48;
    expect(xOrYDiff).toBe(false);
  });

  it('Chases the player if within vision', () => {
    const player = createTestPlayer(0, 0);

    updateIndexedTileMap({
      entity: player,
      indexedTileMap: systemArguments.indexedTileMap,
      newX: player.getPos().x,
      newY: player.getPos().y
    });

    const enemy = createNewEnemy(2, 1, 1, 'TOWN');

    // in two moves, enemy should be next to the player
    aiSystem(systemArguments);
    while (enemy.isMoving()) {
      moveSystem(systemArguments);
    }

    aiSystem(systemArguments);
    while (enemy.isMoving()) {
      moveSystem(systemArguments);
    }

    const {x: playerX, y: playerY} = player.getPos();
    const {x, y} = enemy.getPos();

    // we expect to be a tile away from the player
    expect(x - playerX + y - playerY).toBe(TILE_SIZE);

    // now that the enemy stopped moving, lets run the system again to attack
    aiSystem(systemArguments);

    let currentHealth = player[HEALTH].current;
    const max = player[HEALTH].max;
    expect(currentHealth).toBe(max);
    // the attack system should now kick-in to attack the player
    attackSystem(systemArguments);

    currentHealth = player[HEALTH].current;
    expect(currentHealth).toBeLessThan(max);
  });

  it('Chase player right', () => {
    const player = createTestPlayer(2, 1);

    updateIndexedTileMap({
      entity: player,
      indexedTileMap: systemArguments.indexedTileMap,
      newX: player.getPos().x,
      newY: player.getPos().y
    });

    const enemy = createNewEnemy(0, 1, 1, 'TOWN');

    // in two moves, enemy should be next to the player
    aiSystem(systemArguments);
    while (enemy.isMoving()) {
      moveSystem(systemArguments);
    }

    aiSystem(systemArguments);
    while (enemy.isMoving()) {
      moveSystem(systemArguments);
    }

    const {x: playerX, y: playerY} = player.getPos();
    const {x, y} = enemy.getPos();

    // we expect to be a tile away from the player
    expect(Math.abs(x - playerX + y - playerY)).toBe(TILE_SIZE);
  });

  it('Chase player down', () => {
    const player = createTestPlayer(0, 2);

    updateIndexedTileMap({
      entity: player,
      indexedTileMap: systemArguments.indexedTileMap,
      newX: player.getPos().x,
      newY: player.getPos().y
    });

    const enemy = createNewEnemy(0, 0, 1, 'TOWN');

    // in two moves, enemy should be next to the player
    aiSystem(systemArguments);
    while (enemy.isMoving()) {
      moveSystem(systemArguments);
    }

    aiSystem(systemArguments);
    while (enemy.isMoving()) {
      moveSystem(systemArguments);
    }

    const {x: playerX, y: playerY} = player.getPos();
    const {x, y} = enemy.getPos();

    // we expect to be a tile away from the player
    expect(Math.abs(x - playerX + y - playerY)).toBe(TILE_SIZE);
  });

  it('Should only attack adjacent tile (Non aligned entities)', () => {
    /**
     * @type {BaseEntity}
     */
    const player = createTestPlayer(0, 0);

    updateIndexedTileMap({
      entity: player,
      indexedTileMap: systemArguments.indexedTileMap,
      newX: player.getPos().x,
      newY: player.getPos().y
    });

    const enemy = createNewEnemy(1, 1, 1, 'TOWN');

    // since both X and Y are different, no attack is possible
    aiSystem(systemArguments);

    let currentHealth = player[HEALTH].current;
    const max = player[HEALTH].max;
    expect(currentHealth).toBe(max);
    // the attack system should now kick in to attack the player
    attackSystem(systemArguments);

    currentHealth = player[HEALTH].current;
    expect(currentHealth).toBe(max);
  });
});
