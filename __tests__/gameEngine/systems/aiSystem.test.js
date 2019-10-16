import Tile from '../../../src/gameEngine/entities/Tile';
import IndexedTile from '../../../src/gameEngine/classes/IndexedTile';
import aiSystem from '../../../src/gameEngine/systems/aiSystem';
import Sentry from '../../../src/gameEngine/entities/Sentry';
import moveSystem from '../../../src/gameEngine/systems/moveSystem';
import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';



describe('Tests for the AI system', () => {
  let systemArguments, spyPan;
  
  beforeEach(() => {
    Entity.reset();
    spyPan = jest.fn();
    systemArguments = createSystemArgs(spyPan);
  });
  
  it ('Moves the AI', () => {
    let ent = new Sentry({
      x: 16,
      y: 16
    });
    
    aiSystem(systemArguments);
    moveSystem(systemArguments);
    
    expect(ent.getPos().x).toBeGreaterThan(0);
    expect(ent.getPos().y).toBeGreaterThan(0);
  });
});