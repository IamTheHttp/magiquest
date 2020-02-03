import { PERFORM_ACTION, MOVE_ACTION } from 'gameEngine/gameConstants';
import { DIRECTIONS } from 'gameEngine/gameConstants';
var Glob = /** @class */ (function () {
    function Glob() {
    }
    return Glob;
}());
function registerUserInputEvents(game) {
    var glob = new Glob();
    document.body.addEventListener('keyup', function (event) {
        glob.keyPressed = false;
        // Stop.. on key up, right?
        game.dispatchAction({
            name: MOVE_ACTION
        });
    });
    document.body.addEventListener('keydown', function (event) {
        if (glob.keyPressed) {
            return true;
        }
        glob.keyPressed = true;
        var code = event.which || event.keyCode || event.code;
        var map = {
            37: DIRECTIONS.LEFT,
            38: DIRECTIONS.UP,
            39: DIRECTIONS.RIGHT,
            40: DIRECTIONS.DOWN,
            32: 'space'
        };
        if (code === 32) {
            if (!game.isRunning) {
                game.resume(); // if it was paused, this unpauses it..
            }
            else {
                game.dispatchAction({
                    name: PERFORM_ACTION
                });
            }
        }
        else {
            var direction = map[code];
            if (direction) {
                game.dispatchAction({
                    name: MOVE_ACTION,
                    direction: direction
                });
            }
        }
    });
}
export default registerUserInputEvents;
