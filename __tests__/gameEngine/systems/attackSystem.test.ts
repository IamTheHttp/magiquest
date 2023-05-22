import createSystemArgs from '../../__TEST__UTILS__/createTestSystemArguments';
import attackSystem from 'gameEngine/systems/attackSystem';
import IsAttackingComp from 'gameEngine/components/Attacking';
import {ATTACKING, HEALTH, ATTACKER} from 'gameEngine/components/_ComponentNames';
import {updateIndexedTileMap} from 'gameEngine/utils/systemUtils/move/updateIndexedTileMap';
import SpyFns from '../../__TEST__UTILS__/SpyFns';
import {ISystemArguments} from '../../../src/interfaces/IGameLoop';
import createNewEnemy from '../../__TEST__UTILS__/createTestEnemy';
import createTestPlayer from '../../__TEST__UTILS__/createTestPlayer';
import {Entity} from 'game-platform';
import {BaseEntity} from '../../../src/gameEngine/BaseEntity';

describe('attack system tests', () => {
  let systemArguments: ISystemArguments;
  let spyPan;
  let player: BaseEntity;

  beforeEach(() => {
    Entity.reset();
    spyPan = jest.fn();

    systemArguments = createSystemArgs(new SpyFns(spyPan)) as ISystemArguments;
    player = createTestPlayer(0, 0);

    const {x, y} = player.getPos();
    updateIndexedTileMap({
      entity: player,
      indexedTileMap: systemArguments.indexedTileMap,
      newX: x,
      newY: y
    });
  });

  it('doesnt break without entities', () => {
    attackSystem(systemArguments);
  });

  it('attacks an empty tile without errors', () => {
    const targetTile = systemArguments.indexedTileMap['1,1']; // TODO move to util to abstract the comma

    player.addComponent(new IsAttackingComp(targetTile));
    attackSystem(systemArguments);
    // expect the player not to be attacking anymore
    expect(player.hasComponents(ATTACKING)).toBe(false);
  });

  it('Cannot attack self', () => {
    const targetTile = systemArguments.indexedTileMap['0,0']; // TODO move to util to abstract the comma

    player.addComponent(new IsAttackingComp(targetTile));
    attackSystem(systemArguments);

    const maxHealth = player[HEALTH].max;
    const currentHealth = player[HEALTH].current;

    // expect no damage, as you can't attack yourself
    expect(maxHealth).toBeGreaterThan(0);
    expect(maxHealth).toBe(currentHealth);
  });

  it('Player cannot attack twice in a row, has to wait for cooldown', () => {
    const {indexedTileMap} = systemArguments;
    const targetTile = indexedTileMap['1,1']; // TODO move to util to abstract the comma

    const enemy = createNewEnemy(1, 1, 1, 'TOWN');
    const {x, y} = enemy.getPos();
    updateIndexedTileMap({entity: enemy, indexedTileMap, newX: x, newY: y});

    const playerDmg = player[ATTACKER].damage;
    const maxHealth = enemy[HEALTH].max;
    const currentHealth = enemy[HEALTH].current;

    // Sanity, expect health to be defined and set correctly
    expect(maxHealth).toBe(currentHealth);
    expect(maxHealth).toBeGreaterThan(0);

    // start the attack
    player.addComponent(new IsAttackingComp(targetTile));
    attackSystem(systemArguments);

    // expect damage equal to the playerDmg
    expect(enemy[HEALTH].current).toBe(Math.max(maxHealth - playerDmg, 0));

    // running the attack system again will not attack, as the cooldown is not done
    attackSystem(systemArguments);
    expect(enemy[HEALTH].current).toBe(Math.max(maxHealth - playerDmg, 0));
  });

  it('Can kill an enemy', () => {
    const {indexedTileMap, gameEvents} = systemArguments;
    const targetTile = indexedTileMap['1,1']; // TODO move to util to abstract the comma
    const enemy = createNewEnemy(1, 1, 1, 'TOWN');
    const {x, y} = enemy.getPos();
    updateIndexedTileMap({entity: enemy, indexedTileMap, newX: x, newY: y});

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
    const {indexedTileMap} = systemArguments;
    const targetTile = indexedTileMap['1,1']; // TODO move to util to abstract the comma
    const enemy = createNewEnemy(1, 1, 1, 'TOWN');
    const {x, y} = enemy.getPos();
    updateIndexedTileMap({entity: enemy, indexedTileMap, newX: x, newY: y});

    // we add these new components to override the 'cooldown' inside them
    player.addComponent(new IsAttackingComp(targetTile));

    let i = 0;

    while (i <= player[ATTACKER].cooldownFrames) {
      attackSystem(systemArguments);
      i++;
    }

    // expect the enemy to have no components (as it is destroyed)
    expect(player.hasComponents(ATTACKING)).toBe(false);
  });

  it('Higher level enemies have more damage', () => {
    const {indexedTileMap} = systemArguments;
    const targetTile = indexedTileMap['1,1']; // TODO move to util to abstract the comma
    const weak = createNewEnemy(1, 1, 1, 'TOWN');
    const strong = createNewEnemy(1, 1, 100, 'TOWN');

    expect(strong[ATTACKER].damage).toBeGreaterThan(weak[ATTACKER].damage);
  });
});
