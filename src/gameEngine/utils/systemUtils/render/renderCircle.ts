import {POSITION_COMP} from '../../../components/ComponentNamesConfig';

function renderCircle(systemArguments, entity) {
  let {mapAPI} = systemArguments;
  let {x: curX, y: curY, radius} = entity[POSITION_COMP];
  
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
}

export default renderCircle;