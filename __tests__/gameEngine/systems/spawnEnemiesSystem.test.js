import GAME_PLATFORM from 'game-platform/dist';
import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';
import Player from 'entities/Player';
import portalSystem from 'gameEngine/systems/portalSystem';
import spawnEnemiesSystem from 'gameEngine/systems/spawnEnemiesSystem';
import { AI_CONTROLLED_COMP, CAN_SPAWN_COMP } from 'gameEngine/components/ComponentNamesConfig';

let {Entity} = GAME_PLATFORM;

describe('Tests for the AI system', () => {
  let systemArguments, spyHandleAreaChange, player;
  
  beforeEach(() => {
    Entity.reset();
    spyHandleAreaChange = jest.fn();
    player = new Player({
      col: 0,
      row: 0,
      radius: 16
    });

    systemArguments = createSystemArgs({spyHandleAreaChange});
  });
  
  it('Attempts to spawn enemies on the map', () => {
    expect(Entity.getByComps(AI_CONTROLLED_COMP).length).toBe(0);
    spawnEnemiesSystem(systemArguments);

    expect(Entity.getByComps(AI_CONTROLLED_COMP).length).toBeGreaterThan(0);
  });

  it('Can safely not create any enemies', () => {
    global.Math.random = () => {
      return 1; // prevents all spawns from being created
    }
    expect(Entity.getByComps(AI_CONTROLLED_COMP).length).toBe(0);
    spawnEnemiesSystem(systemArguments);

    expect(Entity.getByComps(AI_CONTROLLED_COMP).length).toBe(0);
  });
});