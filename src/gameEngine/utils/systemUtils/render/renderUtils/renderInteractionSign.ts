import {HAS_ACTION_SIGN_COMP, HAS_POSITION} from '../../../../components/_ComponentNamesConfig';
import {ISystemArguments} from '../../../../../interfaces/IGameLoop';
import {BaseEntity} from '../../../../BaseEntity';

export function renderInteractionSign(entity: BaseEntity, systemArguments: ISystemArguments) {
  const {mapAPI} = systemArguments;

  if (entity.hasComponents(HAS_ACTION_SIGN_COMP)) {
    let {x, y, radius} = entity[HAS_POSITION];
    let {symbol} = entity[HAS_ACTION_SIGN_COMP];
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
