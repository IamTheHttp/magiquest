import {AllowedActions, DIRECTIONS} from 'gameEngine/gameConstants';
import Game from '../gameEngine/Game';

class Glob {
  keyPressed: boolean;
  mouseDown: boolean;
  startDragCursorX: number;
  startDragCursorY: number;
}

const KEY_TO_CODE_MAP = {
  SPACE_BAR: 32,
  W: 87,
  A: 65,
  S: 83,
  D: 68,
  ARROW_UP: 38,
  ARROW_LEFT: 37,
  ARROW_DOWN: 40,
  ARROW_RIGHT: 39
};

function registerUserInputEvents(game: Game) {
  let glob = new Glob();

  document.body.addEventListener('keyup', (event) => {
    // We only listen listen to keydowns on the body
    if (event.target !== document.body) {
      return;
    }
    glob.keyPressed = false;
    // Stop.. on key up, right?
    game.dispatchAction({
      name: AllowedActions.MOVE_ACTION
    });
  });

  /**
   * Enable panning in editor mode by tracking mouse movement
   */
  document.body.addEventListener('mousedown', (event) => {
    glob.mouseDown = true;
    glob.startDragCursorX = event.offsetX;
    glob.startDragCursorY = event.offsetY;
  });

  /**
   * Enable panning in editor mode by tracking mouse movement
   */
  document.body.addEventListener('mousemove', (event) => {
    if (glob.mouseDown) {
      game.dispatchAction({
        name: AllowedActions.DRAG_PAN_MAP,
        data: {
          startDragCursorX: glob.startDragCursorX,
          startDragCursorY: glob.startDragCursorY,
          currentCursorX: event.offsetX,
          currentCursorY: event.offsetY
        }
      });

      glob.startDragCursorX = event.offsetX;
      glob.startDragCursorY = event.offsetY;
    }
  });

  /**
   * Enable panning in editor mode by tracking mouse movement
   */
  document.body.addEventListener('mouseup', (event) => {
    glob.mouseDown = false;
  });

  document.body.addEventListener('keydown', (event) => {
    // We only listen listen to keydowns on the body
    if (event.target !== document.body) {
      return;
    }
    if (glob.keyPressed) {
      // This prevents multiple keys from being pressed at the same time
      return true;
    }

    glob.keyPressed = true;

    let code = +(event.which || event.keyCode || event.code);
    // Support arrow keys and WASD

    let map = {
      [KEY_TO_CODE_MAP.W]: DIRECTIONS.UP,
      [KEY_TO_CODE_MAP.A]: DIRECTIONS.LEFT,
      [KEY_TO_CODE_MAP.S]: DIRECTIONS.DOWN,
      [KEY_TO_CODE_MAP.D]: DIRECTIONS.RIGHT,
      [KEY_TO_CODE_MAP.ARROW_UP]: DIRECTIONS.UP,
      [KEY_TO_CODE_MAP.ARROW_LEFT]: DIRECTIONS.LEFT,
      [KEY_TO_CODE_MAP.ARROW_DOWN]: DIRECTIONS.DOWN,
      [KEY_TO_CODE_MAP.ARROW_RIGHT]: DIRECTIONS.RIGHT
    } as {
      [key: number]: keyof typeof DIRECTIONS;
    };

    if (code === KEY_TO_CODE_MAP.SPACE_BAR) {
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
