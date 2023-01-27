import {ACTION_SIGN, POSITION} from '../../../../components/_ComponentNames';
import {ISystemArguments} from '../../../../../interfaces/IGameLoop';
import {BaseEntity} from '../../../../BaseEntity';

export function renderInteractionSign(entity: BaseEntity, systemArguments: ISystemArguments) {
  const {mapAPI} = systemArguments;

  if (entity.hasComponents(ACTION_SIGN)) {
    let {x, y, radius} = entity[POSITION];
    let {symbol} = entity[ACTION_SIGN];
    mapAPI.drawText({
      id: `${entity.id}-assign-quest`,
      text: symbol,
      textBaseline: 'middle',
      fillStyle: 'yellow',
      strokeStyle: 'black',
      font: `${radius * 2}px Arial`,
      x: x + radius / 2,
      y: y - radius
    });
  }
}
