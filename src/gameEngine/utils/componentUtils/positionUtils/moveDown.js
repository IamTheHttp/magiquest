import {POSITION_COMP} from 'ComponentNamesConfig';
import {bit} from 'gameEngine/config';
import {DIRECTIONS} from 'gameEngine/constants';

export function moveDown(ent) {
  ent[POSITION_COMP].direction = DIRECTIONS.DOWN;
  ent[POSITION_COMP].destX = ent[POSITION_COMP].x;
  ent[POSITION_COMP].destY = ent[POSITION_COMP].y + bit;
  ent[POSITION_COMP].originY = ent[POSITION_COMP].y;
  ent[POSITION_COMP].originX = ent[POSITION_COMP].x;
}

export default moveDown;