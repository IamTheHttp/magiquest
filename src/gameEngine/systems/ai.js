import GAME_PLATFORM from 'game-platform/dist';
import {MOVEMENT_COMP, AI_CONTROLLED_COMP, POSITION_COMP, IS_MOVING_COMP} from '../components/ComponentNamesConfig';
import IsMoving from '../components/IsMoving';
import oneOf from '../utils/oneOf';
let {Entity, entityLoop} = GAME_PLATFORM;

// this system simply sets the destination, the move system actually does the moving

// TODO - Fix this system :)
function aiSystem() {
  let entities = Entity.getByComps([AI_CONTROLLED_COMP, MOVEMENT_COMP, POSITION_COMP]);
  
  if (entities.length) {
    entityLoop(entities, (ent) => {
      // TODO create a util called 'isMoving'
      if (ent[IS_MOVING_COMP]) {
        return;
      }
  
      // randomally move up, down, left or right
      let direction = oneOf(['up', 'down', 'left', 'right']);
      
      // let moveTo = {
      //   up:  moveUp,
      //   down: moveDown,
      //   left: moveLeft,
      //   right: moveRight
      // };
      //
      // if (moveTo[direction]) {
      //   moveTo[direction](ent);
      //   ent.addComponent(new IsMoving());
      // }
    });
  }
}

export default aiSystem;