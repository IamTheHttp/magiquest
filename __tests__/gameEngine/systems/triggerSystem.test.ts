import createSystemArgs from "../../__TEST__UTILS__/createSystemArguments";
import {Entity} from "game-platform";
import {ISystemArguments} from "../../../src/interfaces/gameloop.i";
import createFamNPC from "../../__TEST__UTILS__/createFamNPC";
import {BaseEntity} from "../../../src/gameEngine/BaseEntity";
import createTestPlayer from "../../__TEST__UTILS__/createTestPlayer";
import SpyFns from "../../__TEST__UTILS__/SpyFns";
import triggerSystem, {pushTrigger} from "../../../src/gameEngine/systems/triggerSystem";
import {DIALOG_COMP} from "../../../src/gameEngine/components/ComponentNamesConfig";


describe('Tests for the AI system', () => {
  let systemArguments: ISystemArguments, spyPan, player: BaseEntity, NPC: BaseEntity;

  beforeEach(() => {
    Entity.reset();
    spyPan = jest.fn();
    player = createTestPlayer(0, 0);
    NPC = createFamNPC(1, 1);

    systemArguments = createSystemArgs(new SpyFns(spyPan)) as ISystemArguments;
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