import createSystemArgs from '../../__TEST__UTILS__/createTestSystemArguments';
import {Entity} from 'game-platform';
import {ISystemArguments} from '../../../src/interfaces/IGameLoop';
import createTestFamNPC from '../../__TEST__UTILS__/createTestFamNPC';
import {BaseEntity} from '../../../src/gameEngine/BaseEntity';
import createTestPlayer from '../../__TEST__UTILS__/createTestPlayer';
import SpyFns from '../../__TEST__UTILS__/SpyFns';
import triggerSystem, {pushTrigger} from '../../../src/gameEngine/systems/triggerSystem';
import {DIALOG} from '../../../src/gameEngine/components/_ComponentNames';

describe('Tests for the trigger system', () => {
  let systemArguments: ISystemArguments;
  let spyPan;
  let player: BaseEntity;
  let NPC: BaseEntity;

  beforeEach(() => {
    Entity.reset();
    spyPan = jest.fn();
    player = createTestPlayer(0, 0);
    NPC = createTestFamNPC(1, 1);

    systemArguments = createSystemArgs(new SpyFns(spyPan)) as ISystemArguments;
  });

  it('doesnt break with no triggers to run', () => {
    triggerSystem(systemArguments);
  });

  it('When a dialog is pushed to the trigger system, the trigger system picks it up', (done) => {
    pushTrigger({
      oneOff: false,
      type: 'dialog',
      lines: [
        {
          text: 'foo'
        },
        {
          text: 'bar'
        }
      ],
      actedOnEntity: NPC
    });

    triggerSystem(systemArguments);
    expect(NPC[DIALOG].text).toContain('foo');

    // since we have a multi line dialog, at the end of the tick is new pushTrigger is called
    Promise.resolve().then(() => {
      triggerSystem(systemArguments);

      expect(NPC[DIALOG].text).toContain('bar');
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

  it('Dialog event without text should throw an exception', () => {
    pushTrigger({
      oneOff: false,
      type: 'dialog',
      lines: [],
      actedOnEntity: NPC
    });

    expect(() => {
      triggerSystem(systemArguments);
    }).toThrow();
  });
});
