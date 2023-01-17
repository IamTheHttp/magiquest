import {HEALTH_COMP, POSITION_COMP} from '../../../../components/ComponentNamesConfig';
import {PossibleUIShapes} from 'gameEngine/gameConstants';
import assertType from 'gameEngine/utils/assertType';
import {ISystemArguments} from '../../../../../interfaces/IGameLoop';
import {BaseEntity} from '../../../../BaseEntity';

function renderRectOnEntity(systemArguments: ISystemArguments, entity: BaseEntity) {
  let {mapAPI} = systemArguments;

  let rectWidth = entity[POSITION_COMP].width;
  let rectHeight = entity[POSITION_COMP].height;
  let posX = entity[POSITION_COMP].x;
  let posY = entity[POSITION_COMP].y;

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
