import moveAction from '../utils/systemUtils/userInput/moveAction';
import performAction from '../utils/systemUtils/userInput/performAction';

import {
  PERFORM_ACTION,
  MOVE_ACTION
} from 'gameEngine/gameConstants';

let actionMap = {
  [MOVE_ACTION]: moveAction,
  [PERFORM_ACTION]: performAction
};

// store our actions, singleton
let actions = [];

// on key down, send action to start
function userInputSystem(systemArguments) {
  // loop over all actions
  actions.forEach((action) => {
    console.log(action);
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

function pushAction(action) {
  actions.push(action);
}

export {pushAction};

