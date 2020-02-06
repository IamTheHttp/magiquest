import GAME_PLATFORM from 'game-platform/dist';
import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';
import triggerSystem, {pushTrigger} from 'systems/triggerSystem';
import Player from 'gameEngine/entities/Player';
import {DIALOG_COMP} from 'components/ComponentNamesConfig';
import Sentry from 'entities/Sentry';
import FamNPC from 'entities/FamNPC';
import userInputSystem, {pushAction} from 'gameEngine/systems/userInputSystem';
import { MOVE_ACTION, DIRECTIONS } from 'gameEngine/gameConstants';
import SpyFns from "../../__TEST__UTILS__/SpyFns";

let {Entity} = GAME_PLATFORM;

describe('Tests for the AI system', () => {
  let systemArguments, spyPan, player, NPC;
  
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
      name:'foo'
    });
    userInputSystem(systemArguments);
  });

  it('Performs a move action', () => {
    //some sanity
    expect(player.getMoveDirection()).toBeUndefined();

    pushAction({
      name:MOVE_ACTION,
      direction: DIRECTIONS.DOWN
    });
    userInputSystem(systemArguments);

    expect(player.getMoveDirection()).toBe(DIRECTIONS.DOWN)
  });
});