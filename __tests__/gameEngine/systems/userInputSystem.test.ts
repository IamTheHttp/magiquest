import createSystemArgs from '../../__TEST__UTILS__/createTestSystemArguments';
import userInputSystem, {pushAction} from 'gameEngine/systems/userInputSystem';
import SpyFns from '../../__TEST__UTILS__/SpyFns';
import {ISystemArguments} from '../../../src/interfaces/IGameLoop';
import createTestPlayer from '../../__TEST__UTILS__/createTestPlayer';
import {Entity} from 'game-platform';
import Player from '../../../src/gameEngine/entities/placeableEntities/Player';

describe('Tests for the User Input system', () => {
  let systemArguments: ISystemArguments;
  let spyPan;
  let player: Player;

  beforeEach(() => {
    Entity.reset();
    spyPan = jest.fn();
    player = createTestPlayer(0, 0);
    systemArguments = createSystemArgs(new SpyFns(spyPan)) as ISystemArguments;
  });

  it('Runs without actions', () => {
    userInputSystem(systemArguments);
  });

  it('Adds an non-existent action type', () => {
    pushAction({
      name: 'foo' as any // force test to accept wrong type
    });
    userInputSystem(systemArguments);
  });

  it('Performs a move action', () => {
    // some sanity
    expect(player.getMoveDirection()).toBeUndefined();

    pushAction({
      name: 'MOVE_ACTION',
      direction: 'DOWN'
    });
    userInputSystem(systemArguments);

    expect(player.getMoveDirection()).toBe('DOWN');
  });
});
