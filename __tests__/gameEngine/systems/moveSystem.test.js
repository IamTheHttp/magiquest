import moveSystem from '../../../src/gameEngine/systems/moveSystem';
import GAME_PLATFORM from 'game-platform';
import Player from '../../../src/gameEngine/entities/Player';
import IsMoving from '../../../src/gameEngine/components/Moving';
import Tile from '../../../src/gameEngine/entities/Tile';
import {IndexedTile} from '../../../src/gameEngine/Game';
import {POSITION_COMP} from '../../../src/gameEngine/components/ComponentNamesConfig';
import moveDown from '../../../src/gameEngine/utils/componentUtils/positionUtils/moveDown';

let {Entity} = GAME_PLATFORM;

describe('move system tests', () => {
  beforeEach(() => {
    Entity.reset();
  });
  
  
  it('moves an entity', () => {
    let player = new Player({
      x: 16,
      y: 16,
      radius: 16
    });
    
    player.addComponent(new IsMoving());
    
    moveDown(player);
    let spyPan = jest.fn();
    
    
    let systemArguments = {
      mapAPI: {
        getPan: () => {
          return {
            panX: 0,
            panY: 0
          };
        },
        pan: spyPan
      },
      game: {
        requestBackgroundRender: () => {}
      },
      tileIdxMap: {
        '0-0': new IndexedTile(new Tile({tileType: 1})),
        '1-0': new IndexedTile(new Tile({tileType: 1}))
      },
      viewSize: {
        mapWidth: 1000,
        mapHeight: 1000
      }
    };
    
    moveSystem(systemArguments);
    
    // Player moved - Camera should pan!
    expect(spyPan.mock.calls.length).toBe(1);
    // Dest + move = Check position was changed.
    expect(player.getPos().x).toBeGreaterThan(0);
    // expect originX to still be zero.
    expect(player[POSITION_COMP].originX).toBe(16);
    
    while (player[POSITION_COMP].originX) {
      moveSystem(systemArguments);
    }
    
    // dest reached
    expect(player.getPos().y).toBe(48);
    expect(player[POSITION_COMP].originX).toBe(null);
  });
  
  it('Test trying to move to a mountain', () => {
  
  });
  
  it('Test trying to move to an occupied land', () => {
    // Create two ents, one in an occupied position, try to move from  A to B
  });
});