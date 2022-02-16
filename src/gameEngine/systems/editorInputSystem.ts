import {ISystemArguments} from '../../interfaces/IGameLoop';
import {IAction} from '../../interfaces/IGeneral';
import {AllowedActions} from '../gameConstants';
import {panMapInEditorAction} from '../utils/systemUtils/userInput/panMapInEditorAction';

let actionMap = {
  [AllowedActions.MOVE_ACTION]: panMapInEditorAction,
  [AllowedActions.DRAG_PAN_MAP]: panMapInEditorAction
} as Record<AllowedActions, (sysArgs: ISystemArguments, action: IAction) => void>;

// store our actions, singleton
let actions: IAction[] = [];

let cameraMapIntervalID = 0;

function editorInputSystem(systemArguments: ISystemArguments) {
  // loop over all actions

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    if (action.name === AllowedActions.MOVE_ACTION) {
      // Stop the interval
      clearInterval(cameraMapIntervalID);
      if (action.direction) {
        // Perform the operation first
        actionMap[action.name](systemArguments, action);

        // Re-perform it every 100 ms
        cameraMapIntervalID = window.setInterval(() => {
          actionMap[action.name](systemArguments, action);
        }, 40);
      } else {
        // If no direction, we do nothing
        // We already stopped the interval above, so no need to stop it again.
      }
    }

    if (action.name === AllowedActions.DRAG_PAN_MAP) {
      actionMap[AllowedActions.DRAG_PAN_MAP](systemArguments, action);
    }
  }
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
