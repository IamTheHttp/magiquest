import GAME_PLATFORM from 'game-platform';
import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';
import Player from 'entities/characters/Player';
import attackSystem from 'gameEngine/systems/attackSystem';
import IsAttackingComp from 'gameEngine/components/IsAttacking';
import { IS_ATTACKING_COMP, HEALTH_COMP, ATTACK_COMP } from 'gameEngine/components/ComponentNamesConfig';
import Sentry from 'gameEngine/entities/characters/Enemy';
import updateMapTileIdx from 'gameEngine/utils/systemUtils/move/updateMapTileIdx';
import playerAnimations from 'gameEngine/entities/animations/playerAnimations';
import SpyFns from "../../__TEST__UTILS__/SpyFns";
import {ISystemArguments} from "../../../src/interfaces/gameloop.i";
import BaseEntity from "BaseEntity";

let {Entity} = GAME_PLATFORM;

describe('attack system tests', () => {
  let systemArguments: ISystemArguments, spyPan;
  let player: BaseEntity;

  beforeEach(() => {
    Entity.reset();
    spyPan = jest.fn();

    systemArguments = createSystemArgs(new SpyFns(spyPan));
    player = new Player({
      col:0,
      row:0,
      radius: 16
    });

    let {x, y} = player.getPos();
    updateMapTileIdx({ entity: player, tileIdxMap: systemArguments.tileIdxMap, newX: x, newY: y });
  });
  
  it ('doesnt break without entities', () => {
    attackSystem(systemArguments);
  });

  it ('attacks an empty tile without errors', () => {
    let targetTile = systemArguments.tileIdxMap['1-1'];
    
    player.addComponent(new IsAttackingComp(targetTile));
    attackSystem(systemArguments);
    // expect the player not to be attacking anymore
    expect (player.hasComponents(IS_ATTACKING_COMP)).toBe(false); 
  });

  it ('Cannot attack self', () => {
    let targetTile = systemArguments.tileIdxMap['0-0']; // 0-0 player position
    
    player.addComponent(new IsAttackingComp(targetTile));
    attackSystem(systemArguments);

    let maxHealth = player[HEALTH_COMP].max;
    let currentHealth = player[HEALTH_COMP].current;

    // expect no damage, as you can't attack yourself
    expect(maxHealth).toBeGreaterThan(0);
    expect(maxHealth).toBe(currentHealth);
  });

  it('Player cannot attack twice in a row, has to wait for cooldown', () => {
    let {tileIdxMap} = systemArguments;
    let targetTile = tileIdxMap['1-1'];
    let sentry = new Sentry({col:1, row: 1});
    let {x, y} = sentry.getPos();
    updateMapTileIdx({ entity: sentry, tileIdxMap, newX: x, newY: y });

    let playerDmg = player[ATTACK_COMP].damage;
    let maxSentryHealth = sentry[HEALTH_COMP].max;
    let currentSentryHealth = sentry[HEALTH_COMP].current;

    // Sanity, expect health to be defined and set correctly
    expect(maxSentryHealth).toBe(currentSentryHealth);
    expect(maxSentryHealth).toBeGreaterThan(0);

    // start the attack
    player.addComponent(new IsAttackingComp(targetTile));
    attackSystem(systemArguments);

    // expect damage equal to the playerDmg
    expect(sentry[HEALTH_COMP].current).toBe(maxSentryHealth - playerDmg);

    // running the attack system again will not attack, as the cooldown is not done
    attackSystem(systemArguments);
    expect(sentry[HEALTH_COMP].current).toBe(maxSentryHealth - playerDmg);
  });

  it('Can kill an enemy', () => {
    let {tileIdxMap} = systemArguments;
    let targetTile = tileIdxMap['1-1'];
    let sentry = new Sentry({col:1, row: 1});
    let {x, y} = sentry.getPos();
    updateMapTileIdx({ entity: sentry, tileIdxMap, newX: x, newY: y });

    // we add these new components to override the 'cooldown' inside them
    player.addComponent(new IsAttackingComp(targetTile));
    attackSystem(systemArguments);
    player.addComponent(new IsAttackingComp(targetTile));
    attackSystem(systemArguments);
    player.addComponent(new IsAttackingComp(targetTile));
    attackSystem(systemArguments);
    player.addComponent(new IsAttackingComp(targetTile));
    attackSystem(systemArguments);
    player.addComponent(new IsAttackingComp(targetTile));
    attackSystem(systemArguments);

    // expect the sentry to have no components (as it is destroyed)
    expect(sentry.components).toEqual({});
  });

  it('No longer attacks once the attack frames are done', () => {
    let {tileIdxMap} = systemArguments;
    let targetTile = tileIdxMap['1-1'];
    let sentry = new Sentry({col:1, row: 1});
    let {x, y} = sentry.getPos();
    updateMapTileIdx({ entity: sentry, tileIdxMap, newX: x, newY: y });

    // we add these new components to override the 'cooldown' inside them
    player.addComponent(new IsAttackingComp(targetTile));

    let i = 0;

    while (i <= player[ATTACK_COMP].cooldownFrames) {
      attackSystem(systemArguments);
      i++;
    };

    // expect the sentry to have no components (as it is destroyed)
    expect (player.hasComponents(IS_ATTACKING_COMP)).toBe(false); 
  });
});