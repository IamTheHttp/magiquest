// import entityLoop from 'lib/ECS/util/entityLoop';
// import Entity from 'lib/ECS/Entity';

import GAME_PLATFORM from 'game-platform/dist';
let {Entity} = GAME_PLATFORM;


import {
  ATTACK_ACTION, DIRECTIONS,
  MOVE_ACTION
} from 'gameEngine/constants';







import Moving from '../components/Moving';
import moveUp from '../components/utils/positionUtils/moveUp';
import moveDown from '../components/utils/positionUtils/moveDown';
import moveLeft from '../components/utils/positionUtils/moveLeft';
import moveRight from '../components/utils/positionUtils/moveRight';
import getPos from '../components/utils/positionUtils/getPos';
import {
  ATTACK_COMP,
  IS_ATTACKING_COMP,
  MOVING_COMP,
  PLAYER_CONTROLLED_COMP,
  POSITION_COMP
} from '../components/ComponentNamesConfig';
import calcNewPosToMove from './utils/calcNewPosToMove';
import {getTileIdxByEnt} from '../components/utils/tileUtils/getTileIdx';
import IsAttackingComp from '../components/IsAttacking';


// import select from 'gameEngine/systems/userInputActions/select';
// import {getOwner} from 'gameEngine/components/OwnerComponent';
// store our actions, singleton
let actions = [];

// import {
//   selectAllEntities
// } from 'gameEngine/systems/utils/userInput.util';

function userInputSystem(systemArguments) {
  // loop over all actions
  actions.forEach((action) => {
    if (action.name === MOVE_ACTION) {
      let {direction} = action;
      let ent = Entity.getByComps(PLAYER_CONTROLLED_COMP)[0];
      
      // can't move while already moving
      // TODO create a util called 'isMoving'
      if (ent[MOVING_COMP]) {
        return;
      }
  
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
    }
  
    if (action.name === ATTACK_ACTION) {
      let {tileIdxMap} = systemArguments;
      let ent = Entity.getByComps(PLAYER_CONTROLLED_COMP)[0];
      
      let curDirection = ent[POSITION_COMP].direction;
      
      
      // tile to attack?
  
      let tileIdx = getTileIdxByEnt(ent);
      
      let row = +tileIdx.split('-')[0];
      let col = +tileIdx.split('-')[1];
  
  
      if (curDirection === DIRECTIONS.LEFT) {
        col -= 1;
      }
  
      if (curDirection === DIRECTIONS.RIGHT) {
        col += 1;
      }
  
      if (curDirection === DIRECTIONS.UP) {
        row -= 1;
      }
  
      if (curDirection === DIRECTIONS.DOWN) {
        row += 1;
      }
      
      
      let targetIdx = `${row}-${col}`;
      let targetTile = tileIdxMap[targetIdx];
      
      // we could target out of bounds
      if (targetTile) {
        ent.addComponent(new IsAttackingComp(targetTile));
      }

      
      
      //
      // // can't move while already moving
      // // TODO create a util called 'isMoving'
      // if (ent[MOVING_COMP]) {
      //   return;
      // }
      //
      // let moveTo = {
      //   up:  moveUp,
      //   down: moveDown,
      //   left: moveLeft,
      //   right: moveRight
      // };
      //
      // if (moveTo[direction]) {
      //   moveTo[direction](ent);
      //   ent.addComponent(new Moving());
      // }
    }
    
    
    // for each entity in the action, do the required logic
    // if (action.entities) {
    //   entityLoop(action.entities, (ent) => {
    //     // do stuff here on multiple entities, not really used..
    //   });
    // } else {
    //   if (action.name === CLICK) {
    //     let clickedEntities = action.hits.map((id) => {
    //       return Entity.entities[id];
    //     });
    //
    //     if (clickedEntities.length === 0) {
    //       select(action);
    //     }
    //
    //     // get all friendly entities clicked (for player 1)
    //     let friendlies = clickedEntities.filter((ent) => {
    //       return getOwner(ent) === PLAYER_1;
    //     });
    //
    //     // if we clicked on friendlies, then what?
    //     if (friendlies.length > 0) {
    //       // if double click, select all
    //       action.dbClick && selectAllEntities(PLAYER_1);
    //       // if not, just select
    //       !action.dbClick && select(action);
    //     }
    //
    //     // if i clicked on an enemy or neutral, attack..
    //     let enemies = clickedEntities.filter((ent) => {
    //       return getOwner(ent) !== PLAYER_1;
    //     });
    //
    //     if (enemies.length) {
    //       attack(action);
    //     }
    //   }
    // }
  });
  // reset actions when we're done
  if (actions) {
    actions = [];
  }
}

export default userInputSystem;

function pushAction(action) {
  actions.push(action);
}
export {pushAction};

