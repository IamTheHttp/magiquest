import moveAction from '../utils/systemUtils/userInput/moveAction';
import performAction from '../utils/systemUtils/userInput/performAction';
import buySkill from '../utils/systemUtils/userInput/buySkill';
import buyAttr from '../utils/systemUtils/userInput/buyAttr';

import {ISystemArguments} from '../../interfaces/IGameLoop';
import {IAction} from '../../interfaces/IGeneral';
import {AllowedActions} from '../gameConstants';
import {panMapInEditorAction} from '../utils/systemUtils/userInput/panMapInEditorAction';

let mapUserActionNameToAction = {
  [AllowedActions.OPEN_INVENTORY]: moveAction,
  [AllowedActions.MOVE_ACTION]: moveAction,
  [AllowedActions.PERFORM_ACTION]: performAction,
  [AllowedActions.BUY_SKILL]: buySkill,
  [AllowedActions.BUY_ATTR]: buyAttr
} as Record<AllowedActions, (sysArgs: ISystemArguments, action: IAction) => void>;

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
