import GAME_PLATFORM from 'game-platform/dist';
import {MOVEMENT_COMP, AI_CONTROLLED_COMP, POSITION_COMP, IS_MOVING_COMP} from '../components/ComponentNamesConfig';
import IsMoving from '../components/IsMoving';
import oneOf from '../utils/oneOf';
import {DIRECTIONS} from '../gameConstants';
let {Entity, entityLoop} = GAME_PLATFORM;

function aiSystem() {
  let entities = Entity.getByComps([AI_CONTROLLED_COMP, MOVEMENT_COMP, POSITION_COMP]);
  
  if (entities.length) {
    entityLoop(entities, (ent) => {
      if (ent.isMoving()) {
        return;
      }
  
      let dir = oneOf(Object.keys(DIRECTIONS));

      ent.setDestTo(dir);
      ent.addComponent(new IsMoving());
    });
  }
}

export default aiSystem;