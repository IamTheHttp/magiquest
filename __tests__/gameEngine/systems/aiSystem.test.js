import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';

import aiSystem from 'systems/aiSystem';
import GAME_PLATFORM from 'game-platform/dist';
import moveSystem from 'systems/moveSystem';
import Sentry from 'entities/Sentry';
import IsMoving from 'components/IsMoving';

let {Entity} = GAME_PLATFORM;

describe('Tests for the AI system', () => {
  let systemArguments, spyPan;
  
  beforeEach(() => {
    Entity.reset();
    spyPan = jest.fn();
    systemArguments = createSystemArgs(spyPan);
  });
  
  it('doesnt break with no ents', () => {
    aiSystem(systemArguments);
  });
  
  it('Moves the AI', () => {
    // position in the center, so it can move up down left or right
    let ent = new Sentry({
      x: 48,
      y: 48
    });
    
    aiSystem(systemArguments);
    moveSystem(systemArguments);
    
    let {x, y} = ent.getPos();
    
    let xOrYDiff = x !== 48 || y !== 48;
    expect(xOrYDiff).toBe(true);
  });
  
  it('doesnt move an already moving AI', () => {
    let ent = new Sentry({
      x: 48,
      y: 48
    });
    
    ent.addComponent(new IsMoving());
    
    aiSystem(systemArguments);
    moveSystem(systemArguments);
    
    let {x, y} = ent.getPos();
    
    let xOrYDiff = x !== 48 || y !== 48;
    expect(xOrYDiff).toBe(false);
  });
});