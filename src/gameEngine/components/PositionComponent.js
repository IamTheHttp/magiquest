import {POSITION} from 'gameEngine/constants';

class PositionComponent {
  constructor({x, y, radius, height, width}) {
    this.name = POSITION;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.height = height;
    this.width = width;
    this.destY = null;
    this.destX = null;
  }
}

export default PositionComponent;
