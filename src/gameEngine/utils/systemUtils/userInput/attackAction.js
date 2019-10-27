import {IS_MOVING_COMP, PLAYER_CONTROLLED_COMP, POSITION_COMP} from '../../../components/ComponentNamesConfig';
import {getTileIdxByEnt} from '../../componentUtils/tileUtils/getTileIdx';
import {DIRECTIONS} from '../../../gameConstants';
import IsAttackingComp from '../../../components/IsAttacking';

function attackAction(systemArguments, action) {
  let {tileIdxMap, Entity} = systemArguments;
  let entity = Entity.getByComps(PLAYER_CONTROLLED_COMP)[0];
  let curOrientation = entity[POSITION_COMP].orientation;
  
  // tile to attack?
  
  let tileIdx = getTileIdxByEnt(entity);
  
  let row = +tileIdx.split('-')[0];
  let col = +tileIdx.split('-')[1];
  
  
  if (curOrientation === DIRECTIONS.LEFT) {
    col -= 1;
  }
  
  if (curOrientation === DIRECTIONS.RIGHT) {
    col += 1;
  }
  
  if (curOrientation === DIRECTIONS.UP) {
    row -= 1;
  }
  
  if (curOrientation === DIRECTIONS.DOWN) {
    row += 1;
  }
  
  
  let targetIdx = `${row}-${col}`;
  let targetTile = tileIdxMap[targetIdx];
  
  // we could target out of bounds
  if (targetTile && !entity.isAttacking()) {
    entity.addComponent(new IsAttackingComp(targetTile));
  }
}


export default attackAction;