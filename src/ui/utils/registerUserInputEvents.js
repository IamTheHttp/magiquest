import {ATTACK_ACTION, MOVE_ACTION} from 'gameConstants';

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
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
      32: 'space'
    };
    
    if (code === 32) {
      game.dispatchAction({
        name: ATTACK_ACTION
      });
    }
    
    let direction = map[code];
    
    if (direction) {
      game.dispatchAction({
        name: MOVE_ACTION,
        direction
      });
    }
  });
}

export default registerUserInputEvents;