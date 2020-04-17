import moveAction from '../utils/systemUtils/userInput/moveAction';
import performAction from '../utils/systemUtils/userInput/performAction';
import buySkill from '../utils/systemUtils/userInput/buySkill';
import {ISystemArguments} from "../../interfaces/gameloop.i";
import {AllowedActions, DIRECTIONS_OPTIONS} from "gameConstants";
import {IAction} from "../../interfaces/interfaces";

let actionMap = {
  [AllowedActions.MOVE_ACTION]: moveAction,
  [AllowedActions.PERFORM_ACTION]: performAction,
  [AllowedActions.BUY_SKILL] : buySkill
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

