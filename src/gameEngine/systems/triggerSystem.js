// store our triggers, singleton
import {Entity} from 'BaseEntity';
import {PLAYER_CONTROLLED_COMP} from 'components/ComponentNamesConfig';
import Dialog from 'components/Dialog';

/**
 *
 * @type {Array.<Trigger>}
 */
let triggers = [];

function pushTrigger(trigger) {
  triggers.push(trigger);
}

class Trigger {
  constructor({type, lines, actedOnEntity}) {
    this.type = type;
    this.lines = lines;
    this.actedOnEntity = actedOnEntity;
  }
}

// class DialogTrigger {
//
// }
//
// class MoveTrigger {
//
// }

function triggerSystem(systemArguments) {
  let player = Entity.getByComps(PLAYER_CONTROLLED_COMP)[0];

  // loop over all actions
  triggers.forEach((trigger) => {
    if (trigger.type === 'dialog') {
      // get lines of the dialog
      let lines = trigger.lines;
      let line = lines[0];
      let nextLine = lines[1];

      if (line) {
        line.speaker && trigger.actedOnEntity.addComponent(new Dialog(line.text));
        !line.speaker && player.addComponent(new Dialog(line.text));
      } else {
        trigger.actedOnEntity.addComponent(new Dialog('I have nothing to say'));
      }

      if (nextLine) {
        // end of tick
        let lines = [...trigger.lines];
        lines.shift();
        Promise.resolve().then(() => {
          pushTrigger(new Trigger({
            type: 'dialog',
            lines,
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



export {pushTrigger, Trigger};

