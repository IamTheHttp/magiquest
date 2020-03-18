import GAME_PLATFORM from 'game-platform';
import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';
import Player from 'entities/characters/Player';
import userInputSystem, {pushAction} from 'gameEngine/systems/userInputSystem';
import {AllowedActions, DIRECTIONS_OPTIONS} from 'gameEngine/gameConstants';
import SpyFns from "../../__TEST__UTILS__/SpyFns";
import {ISystemArguments} from "../../../src/interfaces/gameloop.i";
import BaseEntity from "BaseEntity";

let {Entity} = GAME_PLATFORM;

describe('Tests for the AI system', () => {
  let systemArguments: ISystemArguments, spyPan, player: BaseEntity;

  beforeEach(() => {
    Entity.reset();
    spyPan = jest.fn();
    player = new Player({
      col: 0,
      row: 0,
      radius: 16
    });
    systemArguments = createSystemArgs(new SpyFns(spyPan));
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
    //some sanity
    expect(player.getMoveDirection()).toBeUndefined();

    pushAction({
      name: AllowedActions.MOVE_ACTION,
      direction: DIRECTIONS_OPTIONS.DOWN
    });
    userInputSystem(systemArguments);

    expect(player.getMoveDirection()).toBe(DIRECTIONS_OPTIONS.DOWN)
  });
});