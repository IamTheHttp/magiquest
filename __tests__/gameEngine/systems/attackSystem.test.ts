import GAME_PLATFORM from 'game-platform';
import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';
import Player from 'entities/characters/Player';
import attackSystem from 'gameEngine/systems/attackSystem';
import IsAttackingComp from 'gameEngine/components/IsAttacking';
import {
  IS_ATTACKING_COMP,
  HEALTH_COMP,
  ATTACK_COMP
} from 'gameEngine/components/ComponentNamesConfig';
import Enemy from 'entities/characters/Enemies/Enemy';
import updateMapTileIdx from 'gameEngine/utils/systemUtils/move/updateMapTileIdx';
import playerAnimations from 'gameEngine/entities/animations/playerAnimations';
import SpyFns from "../../__TEST__UTILS__/SpyFns";
import {ISystemArguments} from "../../../src/interfaces/gameloop.i";
import BaseEntity from "BaseEntity";
import {AllowedLevelLocationIDs} from "gameConstants";
import GameEvents, {EnemyKilledEvent, IGameEvent} from "classes/GameEvents";
import createNewEnemy from "../../__TEST__UTILS__/createEnemy";

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

    let enemy = createNewEnemy(1, 1, 1,  AllowedLevelLocationIDs.TOWN);
    let {x, y} = enemy.getPos();
    updateMapTileIdx({ entity: enemy, tileIdxMap, newX: x, newY: y });

    let playerDmg = player[ATTACK_COMP].damage;
    let maxHealth = enemy[HEALTH_COMP].max;
    let currentHealth = enemy[HEALTH_COMP].current;

    // Sanity, expect health to be defined and set correctly
    expect(maxHealth).toBe(currentHealth);
    expect(maxHealth).toBeGreaterThan(0);

    // start the attack
    player.addComponent(new IsAttackingComp(targetTile));
    attackSystem(systemArguments);

    // expect damage equal to the playerDmg
    expect(enemy[HEALTH_COMP].current).toBe(maxHealth - playerDmg);

    // running the attack system again will not attack, as the cooldown is not done
    attackSystem(systemArguments);
    expect(enemy[HEALTH_COMP].current).toBe(maxHealth - playerDmg);
  });

  it('Can kill an enemy', () => {
    let {tileIdxMap, gameEvents} = systemArguments;
    let targetTile = tileIdxMap['1-1'];
    let enemy = createNewEnemy(1, 1, 1,  AllowedLevelLocationIDs.TOWN);
    let {x, y} = enemy.getPos();
    updateMapTileIdx({ entity: enemy, tileIdxMap, newX: x, newY: y });

    // expect(enemy.hasComponents()).toBeFalsy();
    console.log(gameEvents);

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


    let eventsForNextTick:IGameEvent[] = gameEvents.nextEvents;

    let firstEvent = eventsForNextTick[0];

    expect(firstEvent instanceof EnemyKilledEvent).toBe(true);

    if (firstEvent instanceof EnemyKilledEvent) {
      expect(firstEvent.readEvent().entity).toBe(enemy);
    }
  });

  it('No longer attacks once the attack frames are done', () => {
    let {tileIdxMap} = systemArguments;
    let targetTile = tileIdxMap['1-1'];
    let enemy = createNewEnemy(1, 1, 1,  AllowedLevelLocationIDs.TOWN);
    let {x, y} = enemy.getPos();
    updateMapTileIdx({ entity: enemy, tileIdxMap, newX: x, newY: y });

    // we add these new components to override the 'cooldown' inside them
    player.addComponent(new IsAttackingComp(targetTile));

    let i = 0;

    while (i <= player[ATTACK_COMP].cooldownFrames) {
      attackSystem(systemArguments);
      i++;
    };

    // expect the enemy to have no components (as it is destroyed)
    expect (player.hasComponents(IS_ATTACKING_COMP)).toBe(false); 
  });
});