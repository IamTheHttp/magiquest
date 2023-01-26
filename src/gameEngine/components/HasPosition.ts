import {HAS_POSITION} from 'gameEngine/components/_ComponentNamesConfig';
import {DIRECTIONS} from '../gameConstants';

interface IPositionComponentConstructor {
  x: number;
  y: number;
  radius?: number;
  height?: number;
  width?: number;
}

class HasPosition {
  name: string;
  x: number;
  y: number;
  radius: number;
  height: number;
  width: number;
  destY: number;
  destX: number;
  originX: number;
  originY: number;
  orientation: keyof typeof DIRECTIONS;

  constructor({x, y, radius = -1, height = -1, width = -1}: IPositionComponentConstructor) {
    this.name = HAS_POSITION;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.height = height;
    this.width = width;
    this.destY = null;
    this.destX = null;
    this.originX = null;
    this.originY = null;
    this.orientation = 'DOWN'; // starts with DOWN by default
  }
}

export default HasPosition;
