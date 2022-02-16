import {ISystemArguments} from '../../interfaces/IGameLoop';
import {IAction} from '../../interfaces/IGeneral';
import {AllowedActions} from '../gameConstants';
import {panMapAction} from '../utils/systemUtils/userInput/panMapAction';

let actionMap = {
  [AllowedActions.MOVE_ACTION]: panMapAction
} as Record<AllowedActions, (sysArgs: ISystemArguments, action: IAction) => void>;

// store our actions, singleton
let actions: IAction[] = [];

function editorInputSystem(systemArguments: ISystemArguments) {
  // loop over all actions
  actions.forEach((action) => {
    if (actionMap[action.name]) {
      actionMap[action.name](systemArguments, action);
    }
  });
  // reset actions when we're done
  if (actions.length) {
    actions = [];
  }
}

export {editorInputSystem};

function pushEditorAction(action: IAction) {
  actions.push(action);
}

export {pushEditorAction};
