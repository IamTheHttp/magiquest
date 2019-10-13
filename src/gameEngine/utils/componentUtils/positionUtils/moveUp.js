import {POSITION_COMP} from 'ComponentNamesConfig';
import {bit} from 'gameEngine/config';
import {DIRECTIONS} from 'gameEngine/constants';

export function moveUp(ent) {
  ent[POSITION_COMP].direction = DIRECTIONS.UP;
  ent[POSITION_COMP].destX = ent[POSITION_COMP].x;
  ent[POSITION_COMP].destY = ent[POSITION_COMP].y - bit;
  ent[POSITION_COMP].originY = ent[POSITION_COMP].y;
  ent[POSITION_COMP].originX = ent[POSITION_COMP].x;
}

export default moveUp;