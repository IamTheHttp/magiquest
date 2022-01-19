// store our triggers, singleton
import {PLAYER_CONTROLLED_COMP} from 'gameEngine/components/ComponentNamesConfig';
import Dialog from 'gameEngine/components/Dialog';
import {IDialogTrigger, ITriggerLinesOfText, IPortalTrigger} from '../../interfaces/triggers.i';
import {ISystemArguments} from '../../interfaces/gameloop.i';
import {Entity} from 'game-platform';
import {BaseEntity} from '../BaseEntity';
import {isNonEmptyArray} from './portalSystem';

let triggers: IDialogTrigger[] = [];

function pushTrigger(trigger: IDialogTrigger) {
  triggers.push(trigger);
}

interface ITriggerConstructor {
  type: 'dialog' | 'portal';
  lines: ITriggerLinesOfText;
  actedOnEntity: BaseEntity;
}

class Trigger implements IDialogTrigger {
  type: any; // TODO this should not be any
  lines: any; // TODO this should not be any
  actedOnEntity: any; // TODO this should not be any
  oneOff: boolean;
  constructor({type, lines, actedOnEntity = null}: ITriggerConstructor) {
    this.type = type;
    this.lines = lines;
    this.actedOnEntity = actedOnEntity;
  }
}

function triggerSystem(systemArguments: ISystemArguments) {
  let player = Entity.getByComp<BaseEntity>(PLAYER_CONTROLLED_COMP)[0];

  // loop over all actions
  if (isNonEmptyArray(triggers)) {
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
            pushTrigger(
              new Trigger({
                type: 'dialog',
                lines,
                actedOnEntity: trigger.actedOnEntity
              })
            );
          });
        }
      }
    });
  }

  // reset triggers when we're done
  if (triggers.length) {
    triggers = [];
  }
}

export default triggerSystem;

export {pushTrigger, Trigger};
