import moveAction from '../utils/systemUtils/userInput/moveAction';
import performAction from '../utils/systemUtils/userInput/performAction';

import {ISystemArguments} from '../../interfaces/IGameLoop';
import {IAction} from '../../interfaces/IGeneral';
import {I_ALLOWED_ACTIONS} from '../gameConstants';

const mapUserActionNameToAction = {
  OPEN_INVENTORY: moveAction,
  MOVE_ACTION: moveAction,
  PERFORM_ACTION: performAction
} as Record<I_ALLOWED_ACTIONS, (sysArgs: ISystemArguments, action: IAction) => void>;

// store our actions, singleton
let actions: IAction[] = [];

function userInputSystem(systemArguments: ISystemArguments) {
  // loop over all actions
  actions.forEach((action) => {
    if (mapUserActionNameToAction[action.name]) {
      mapUserActionNameToAction[action.name](systemArguments, action);
    }
  });
  // reset actions when we're done
  if (actions.length) {
    actions = [];
  }
}

export default userInputSystem;

function pushAction(action: IAction) {
  actions.push(action);
}

export {pushAction};
