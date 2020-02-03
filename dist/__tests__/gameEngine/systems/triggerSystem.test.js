import GAME_PLATFORM from 'game-platform/dist';
import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';
import triggerSystem, { pushTrigger } from 'systems/triggerSystem';
import Player from 'entities/Player';
import { DIALOG_COMP } from 'components/ComponentNamesConfig';
import FamNPC from 'entities/FamNPC';
var Entity = GAME_PLATFORM.Entity;
describe('Tests for the AI system', function () {
    var systemArguments, spyPan, player, NPC;
    beforeEach(function () {
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
        systemArguments = createSystemArgs({ spyPan: spyPan });
    });
    it('doesnt break with no triggers to run', function () {
        triggerSystem(systemArguments);
    });
    it('When a dialog is pushed to the trigger system, the trigger system picks it up', function (done) {
        pushTrigger({
            type: 'dialog',
            lines: [{
                    text: 'foo',
                    speaker: 0 // when speaker is 0, that means the player is speaking
                }, {
                    text: 'bar',
                    speaker: 1 // when speaker is 0, that means the player is speaking
                }],
            actedOnEntity: NPC
        });
        triggerSystem(systemArguments);
        expect(player[DIALOG_COMP].text).toContain('foo');
        // since we have a multi line dialog, at the end of the tick is new pushTrigger is called
        Promise.resolve().then(function () {
            triggerSystem(systemArguments);
            expect(NPC[DIALOG_COMP].text).toContain('bar');
            done();
        });
    });
    it('Cannot trigger unsupported types, does nothing but does not crash', function () {
        pushTrigger({
            type: 'OMG_WHAT'
        });
        triggerSystem(systemArguments);
    });
    it('Default line given to entity whos acted upon but has no lines', function () {
        pushTrigger({
            type: 'OMG_WHAT'
        });
        pushTrigger({
            type: 'dialog',
            lines: [],
            actedOnEntity: NPC
        });
        triggerSystem(systemArguments);
        expect(NPC[DIALOG_COMP].text).not.toBeUndefined();
    });
});
