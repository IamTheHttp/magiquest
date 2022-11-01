// store our triggers, singleton
import {PLAYER_CONTROLLED_COMP} from 'gameEngine/components/ComponentNamesConfig';
import Dialog from 'gameEngine/components/Dialog';
import {IDialogTrigger, ITriggerLinesOfText, IPortalTrigger} from '../../interfaces/ITriggers';
import {ISystemArguments} from '../../interfaces/IGameLoop';
import {Entity} from 'game-platform';
import {BaseEntity} from '../BaseEntity';
import {isNonEmptyArray} from './portalSystem';

let triggers: IDialogTrigger[] = [];

function pushTrigger(trigger: IDialogTrigger) {
  triggers.push(trigger);
}

class DialogTrigger implements IDialogTrigger {
  id: string;
  type: any; // TODO this should not be any
  lines: any; // TODO this should not be any
  actedOnEntity: any; // TODO this should not be any
  oneOff: boolean;
  constructor({type, lines, actedOnEntity, oneOff, id = ''}: IDialogTrigger) {
    this.id = id || global.crypto.randomUUID();
    this.type = type;
    this.lines = lines;
    this.actedOnEntity = actedOnEntity;
    this.oneOff = oneOff;
  }
}

const usedUpTriggers: Record<string, boolean> = {};

function triggerSystem(systemArguments: ISystemArguments) {
  // loop over all triggers
  if (isNonEmptyArray(triggers)) {
    triggers.forEach((trigger) => {
      console.log(trigger);
      if (trigger.oneOff && usedUpTriggers[trigger.id]) {
        return; // do nothing
      }

      if (trigger.type === 'dialog') {
        // get lines of the dialog
        let lines = trigger.lines;
        let line = lines[0];
        let nextLine = lines[1];

        if (line) {
          const speaker = line.speaker || trigger.actedOnEntity.name;
          trigger.actedOnEntity.addComponent(new Dialog(line.text, speaker));
        } else {
          throw 'No line provided to a dialog trigger';
        }

        if (nextLine) {
          // end of tick
          let lines = [...trigger.lines];
          lines.shift();
          Promise.resolve().then(() => {
            pushTrigger(
              new DialogTrigger({
                type: 'dialog',
                oneOff: trigger.oneOff,
                lines,
                actedOnEntity: trigger.actedOnEntity
              })
            );
          });
        }
      }

      if (trigger.oneOff && !usedUpTriggers[trigger.id]) {
        // Mark this trigger as used, so it won't be triggered again
        usedUpTriggers[trigger.id] = true;
      }
    });
  }

  // reset triggers when we're done
  if (triggers.length) {
    triggers = [];
  }
}

export default triggerSystem;

export {pushTrigger, DialogTrigger};
