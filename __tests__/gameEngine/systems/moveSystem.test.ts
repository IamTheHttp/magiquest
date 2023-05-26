import createSystemArgs from '../../__TEST__UTILS__/createTestSystemArguments';
import {ISystemArguments} from '../../../src/interfaces/IGameLoop';
import createTestPlayer from '../../__TEST__UTILS__/createTestPlayer';
import {Entity} from 'game-platform';
import moveSystem from '../../../src/gameEngine/systems/moveSystem';
import Moving from '../../../src/gameEngine/components/Moving';
import {POSITION} from '../../../src/gameEngine/components/_ComponentNames';
import SpyFns, {fn} from '../../__TEST__UTILS__/SpyFns';
import {BaseEntity} from '../../../src/gameEngine/BaseEntity';

describe('move system tests', () => {
  let systemArguments: ISystemArguments;
  let spyPan: fn;
  let player: BaseEntity;

  beforeEach(() => {
    Entity.reset();
    spyPan = jest.fn();
    systemArguments = createSystemArgs(new SpyFns(spyPan)) as ISystemArguments;

    player = createTestPlayer(0, 0);
  });

  it('doesnt break without entities', () => {
    moveSystem(systemArguments);
  });

  it('moves an entity', () => {
    player.addComponent(new Moving());

    player.setDestTo('DOWN');

    moveSystem(systemArguments);

    // Dest + move = Check position was changed.
    expect(player.getPos().y).toBeGreaterThan(16);
    // expect originX to still be 16 (where we started)
    expect(player[POSITION].originX).toBe(16);

    while (player[POSITION].originY) {
      moveSystem(systemArguments);
    }

    // dest reached
    expect(player.getPos().y).toBe(48);
    expect(player[POSITION].originX).toBe(null);
  });

  it('Test trying to move out of screen', () => {
    player.addComponent(new Moving());

    player.setDestTo('LEFT');

    moveSystem(systemArguments);

    // we can't move to the edge of screen, equal to edge of screen
    expect(spyPan.mock.calls.length).toBe(0);
    expect(player[POSITION].originX).toBe(null);
    expect(player[POSITION].originY).toBe(null);
    expect(player.getDest().y).toBe(null);
  });

  it('Test movement with a direction instead of X,Y', () => {
    player.setMoveDirection('DOWN');
    expect(player.getDest().y).toBe(null);
    moveSystem(systemArguments);
    expect(player.getDest().y).toBe(48); // since we start at 16 16 and go one tile down

    while (player.getDest().y) {
      moveSystem(systemArguments);
    }

    expect(player.getDest().y).toBe(null); // dest reached
  });

  it('Nothing breaks if no direction, and no destination', () => {
    player.addComponent(new Moving());

    moveSystem(systemArguments);

    expect(player.isMoving()).toBeFalsy();
    expect(player.getDest().x).toBe(null);
  });

  it('Test moving over a mountain (two steps down in our mock data)', () => {
    player.addComponent(new Moving());
    player.setDestTo('DOWN');

    // move one tile down
    while (player.getDest().y) {
      moveSystem(systemArguments);
    }

    player.addComponent(new Moving());
    player.setDestTo('DOWN');

    // move two tiles down
    while (player.getDest().y) {
      moveSystem(systemArguments);
    }

    // try a third move down (we can't, there's a mountain there)
    player.addComponent(new Moving());
    player.setDestTo('DOWN');

    const currY = player.getPos().y;
    // move two tiles down
    while (player.getDest().y) {
      moveSystem(systemArguments);
    }

    // no movement, as we can't go through a mountain
    expect(player.getPos().y).toBe(currY);
  });
});
