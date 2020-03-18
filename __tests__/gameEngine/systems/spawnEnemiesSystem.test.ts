import GAME_PLATFORM from 'game-platform';
import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';
import Player from 'entities/characters/Player';
import portalSystem from 'gameEngine/systems/portalSystem';
import spawnEnemiesSystem from 'gameEngine/systems/spawnEnemiesSystem';
import {AI_CONTROLLED_COMP, CAN_SPAWN_COMP, SPAWNED_COMP} from 'gameEngine/components/ComponentNamesConfig';
import SpyFns from "../../__TEST__UTILS__/SpyFns";
import {ISystemArguments} from "../../../src/interfaces/gameloop.i";
import BaseEntity from "BaseEntity";
import SpawnedComponent from "components/SpawnedComponent";
import Enemy from "entities/characters/Enemies/Enemy";

let {Entity} = GAME_PLATFORM;

describe('Tests for the AI system', () => {
  let systemArguments: ISystemArguments, spyHandleAreaChange, player: BaseEntity;
  
  beforeEach(() => {
    Entity.reset();
    spyHandleAreaChange = jest.fn();
    player = new Player({
      col: 0,
      row: 0,
      radius: 16
    });

    systemArguments = createSystemArgs(new SpyFns(null, null, null, null, spyHandleAreaChange));
  });
  
  it('Attempts to spawn enemies on the map', () => {
    expect(Entity.getByComp(AI_CONTROLLED_COMP).length).toBe(0);
    spawnEnemiesSystem(systemArguments);

    expect(Entity.getByComp(AI_CONTROLLED_COMP).length).toBeGreaterThan(0);
  });

  it('Can safely not create any enemies', () => {
    global.Math.random = () => {
      return 1; // prevents all spawns from being created
    }
    expect(Entity.getByComp(AI_CONTROLLED_COMP).length).toBe(0);
    spawnEnemiesSystem(systemArguments);

    expect(Entity.getByComp(AI_CONTROLLED_COMP).length).toBe(0);
  });

  it('Spawns an enemy that gets the right SpawnedComponent', () => {
    global.Math.random = () => {
      return 0; // ensure all spawns are created
    };

    spawnEnemiesSystem(systemArguments);

    let ents = Entity.getByComp(SPAWNED_COMP) as Enemy[];
    ents.forEach((ent) => {
      expect(typeof ent[SPAWNED_COMP].spawningTileLocationID).toBe('string');
    });
  });
});