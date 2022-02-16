import createSystemArgs, {MockedSystemArguments} from '../../__TEST__UTILS__/createSystemArguments';

import SpyFns from '../../__TEST__UTILS__/SpyFns';
import {ISystemArguments} from '../../../src/interfaces/IGameLoop';
import createNewEnemy from '../../__TEST__UTILS__/createEnemy';
import createTestPlayer from '../../__TEST__UTILS__/createTestPlayer';
import {Entity} from 'game-platform';
import updateMapTileIdx from '../../../src/gameEngine/utils/systemUtils/move/updateMapTileIdx';
import attackSystem from '../../../src/gameEngine/systems/attackSystem';
import moveSystem from '../../../src/gameEngine/systems/moveSystem';
import IsMoving from '../../../src/gameEngine/components/IsMoving';
import {AllowedLevelLocationIDs, TILE_SIZE} from '../../../src/gameEngine/gameConstants';
import aiSystem from '../../../src/gameEngine/systems/aiSystem';
import {HEALTH_COMP} from '../../../src/gameEngine/components/ComponentNamesConfig';

describe('Tests for the AI system', () => {
  let systemArguments: ISystemArguments, spyPan;

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
    let ent = createNewEnemy(1, 1, 1, AllowedLevelLocationIDs.TOWN);

    aiSystem(systemArguments as ISystemArguments);
    moveSystem(systemArguments as ISystemArguments);

    let {x, y} = ent.getPos();

    let xOrYDiff = x !== 48 || y !== 48;
    expect(xOrYDiff).toBe(true);
  });

  it('doesnt move an already moving AI', () => {
    let ent = createNewEnemy(1, 1, 1, AllowedLevelLocationIDs.TOWN);

    ent.addComponent(new IsMoving());

    aiSystem(systemArguments);
    moveSystem(systemArguments);

    let {x, y} = ent.getPos();

    let xOrYDiff = x !== 48 || y !== 48;
    expect(xOrYDiff).toBe(false);
  });

  it('Chases the player if within vision', () => {
    let player = createTestPlayer(0, 0);

    updateMapTileIdx({
      entity: player,
      tileIdxMap: systemArguments.tileIdxMap,
      newX: player.getPos().x,
      newY: player.getPos().y
    });

    let enemy = createNewEnemy(2, 1, 1, AllowedLevelLocationIDs.TOWN);

    // in two moves, enemy should be next to the player
    aiSystem(systemArguments);
    while (enemy.isMoving()) {
      moveSystem(systemArguments);
    }

    aiSystem(systemArguments);
    while (enemy.isMoving()) {
      moveSystem(systemArguments);
    }

    let {x: playerX, y: playerY} = player.getPos();
    let {x, y} = enemy.getPos();

    // we expect to be a tile away from the player
    expect(x - playerX + y - playerY).toBe(TILE_SIZE);

    // now that the enemy stopped moving, lets run the system again to attack
    aiSystem(systemArguments);

    let currentHealth = player[HEALTH_COMP].current;
    let max = player[HEALTH_COMP].max;
    expect(currentHealth).toBe(max);
    // the attack system should now kick-in to attack the player
    attackSystem(systemArguments);

    currentHealth = player[HEALTH_COMP].current;
    expect(currentHealth).toBeLessThan(max);
  });

  it('Chase player right', () => {
    let player = createTestPlayer(2, 1);

    updateMapTileIdx({
      entity: player,
      tileIdxMap: systemArguments.tileIdxMap,
      newX: player.getPos().x,
      newY: player.getPos().y
    });

    let enemy = createNewEnemy(0, 1, 1, AllowedLevelLocationIDs.TOWN);

    // in two moves, enemy should be next to the player
    aiSystem(systemArguments);
    while (enemy.isMoving()) {
      moveSystem(systemArguments);
    }

    aiSystem(systemArguments);
    while (enemy.isMoving()) {
      moveSystem(systemArguments);
    }

    let {x: playerX, y: playerY} = player.getPos();
    let {x, y} = enemy.getPos();

    // we expect to be a tile away from the player
    expect(Math.abs(x - playerX + y - playerY)).toBe(TILE_SIZE);
  });

  it('Chase player down', () => {
    let player = createTestPlayer(0, 2);

    updateMapTileIdx({
      entity: player,
      tileIdxMap: systemArguments.tileIdxMap,
      newX: player.getPos().x,
      newY: player.getPos().y
    });

    let enemy = createNewEnemy(0, 0, 1, AllowedLevelLocationIDs.TOWN);

    // in two moves, enemy should be next to the player
    aiSystem(systemArguments);
    while (enemy.isMoving()) {
      moveSystem(systemArguments);
    }

    aiSystem(systemArguments);
    while (enemy.isMoving()) {
      moveSystem(systemArguments);
    }

    let {x: playerX, y: playerY} = player.getPos();
    let {x, y} = enemy.getPos();

    // we expect to be a tile away from the player
    expect(Math.abs(x - playerX + y - playerY)).toBe(TILE_SIZE);
  });

  it('Should only attack adjacent tile (Non aligned entities)', () => {
    /**
     * @type {BaseEntity}
     */
    let player = createTestPlayer(0, 0);

    updateMapTileIdx({
      entity: player,
      tileIdxMap: systemArguments.tileIdxMap,
      newX: player.getPos().x,
      newY: player.getPos().y
    });

    let enemy = createNewEnemy(1, 1, 1, AllowedLevelLocationIDs.TOWN);

    // since both X and Y are different, no attack is possible
    aiSystem(systemArguments);

    let currentHealth = player[HEALTH_COMP].current;
    let max = player[HEALTH_COMP].max;
    expect(currentHealth).toBe(max);
    // the attack system should now kick in to attack the player
    attackSystem(systemArguments);

    currentHealth = player[HEALTH_COMP].current;
    expect(currentHealth).toBe(max);
  });
});
