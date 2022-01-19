import {POSITION_COMP} from '../../../components/ComponentNamesConfig';
import {ISystemArguments} from '../../../../interfaces/gameloop.i';
import {BaseEntity} from '../../../BaseEntity';

function renderCircle(systemArguments: ISystemArguments, entity: BaseEntity) {
  let {mapAPI} = systemArguments;
  let {x: curX, y: curY, radius} = entity[POSITION_COMP];

  mapAPI.drawCircle({
    id: `${entity.id}`,
    x: curX,
    y: curY,
    radius,
    fillColor: 'red',
    lineWidth: 1
  });
}

export default renderCircle;
