import {ISystemArguments} from '../../interfaces/IGameLoop';
import {IAction} from '../../interfaces/IGeneral';
import {I_ALLOWED_ACTIONS} from '../gameConstants';
import {panMapInEditorAction} from '../utils/systemUtils/userInput/panMapInEditorAction';

const actionMap = {
  MOVE_ACTION: panMapInEditorAction,
  DRAG_PAN_MAP: panMapInEditorAction
} as Record<I_ALLOWED_ACTIONS, (sysArgs: ISystemArguments, action: IAction) => void>;

// store our actions, singleton
let actions: IAction[] = [];

let cameraMapIntervalID = 0;

/**
 * Actions done in the Editor related to interacting with the game (Such as panning the camera)
 * This file DOES NOT contain events related to performing changes on the server (such as changing tiles)
 * @param systemArguments
 */
function editorInputSystem(systemArguments: ISystemArguments) {
  // loop over all actions
  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    // MOVE Action
    if (action.name === 'MOVE_ACTION') {
      // Stop the interval
      clearInterval(cameraMapIntervalID);
      if (action.direction) {
        // Perform the operation first
        actionMap[action.name](systemArguments, action);

        // Re-perform it every 100 ms
        // This supports the "Long press down key"
        cameraMapIntervalID = window.setInterval(() => {
          actionMap[action.name](systemArguments, action);
        }, 40);
      } else {
        // If no direction, we do nothing
        // We already stopped the interval above, so no need to stop it again.
      }
    }

    // MOVE MOUSE DRAG PAN ACTION
    if (action.name === 'DRAG_PAN_MAP') {
      actionMap.DRAG_PAN_MAP(systemArguments, action);
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
