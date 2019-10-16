import {IS_MOVING_COMP, PLAYER_CONTROLLED_COMP} from '../../../components/ComponentNamesConfig';
import {DIRECTIONS} from '../../../gameConstants';

function moveAction(systemArguments, action) {
  let {Entity} = systemArguments;
  let {direction} = action;
  let ent = Entity.getByComps(PLAYER_CONTROLLED_COMP)[0];
  
  let moveTo = {
    up: DIRECTIONS.UP,
    down: DIRECTIONS.DOWN,
    left: DIRECTIONS.LEFT,
    right: DIRECTIONS.RIGHT
  };
  
  if (moveTo[direction]) {
    ent.setMoveDirection(moveTo[direction]);
  } else {
    ent.removeDirection();
  }
}


export default moveAction;