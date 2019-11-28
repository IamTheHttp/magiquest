import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';

import aiSystem from 'systems/aiSystem';
import GAME_PLATFORM from 'game-platform/dist';
import moveSystem from 'systems/moveSystem';
import Sentry from 'entities/Sentry';
import IsMoving from 'components/IsMoving';
import Player from 'entities/Player';
import updateMapTileIdx from 'utils/systemUtils/move/updateMapTileIdx';
import {bit} from 'config';
import attackSystem from 'systems/attackSystem';
import {HEALTH_COMP} from 'components/ComponentNamesConfig';

let {Entity} = GAME_PLATFORM;

describe('Tests for the AI system', () => {
  let systemArguments, spyPan;
  
  beforeEach(() => {
    Entity.reset();
    spyPan = jest.fn();
    systemArguments = createSystemArgs({spyPan});
  });
  
  it('doesnt break with no ents', () => {
    aiSystem(systemArguments);
  });
  
  it('Moves the AI', () => {
    // position in the center, so it can move up down left or right
    let ent = new Sentry({col:1, row:1});

    aiSystem(systemArguments);
    moveSystem(systemArguments);

    let {x, y} = ent.getPos();
    
    let xOrYDiff = x !== 48 || y !== 48;
    expect(xOrYDiff).toBe(true);
  });
  
  it('doesnt move an already moving AI', () => {
    let ent = new Sentry({col:1, row:1});

    
    ent.addComponent(new IsMoving());

    aiSystem(systemArguments);
    moveSystem(systemArguments);

    let {x, y} = ent.getPos();
    
    let xOrYDiff = x !== 48 || y !== 48;
    expect(xOrYDiff).toBe(false);
  });

  it('Chases the player if within vision', () => {
    /**
     * @type {BaseEntity}
     */
    let player = new Player({col:0, row:0});

    updateMapTileIdx({entity: player, tileIdxMap: systemArguments.tileIdxMap, newX: player.getPos().x, newY: player.getPos().y });

    /**
     * @type {BaseEntity}
     */
    let sentry = new Sentry({col:2, row:1, vision:200});

    // in two moves, sentry should be next to the player
    aiSystem(systemArguments);
    while (sentry.isMoving()) {
      moveSystem(systemArguments);
    }

    aiSystem(systemArguments);
    while (sentry.isMoving()) {
      moveSystem(systemArguments);
    }

    let {x: playerX, y: playerY} = player.getPos();
    let {x, y} = sentry.getPos();


    expect(x - playerX + y - playerY).toBe(bit);

    // we expect to be a tile away from the player

    // now that the enemy stopped moving, lets run the system again to attack
    aiSystem(systemArguments);

    let currentHealth = player[HEALTH_COMP].current;
    let max = player[HEALTH_COMP].max;
    expect(currentHealth).toBe(max);
    // the attack system should now kick in to attack the player
    attackSystem(systemArguments);

    currentHealth = player[HEALTH_COMP].current;
    expect(currentHealth).toBeLessThan(max);
  });

  it('Should only attack adjacent tile (Non aligned entities)', () => {
    /**
     * @type {BaseEntity}
     */
    let player = new Player({col:0, row:0});

    updateMapTileIdx({entity: player, tileIdxMap: systemArguments.tileIdxMap, newX: player.getPos().x, newY: player.getPos().y });

    /**
     * @type {BaseEntity}
     */
    let sentry = new Sentry({
      col: 1,
      row: 1,
      vision: 200
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