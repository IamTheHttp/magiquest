import {POSITION_COMP} from '../../ComponentNamesConfig';
import {DIRECTIONS} from '../../../constants';


/**
 *
 * @param {Entity} entity
 * @param {function} up
 * @param {function} right
 * @param {function} down
 * @param {function} left
 */
function onDirection(entity, up, right, down, left) {
  let curDirection = entity[POSITION_COMP].direction;
  
  if (curDirection === DIRECTIONS.UP) {
    up();
  }
  
  if (curDirection === DIRECTIONS.RIGHT) {
    right();
  }
  
  if (curDirection === DIRECTIONS.DOWN) {
    down();
  }
  
  if (curDirection === DIRECTIONS.LEFT) {
    left();
  }
};


export default onDirection;