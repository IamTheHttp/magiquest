var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
// store our triggers, singleton
import { Entity } from 'gameEngine/BaseEntity';
import { PLAYER_CONTROLLED_COMP } from 'gameEngine/components/ComponentNamesConfig';
import Dialog from 'gameEngine/components/Dialog';
/**
 *
 * @type {Array.<Trigger>}
 */
var triggers = [];
function pushTrigger(trigger) {
    triggers.push(trigger);
}
var Trigger = /** @class */ (function () {
    function Trigger(_a) {
        var type = _a.type, lines = _a.lines, _b = _a.actedOnEntity, actedOnEntity = _b === void 0 ? null : _b;
        this.type = type;
        this.lines = lines;
        this.actedOnEntity = actedOnEntity;
    }
    return Trigger;
}());
// class DialogTrigger {
//
// }
//
// class MoveTrigger {
//
// }
function triggerSystem(systemArguments) {
    var player = Entity.getByComps(PLAYER_CONTROLLED_COMP)[0];
    // loop over all actions
    triggers.forEach(function (trigger) {
        if (trigger.type === 'dialog') {
            // get lines of the dialog
            var lines = trigger.lines;
            var line = lines[0];
            var nextLine = lines[1];
            if (line) {
                line.speaker && trigger.actedOnEntity.addComponent(new Dialog(line.text));
                !line.speaker && player.addComponent(new Dialog(line.text));
            }
            else {
                trigger.actedOnEntity.addComponent(new Dialog('I have nothing to say'));
            }
            if (nextLine) {
                // end of tick
                var lines_1 = __spreadArrays(trigger.lines);
                lines_1.shift();
                Promise.resolve().then(function () {
                    pushTrigger(new Trigger({
                        type: 'dialog',
                        lines: lines_1,
                        actedOnEntity: trigger.actedOnEntity
                    }));
                });
            }
        }
    });
    // reset triggers when we're done
    if (triggers.length) {
        triggers = [];
    }
}
export default triggerSystem;
export { pushTrigger, Trigger };
