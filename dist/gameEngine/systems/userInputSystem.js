var _a;
import moveAction from '../utils/systemUtils/userInput/moveAction';
import performAction from '../utils/systemUtils/userInput/performAction';
import { PERFORM_ACTION, MOVE_ACTION } from 'gameEngine/gameConstants';
var actionMap = (_a = {},
    _a[MOVE_ACTION] = moveAction,
    _a[PERFORM_ACTION] = performAction,
    _a);
// store our actions, singleton
var actions = [];
// on key down, send action to start
function userInputSystem(systemArguments) {
    // loop over all actions
    actions.forEach(function (action) {
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
export { pushAction };
