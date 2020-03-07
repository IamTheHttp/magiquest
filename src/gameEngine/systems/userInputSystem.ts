import moveAction from '../utils/systemUtils/userInput/moveAction';
import performAction from '../utils/systemUtils/userInput/performAction';

import {ISystemArguments} from "../../interfaces/gameloop.i";
import {AllowedActions, DIRECTIONS_OPTIONS} from "gameConstants";

export interface IAction {
  name: AllowedActions,
  direction?: DIRECTIONS_OPTIONS | 'space'; // TODO this is NOT okay, maybe the enum is not direciton options...
}

let actionMap = {
  [AllowedActions.MOVE_ACTION]: moveAction,
  [AllowedActions.PERFORM_ACTION]: performAction
};

// store our actions, singleton
let actions: IAction[] = [];

function userInputSystem(systemArguments: ISystemArguments) {
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

export default userInputSystem;

function pushAction(action: IAction) {
  actions.push(action);
}

export {pushAction};

