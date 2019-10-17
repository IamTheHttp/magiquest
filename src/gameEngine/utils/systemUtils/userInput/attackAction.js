import {IS_MOVING_COMP, PLAYER_CONTROLLED_COMP, POSITION_COMP} from '../../../components/ComponentNamesConfig';
import {getTileIdxByEnt} from '../../componentUtils/tileUtils/getTileIdx';
import {DIRECTIONS} from '../../../gameConstants';
import IsAttackingComp from '../../../components/IsAttacking';

function attackAction(systemArguments, action) {
  let {getCurrentMap, Entity} = systemArguments;
  let tileIdxMap = getCurrentMap();
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
}


export default attackAction;