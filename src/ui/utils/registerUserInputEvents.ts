import {AllowedActions, DIRECTIONS_OPTIONS} from 'gameEngine/gameConstants';
import Game from "../../gameEngine/Game/Game";

class Glob {
  keyPressed: boolean;
}


function registerUserInputEvents(game: Game) {
  let glob = new Glob();

  document.body.addEventListener('keyup', (event) => {
    glob.keyPressed = false;
    // Stop.. on key up, right?
    game.dispatchAction({
      name: AllowedActions.MOVE_ACTION
    });
  });

  document.body.addEventListener('keydown', (event) => {
    if (glob.keyPressed) {
      return true;
    }

    glob.keyPressed = true;

    let code = +(event.which || event.keyCode || event.code);
    // Support arrow keys and WASD
    let map = {
      37: DIRECTIONS_OPTIONS.LEFT,
      38: DIRECTIONS_OPTIONS.UP,
      39: DIRECTIONS_OPTIONS.RIGHT,
      40: DIRECTIONS_OPTIONS.DOWN,
      65: DIRECTIONS_OPTIONS.LEFT,
      87: DIRECTIONS_OPTIONS.UP,
      68: DIRECTIONS_OPTIONS.RIGHT,
      83: DIRECTIONS_OPTIONS.DOWN
    } as {
      [key:number]: DIRECTIONS_OPTIONS
    };

    if (code === 32) {
      if (!game.isRunning) {
        game.resume(); // if it was paused, this unpauses it..
      } else {
        game.dispatchAction({
          name: AllowedActions.PERFORM_ACTION
        });
      }
    } else {
      let direction = map[code];

      if (map.hasOwnProperty(code)) {
        game.dispatchAction({
          name: AllowedActions.MOVE_ACTION,
          direction
        });
      }
    }
  });
}

export default registerUserInputEvents;