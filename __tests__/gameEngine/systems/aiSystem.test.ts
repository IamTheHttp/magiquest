import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';

import aiSystem from 'systems/aiSystem';
import GAME_PLATFORM from 'game-platform';
import moveSystem from 'systems/moveSystem';
import Enemy from 'entities/characters/Enemies/Enemy';
import IsMoving from 'components/IsMoving';
import Player from 'entities/characters/Player';
import updateMapTileIdx from 'utils/systemUtils/move/updateMapTileIdx';
import {bit} from 'config';
import attackSystem from 'systems/attackSystem';
import {HEALTH_COMP} from 'components/ComponentNamesConfig';
import SpyFns from "../../__TEST__UTILS__/SpyFns";
import {ISystemArguments} from "../../../src/interfaces/gameloop.i";
import {AllowedLevelLocationIDs} from "gameConstants";


let {Entity} = GAME_PLATFORM;

describe('Tests for the AI system', () => {
  let systemArguments: ISystemArguments, spyPan;

  beforeEach(() => {
    Entity.reset();
    spyPan = jest.fn();
    systemArguments = createSystemArgs(new SpyFns(spyPan));
  });

  it('doesnt break with no ents', () => {
    aiSystem(systemArguments);
  });

  it('Moves the AI', () => {
    // position in the center, so it can move up down left or right
    let ent = new Enemy({
      col: 1,
      row: 1,
      characterLevel: 1,
      spawningTileLocationID: AllowedLevelLocationIDs.LOCATION_1_CAMP
    });

    aiSystem(systemArguments);
    moveSystem(systemArguments);

    let {x, y} = ent.getPos();

    let xOrYDiff = x !== 48 || y !== 48;
    expect(xOrYDiff).toBe(true);
  });

  it('doesnt move an already moving AI', () => {
    let ent = new Enemy({
      col: 1,
      row: 1,
      characterLevel: 1,
      spawningTileLocationID: AllowedLevelLocationIDs.LOCATION_1_CAMP
    });


    ent.addComponent(new IsMoving());

    aiSystem(systemArguments);
    moveSystem(systemArguments);

    let {x, y} = ent.getPos();

    let xOrYDiff = x !== 48 || y !== 48;
    expect(xOrYDiff).toBe(false);
  });

  it('Chases the player if within vision', () => {
    let player = new Player({col: 0, row: 0});

    updateMapTileIdx({
      entity: player,
      tileIdxMap: systemArguments.tileIdxMap,
      newX: player.getPos().x,
      newY: player.getPos().y
    });

    let enemy = new Enemy({
      col: 2,
      row: 1,
      vision: 200,
      characterLevel: 1,
      spawningTileLocationID: AllowedLevelLocationIDs.LOCATION_1_CAMP
    });

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
    expect(x - playerX + y - playerY).toBe(bit);

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
    let player = new Player({col: 2, row: 1});

    updateMapTileIdx({
      entity: player,
      tileIdxMap: systemArguments.tileIdxMap,
      newX: player.getPos().x,
      newY: player.getPos().y
    });

    let enemy = new Enemy({
      col: 0,
      row: 1,
      vision: 200,
      characterLevel: 1,
      spawningTileLocationID: AllowedLevelLocationIDs.LOCATION_1_CAMP
    });

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
    expect(Math.abs(x - playerX + y - playerY)).toBe(bit);
  });

  it('Chase player down', () => {
    let player = new Player({col: 0, row: 2});

    updateMapTileIdx({
      entity: player,
      tileIdxMap: systemArguments.tileIdxMap,
      newX: player.getPos().x,
      newY: player.getPos().y
    });

    let enemy = new Enemy({
      col: 0,
      row: 0,
      vision: 200,
      characterLevel: 1,
      spawningTileLocationID: AllowedLevelLocationIDs.LOCATION_1_CAMP
    });

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
    expect(Math.abs(x - playerX + y - playerY)).toBe(bit);
  });

  it('Should only attack adjacent tile (Non aligned entities)', () => {
    /**
     * @type {BaseEntity}
     */
    let player = new Player({col: 0, row: 0});

    updateMapTileIdx({
      entity: player,
      tileIdxMap: systemArguments.tileIdxMap,
      newX: player.getPos().x,
      newY: player.getPos().y
    });

    /**
     * @type {BaseEntity}
     */
    let enemy = new Enemy({
      col: 1,
      row: 1,
      vision: 200,
      characterLevel: 1,
      spawningTileLocationID: AllowedLevelLocationIDs.LOCATION_1_CAMP
    });

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