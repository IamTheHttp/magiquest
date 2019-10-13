import {DIRECTIONS} from '../../../constants';
import {ATTACK_COMP, POSITION_COMP} from '../../../components/ComponentNamesConfig';
import onDirection from '../../componentUtils/positionUtils/onDirection';

function renderCircle(systemArguments, entity) {
  let {mapAPI} = systemArguments;
  let {x: curX, y: curY, radius, direction: curDirection} = entity[POSITION_COMP];
  
  mapAPI.addCircle(
    {
      id: `${entity.id}`,
      x: curX,
      y: curY,
      radius,
      fillColor: 'red',
      strokeStyle: 'red',
      lineWidth: 1
    }
  );
  
  // We set the direction of the circle
  let dirXOffset = 0;
  let dirYOffset = 0;
  
  if (curDirection === DIRECTIONS.LEFT) {
    dirXOffset = -radius;
  }
  
  if (curDirection === DIRECTIONS.RIGHT) {
    dirXOffset = entity[POSITION_COMP].radius;
  }
  
  if (curDirection === DIRECTIONS.UP) {
    dirYOffset = -entity[POSITION_COMP].radius;
  }
  
  if (curDirection === DIRECTIONS.DOWN) {
    dirYOffset = entity[POSITION_COMP].radius;
  }
  
  mapAPI.addCircle(
    {
      id: `${entity.id}-direction`,
      x: curX + dirXOffset,
      y: curY + dirYOffset,
      radius: 2,
      fillColor: 'white',
      strokeStyle: 'white',
      lineWidth: 1
    }
  );
}

export default renderCircle;