import GAME_PLATFORM from 'game-platform/dist';
import {MOVEMENT_COMP, AI_CONTROLLED_COMP, POSITION_COMP, MOVING_COMP} from '../components/ComponentNamesConfig';
import moveDown from '../components/utils/positionUtils/moveDown';
import moveUp from '../components/utils/positionUtils/moveUp';
import moveLeft from '../components/utils/positionUtils/moveLeft';
import moveRight from '../components/utils/positionUtils/moveRight';
import Moving from '../components/Moving';
import oneOf from '../utils/oneOf';
let {Entity, entityLoop} = GAME_PLATFORM;


// this system simply sets the destination, the move system actually does the moving

function aiSystem() {
  let entities = Entity.getByComps([AI_CONTROLLED_COMP, MOVEMENT_COMP, POSITION_COMP]);
  
  if (entities.length) {
    entityLoop(entities, (ent) => {
      // TODO create a util called 'isMoving'
      if (ent[MOVING_COMP]) {
        return;
      }
  
      // randomally move up, down, left or right
      let direction = oneOf(['up', 'down', 'left', 'right']);
      
      let moveTo = {
        up:  moveUp,
        down: moveDown,
        left: moveLeft,
        right: moveRight
      };
  
      if (moveTo[direction]) {
        moveTo[direction](ent);
        ent.addComponent(new Moving());
      }
    });
  }
}

export default aiSystem;