import {PERFORM_ACTION, MOVE_ACTION} from 'gameConstants';
import { DIRECTIONS } from 'gameEngine/gameConstants';

function registerUserInputEvents(game) {
  let glob = {};
  
  document.body.addEventListener('keyup', (event) => {
    glob.keyPressed = false;
    // Stop.. on key up, right?
    game.dispatchAction({
      name: MOVE_ACTION
    });
  });
  
  document.body.addEventListener('keydown', (event) => {
    if (glob.keyPressed) {
      return true;
    }
    
    glob.keyPressed = true;
    
    let code = event.which || event.keyCode || event.code;
    let map = {
      37: DIRECTIONS.LEFT,
      38: DIRECTIONS.UP,
      39: DIRECTIONS.RIGHT,
      40: DIRECTIONS.DOWN,
      32: 'space'
    };
    
    if (code === 32) {
      if (!game.isRunning) {
        game.resume(); // if it was paused, this unpauses it..
      } else {
        game.dispatchAction({
          name: PERFORM_ACTION
        });
      }
    } else {
      let direction = map[code];

      if (direction) {
        game.dispatchAction({
          name: MOVE_ACTION,
          direction
        });
      }
    }
  });
}

export default registerUserInputEvents;