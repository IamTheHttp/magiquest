import GAME_PLATFORM from 'game-platform/dist';
import moveAction from '../utils/systemUtils/userInput/moveAction';
import attackAction from '../utils/systemUtils/userInput/attackAction';

import {
  ATTACK_ACTION,
  MOVE_ACTION
} from 'gameEngine/gameConstants';

let actionMap = {
  [MOVE_ACTION]: moveAction,
  [ATTACK_ACTION]: attackAction
};

// store our actions, singleton
let actions = [];

// on key down, send action to start
function userInputSystem(systemArguments) {
  // loop over all actions
  actions.forEach((action) => {
    actionMap[action.name](systemArguments, action);
  });
  // reset actions when we're done
  if (actions) {
    actions = [];
  }
}

export default userInputSystem;

function pushAction(action) {
  actions.push(action);
}

export {pushAction};

