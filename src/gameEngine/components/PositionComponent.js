import {POSITION_COMP} from './ComponentNamesConfig';
import {DIRECTIONS} from '../constants';


class PositionComponent {
  constructor({x, y, radius, height, width}) {
    this.name = POSITION_COMP;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.height = height;
    this.width = width;
    this.destY = null;
    this.destX = null;
    this.originX = null;
    this.originY = null;
    this.direction = DIRECTIONS.DOWN;
  }
}

export default PositionComponent;
