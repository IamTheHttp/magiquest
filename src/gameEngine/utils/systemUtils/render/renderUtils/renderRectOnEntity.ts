import {HEALTH, POSITION} from '../../../../components/_ComponentNames';
import {PossibleUIShapes} from 'gameEngine/gameConstants';
import assertType from 'gameEngine/utils/assertType';
import {ISystemArguments} from '../../../../../interfaces/IGameLoop';
import {BaseEntity} from '../../../../BaseEntity';

function renderRectOnEntity(systemArguments: ISystemArguments, entity: BaseEntity) {
  let {mapAPI} = systemArguments;
  let rectWidth = entity[POSITION].width;
  let rectHeight = entity[POSITION].height;
  let posX = entity[POSITION].x;
  let posY = entity[POSITION].y;
  let isFixedToViewPort = entity[POSITION].isFixedToViewPort;

  if (isFixedToViewPort) {
    // TODO - Ensure we draw rects on relative entities
  } else {
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
}

export {renderRectOnEntity};
