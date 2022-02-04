import moveAction from '../utils/systemUtils/userInput/moveAction';
import performAction from '../utils/systemUtils/userInput/performAction';
import buySkill from '../utils/systemUtils/userInput/buySkill';
import buyAttr from '../utils/systemUtils/userInput/buyAttr';

import {ISystemArguments} from '../../interfaces/IGameLoop';
import {IAction} from '../../interfaces/IGeneral';
import {AllowedActions} from '../gameConstants';

let actionMap = {
  [AllowedActions.MOVE_ACTION]: moveAction,
  [AllowedActions.PERFORM_ACTION]: performAction,
  [AllowedActions.BUY_SKILL]: buySkill,
  [AllowedActions.BUY_ATTR]: buyAttr
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
