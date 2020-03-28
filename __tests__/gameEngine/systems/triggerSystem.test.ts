import GAME_PLATFORM from 'game-platform';
import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';
import triggerSystem, {pushTrigger} from 'systems/triggerSystem';
import Player from 'entities/characters/Player';
import {DIALOG_COMP} from 'components/ComponentNamesConfig';
import FamNPC from 'entities/characters/FamNPC';
import SpyFns from "../../__TEST__UTILS__/SpyFns";
import {ISystemArguments} from "../../../src/interfaces/gameloop.i";
import BaseEntity from "BaseEntity";

let {Entity} = GAME_PLATFORM;

describe('Tests for the AI system', () => {
  let systemArguments: ISystemArguments, spyPan, player: BaseEntity, NPC: BaseEntity;

  beforeEach(() => {
    Entity.reset();
    spyPan = jest.fn();
    player = new Player({
      col: 0,
      row: 0,
      radius: 16
    });

    NPC = new FamNPC({
      x: 48,
      y: 48,
      name: 'Forest'
    });

    systemArguments = createSystemArgs(new SpyFns(spyPan));
  });
  
  it('doesnt break with no triggers to run', () => {
    triggerSystem(systemArguments);
  });

  it('When a dialog is pushed to the trigger system, the trigger system picks it up', (done) => {
    pushTrigger({
      oneOff: false,
      type: 'dialog',
      lines: [{
        text: 'foo',
        speaker:0 // when speaker is 0, that means the player is speaking
      }, {
        text: 'bar',
        speaker:1 // when speaker is 0, that means the player is speaking
      }],
      actedOnEntity: NPC
    });

    triggerSystem(systemArguments);
    expect(player[DIALOG_COMP].text).toContain('foo');

    // since we have a multi line dialog, at the end of the tick is new pushTrigger is called
    Promise.resolve().then(() => {
      triggerSystem(systemArguments);
      expect(NPC[DIALOG_COMP].text).toContain('bar');
      done();
    });
  });

  it('Cannot trigger unsupported types, does nothing but does not crash', () => {
    pushTrigger({
      oneOff: false,
      actedOnEntity: undefined,
      lines: undefined,
      type: 'OMG_WHAT' as any // force test to accept wrong type
    });

    triggerSystem(systemArguments);
  });

  it('Default line given to entity who\'s acted upon but has no lines', () => {
    pushTrigger({
      oneOff: false,
      type: 'dialog',
      lines: [],
      actedOnEntity: NPC
    });

    triggerSystem(systemArguments);

    expect(NPC[DIALOG_COMP].text).not.toBeUndefined();
  });
});