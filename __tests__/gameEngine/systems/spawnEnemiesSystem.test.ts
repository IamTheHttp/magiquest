import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';
import spawnEnemiesSystem from 'gameEngine/systems/spawnEnemiesSystem';
import {AI_CONTROLLED_COMP, CAN_SPAWN_COMP, SPAWNED_COMP} from 'gameEngine/components/ComponentNamesConfig';
import SpyFns from '../../__TEST__UTILS__/SpyFns';
import {ISystemArguments} from '../../../src/interfaces/IGameLoop';
import PlaceableEntity from 'gameEngine/entities/placeableEntities/PlaceableEntity';
import createTestPlayer from '../../__TEST__UTILS__/createTestPlayer';
import {Entity} from 'game-platform';
import {BaseEntity} from '../../../src/gameEngine/BaseEntity';

describe('Tests for the AI system', () => {
  let systemArguments: ISystemArguments, spyHandleAreaChange, player: BaseEntity;
  let MATH_RANDOM = global.Math.random;
  beforeEach(() => {
    Entity.reset();
    spyHandleAreaChange = jest.fn();
    player = createTestPlayer(0, 0);
    global.Math.random = () => {
      return 0; // ensure all spawns are created
    };

    systemArguments = createSystemArgs(new SpyFns(null, null, null, null, spyHandleAreaChange)) as ISystemArguments;
  });

  afterEach(() => {
    global.Math.random = MATH_RANDOM;
  });

  it('Attempts to spawn enemies on the map', () => {
    expect(Entity.getByComp<BaseEntity>(AI_CONTROLLED_COMP).length).toBe(0);
    spawnEnemiesSystem(systemArguments);

    expect(Entity.getByComp<BaseEntity>(AI_CONTROLLED_COMP).length).toBeGreaterThan(0);
  });

  it('Can safely not create any enemies', () => {
    global.Math.random = () => {
      return 1; // prevents all spawns from being created
    };
    expect(Entity.getByComp<BaseEntity>(AI_CONTROLLED_COMP).length).toBe(0);
    spawnEnemiesSystem(systemArguments);

    expect(Entity.getByComp<BaseEntity>(AI_CONTROLLED_COMP).length).toBe(0);
  });

  it('Spawns an enemy that gets the right SpawnedComponent', () => {
    spawnEnemiesSystem(systemArguments);

    let ents = Entity.getByComp<BaseEntity>(SPAWNED_COMP) as PlaceableEntity[];
    ents.forEach((ent) => {
      expect(typeof ent[SPAWNED_COMP].spawningTileLocationID).toBe('string');
    });
  });
});
