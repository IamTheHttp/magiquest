import GAME_PLATFORM from 'game-platform';
import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';
import Player from 'entities/characters/Player';
import userInputSystem, {pushAction} from 'gameEngine/systems/userInputSystem';
import {AllowedActions, DIRECTIONS_OPTIONS} from 'gameEngine/gameConstants';
import SpyFns from "../../__TEST__UTILS__/SpyFns";
import {ISystemArguments} from "../../../src/interfaces/gameloop.i";
import createTestPlayer from "../../__TEST__UTILS__/createTestPlayer";
import {AllowedSkills} from "../../../src/data/skillConfig";
import {CHARACTER_SKILLS_COMP, EXPERIENCE_COMP} from "components/ComponentNamesConfig";
import {PlayerSkillsChangeEvent} from "classes/GameEvents";

let {Entity} = GAME_PLATFORM;

describe('Tests for the User Input system', () => {
  let systemArguments: ISystemArguments, spyPan, player: Player;

  beforeEach(() => {
    Entity.reset();
    spyPan = jest.fn();
    player = createTestPlayer(0, 0);
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

  it('Buys a skill', () => {
    pushAction({
      name: AllowedActions.BUY_SKILL,
      data: {
        skillID: AllowedSkills.FIRE_BULLET
      }
    });

    // ensure player has enough XP to buy skill
    player[EXPERIENCE_COMP].XP = 10000000; // some very big number
    userInputSystem(systemArguments);

    expect(player[CHARACTER_SKILLS_COMP].skills).toContain(AllowedSkills.FIRE_BULLET);
    expect(systemArguments.gameEvents.nextEvents[0]).toBeInstanceOf(PlayerSkillsChangeEvent);
  });
});