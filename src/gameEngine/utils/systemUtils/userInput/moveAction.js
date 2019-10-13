import {MOVING_COMP, PLAYER_CONTROLLED_COMP} from '../../../components/ComponentNamesConfig';
import moveUp from '../../componentUtils/positionUtils/moveUp';
import moveDown from '../../componentUtils/positionUtils/moveDown';
import moveLeft from '../../componentUtils/positionUtils/moveLeft';
import moveRight from '../../componentUtils/positionUtils/moveRight';
import Moving from '../../../components/Moving';

function moveAction(systemArguments, action) {
  let {Entity} = systemArguments;
  let {direction} = action;
  let ent = Entity.getByComps(PLAYER_CONTROLLED_COMP)[0];
  
  // can't move while already moving
  // TODO create a util called 'isMoving'
  if (ent[MOVING_COMP]) {
    return;
  }
  
  let moveTo = {
    up: moveUp,
    down: moveDown,
    left: moveLeft,
    right: moveRight
  };
  
  if (moveTo[direction]) {
    moveTo[direction](ent);
    ent.addComponent(new Moving());
  }
}


export default moveAction;