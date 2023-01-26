import createSystemArgs from '../../__TEST__UTILS__/createTestSystemArguments';
import attackSystem from 'gameEngine/systems/attackSystem';
import IsAttackingComp from 'gameEngine/components/IsAttacking';
import {IS_ATTACKING_COMP, HEALTH_COMP, ATTACK_COMP} from 'gameEngine/components/ComponentNamesConfig';
import {updateMapTileIdx} from 'gameEngine/utils/systemUtils/move/updateMapTileIdx';
import SpyFns from '../../__TEST__UTILS__/SpyFns';
import {ISystemArguments} from '../../../src/interfaces/IGameLoop';
import createNewEnemy from '../../__TEST__UTILS__/createTestEnemy';
import createTestPlayer from '../../__TEST__UTILS__/createTestPlayer';
import {Entity} from 'game-platform';
import {AllowedZoneLocationIDs} from '../../../src/gameEngine/gameConstants';
import {BaseEntity} from '../../../src/gameEngine/BaseEntity';

describe('attack system tests', () => {
  let systemArguments: ISystemArguments, spyPan;
  let player: BaseEntity;

  beforeEach(() => {
    Entity.reset();
    spyPan = jest.fn();

    systemArguments = createSystemArgs(new SpyFns(spyPan)) as ISystemArguments;
    player = createTestPlayer(0, 0);

    let {x, y} = player.getPos();
    updateMapTileIdx({
      entity: player,
      tileIdxMap: systemArguments.tileIdxMap,
      newX: x,
      newY: y
    });
  });

  it('doesnt break without entities', () => {
    attackSystem(systemArguments);
  });

  it('attacks an empty tile without errors', () => {
    let targetTile = systemArguments.tileIdxMap['1,1']; // TODO move to util to abstract the comma

    player.addComponent(new IsAttackingComp(targetTile));
    attackSystem(systemArguments);
    // expect the player not to be attacking anymore
    expect(player.hasComponents(IS_ATTACKING_COMP)).toBe(false);
  });

  it('Cannot attack self', () => {
    let targetTile = systemArguments.tileIdxMap['0,0']; // TODO move to util to abstract the comma

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
    let targetTile = tileIdxMap['1,1']; // TODO move to util to abstract the comma

    let enemy = createNewEnemy(1, 1, 1, AllowedZoneLocationIDs.TOWN);
    let {x, y} = enemy.getPos();
    updateMapTileIdx({entity: enemy, tileIdxMap, newX: x, newY: y});

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
    expect(enemy[HEALTH_COMP].current).toBe(Math.max(maxHealth - playerDmg, 0));

    // running the attack system again will not attack, as the cooldown is not done
    attackSystem(systemArguments);
    expect(enemy[HEALTH_COMP].current).toBe(Math.max(maxHealth - playerDmg, 0));
  });

  it('Can kill an enemy', () => {
    let {tileIdxMap, gameEvents} = systemArguments;
    let targetTile = tileIdxMap['1,1']; // TODO move to util to abstract the comma
    let enemy = createNewEnemy(1, 1, 1, AllowedZoneLocationIDs.TOWN);
    let {x, y} = enemy.getPos();
    updateMapTileIdx({entity: enemy, tileIdxMap, newX: x, newY: y});

    // expect(enemy.hasComponents()).toBeFalsy();

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

    expect(systemArguments.destroyedPlaceableEntities.length).toBe(1);
    expect(systemArguments.destroyedPlaceableEntities[0]).toBe(enemy);
  });

  it('No longer attacks once the attack frames are done', () => {
    let {tileIdxMap} = systemArguments;
    let targetTile = tileIdxMap['1,1']; // TODO move to util to abstract the comma
    let enemy = createNewEnemy(1, 1, 1, AllowedZoneLocationIDs.TOWN);
    let {x, y} = enemy.getPos();
    updateMapTileIdx({entity: enemy, tileIdxMap, newX: x, newY: y});

    // we add these new components to override the 'cooldown' inside them
    player.addComponent(new IsAttackingComp(targetTile));

    let i = 0;

    while (i <= player[ATTACK_COMP].cooldownFrames) {
      attackSystem(systemArguments);
      i++;
    }

    // expect the enemy to have no components (as it is destroyed)
    expect(player.hasComponents(IS_ATTACKING_COMP)).toBe(false);
  });

  it('Higher level enemies have more damage', () => {
    let {tileIdxMap} = systemArguments;
    let targetTile = tileIdxMap['1,1']; // TODO move to util to abstract the comma
    let weak = createNewEnemy(1, 1, 1, AllowedZoneLocationIDs.TOWN);
    let strong = createNewEnemy(1, 1, 100, AllowedZoneLocationIDs.TOWN);

    expect(strong[ATTACK_COMP].damage).toBeGreaterThan(weak[ATTACK_COMP].damage);
  });
});
