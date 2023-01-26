import {HAS_HEALTH, HAS_POSITION} from '../../../../components/_ComponentNamesConfig';
import {PossibleUIShapes} from 'gameEngine/gameConstants';
import assertType from 'gameEngine/utils/assertType';
import {ISystemArguments} from '../../../../../interfaces/IGameLoop';
import {BaseEntity} from '../../../../BaseEntity';

function renderRectOnEntity(systemArguments: ISystemArguments, entity: BaseEntity) {
  let {mapAPI} = systemArguments;

  let rectWidth = entity[HAS_POSITION].width;
  let rectHeight = entity[HAS_POSITION].height;
  let posX = entity[HAS_POSITION].x;
  let posY = entity[HAS_POSITION].y;

  mapAPI.drawRect({
    id: `${entity.id}-${PossibleUIShapes.RECT_SHAPE}-`,
    x: posX,
    y: posY,
    width: rectWidth,
    height: rectHeight,
    strokeStyle: 'lime',
    lineWidth: 2
  });
}

export {renderRectOnEntity};
