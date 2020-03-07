import GAME_PLATFORM from 'game-platform';
import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';
import {DIRECTIONS, DIRECTIONS_OPTIONS} from 'gameConstants';
import Player from 'entities/Player';
import IsMoving from 'components/IsMoving';
import {POSITION_COMP} from 'components/ComponentNamesConfig';
import moveSystem from 'systems/moveSystem';
import SpyFns, {fn} from "../../__TEST__UTILS__/SpyFns";
import {ISystemArguments} from "../../../src/interfaces/gameloop.i";
import BaseEntity from "BaseEntity";
let {Entity} = GAME_PLATFORM;

describe('move system tests', () => {
  let systemArguments: ISystemArguments, spyPan: fn, player: BaseEntity;
  
  beforeEach(() => {
    Entity.reset();
    spyPan = jest.fn();
    systemArguments = createSystemArgs(new SpyFns(spyPan));

    player = new Player({
      col:0,
      row:0,
      radius: 16
    });
  });
  
  it ('doesnt break without entities', () => {
    moveSystem(systemArguments);
  });
  
  it('moves an entity', () => {
    player.addComponent(new IsMoving());
  
    player.setDestTo(DIRECTIONS_OPTIONS.DOWN);
    
    moveSystem(systemArguments);
    
    // Dest + move = Check position was changed.
    expect(player.getPos().y).toBeGreaterThan(16);
    // expect originX to still be 16 (where we started)
    expect(player[POSITION_COMP].originX).toBe(16);
    
    while (player[POSITION_COMP].originY) {
      moveSystem(systemArguments);
    }
    
    // dest reached
    expect(player.getPos().y).toBe(48);
    expect(player[POSITION_COMP].originX).toBe(null);
  });
  
  it('Test trying to move out of screen', () => {
    player.addComponent(new IsMoving());
  
    player.setDestTo(DIRECTIONS_OPTIONS.LEFT);
  
    moveSystem(systemArguments);
  
    // we can't move to the edge of screen, equal to edge of screen
    expect(spyPan.mock.calls.length).toBe(0);
    expect(player[POSITION_COMP].originX).toBe(null);
    expect(player[POSITION_COMP].originY).toBe(null);
    expect(player.getDest().y).toBe(null);
  });
  
  it('Test movement with a direction instead of X,Y', () => {
    player.setMoveDirection(DIRECTIONS_OPTIONS.DOWN);
    expect(player.getDest().y).toBe(null);
    moveSystem(systemArguments);
    expect(player.getDest().y).toBe(48); // since we start at 16 16 and go one tile down
    
    while (player.getDest().y) {
      moveSystem(systemArguments);
    }
  
    expect(player.getDest().y).toBe(null); // dest reached
  });
  
  it('Nothing breaks if no direction, and no destination', () => {
    player.addComponent(new IsMoving());
  
    moveSystem(systemArguments);
    
    expect(player.isMoving()).toBeFalsy();
    expect(player.getDest().x).toBe(null);
  });
  
  
  it('Test moving over a mountain (two steps down in our mock data)', () => {
    player.addComponent(new IsMoving());
    player.setDestTo(DIRECTIONS_OPTIONS.DOWN);

    // move one tile down
    while (player.getDest().y) {
      moveSystem(systemArguments);
    }
  
    player.addComponent(new IsMoving());
    player.setDestTo(DIRECTIONS_OPTIONS.DOWN);
  
    // move two tiles down
    while (player.getDest().y) {
      moveSystem(systemArguments);
    }
  
    // try a third move down (we can't, there's a mountain there)
    player.addComponent(new IsMoving());
    player.setDestTo(DIRECTIONS_OPTIONS.DOWN);
  
    let currY = player.getPos().y;
    // move two tiles down
    while (player.getDest().y) {
      moveSystem(systemArguments);
    }
    
    // no movement, as we can't go through a mountain
    expect(player.getPos().y).toBe(currY);
  });
});