import {POSITION} from 'gameEngine/components/_ComponentNames';
import {DIRECTIONS} from '../gameConstants';

interface IPositionComponentConstructor {
  x: number;
  y: number;
  radius?: number;
  height?: number;
  width?: number;
  isFixedToViewPort?: boolean; // Is the position relative to the screen or not. This is similar to CSS "Fixed position"
}

class Position {
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
  isFixedToViewPort: boolean; // Is the position relative to the screen or not. This is similar to CSS "Fixed position"
  constructor(posData: IPositionComponentConstructor) {
    const {x, y, radius = -1, height = -1, width = -1, isFixedToViewPort = false} = posData;
    this.name = POSITION;

    this.isFixedToViewPort = !!isFixedToViewPort;
    this.x = x; // when isFixedToViewPort is used, x can be a negative number
    this.y = y;
    this.radius = radius;
    this.height = height;
    this.width = width;
    this.destY = null;
    this.destX = null;
    this.originX = null;
    this.originY = null;
    this.orientation = 'DOWN'; // starts with DOWN by default

    if (!this.isFixedToViewPort && (x < 0 || y < 0)) {
      throw 'Position Component: Negative X or Y values are only allowed when ixFixedToViewPort is true';
    }
  }
}

export default Position;
