import {POSITION, UI} from '../../../../components/_ComponentNames';
import {ISystemArguments} from '../../../../../interfaces/IGameLoop';
import {BaseEntity} from '../../../../BaseEntity';
import {IUISection} from '../../../../../interfaces/IGeneral';

function renderCircle(systemArguments: ISystemArguments, entity: BaseEntity, section: IUISection) {
  let {mapAPI} = systemArguments;
  let {x: curX, y: curY, radius} = entity[POSITION];

  const {data} = section;
  mapAPI.drawCircle({
    id: `${entity.id}`,
    x: curX,
    y: curY,
    radius,
    fillColor: data.fillColor || 'red',
    lineWidth: 1
  });
}

export default renderCircle;
