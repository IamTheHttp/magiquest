import {POSITION} from '../../../../components/_ComponentNames';
import {PossibleUIShapes} from 'gameEngine/gameConstants';
import {ISystemArguments} from '../../../../../interfaces/IGameLoop';
import {BaseEntity} from '../../../../BaseEntity';
import {getFixedPositionRelativeToViewport} from './getFixedPositionRelativeToViewport';
import {IUISection} from '../../../../../interfaces/IGeneral';

function renderRectOnEntity(systemArguments: ISystemArguments, entity: BaseEntity, section: IUISection) {
  let {mapAPI} = systemArguments;
  let {x, y, radius, isFixedToViewPort, width, height} = entity[POSITION];

  if (isFixedToViewPort) {
    // TODO - Ensure we draw rects on relative entities
    const {viewportAbsY, viewportAbsX} = getFixedPositionRelativeToViewport(systemArguments, {
      x,
      y,
      width,
      height
    });

    mapAPI.drawRect({
      id: `${entity.id}-${PossibleUIShapes.RECT_SHAPE}-`,
      x: viewportAbsX,
      y: viewportAbsY,
      width,
      height,
      fillColor: section.data.backgroundColor,
      strokeStyle: section.data.borderColor,
      lineWidth: section.data.borderWidth
    });
  } else {
    mapAPI.drawRect({
      id: `${entity.id}-${PossibleUIShapes.RECT_SHAPE}-`,
      x,
      y,
      width,
      height,
      strokeStyle: section.data.borderColor,
      lineWidth: section.data.borderWidth
    });
  }
}

export {renderRectOnEntity};
