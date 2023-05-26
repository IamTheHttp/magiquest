import {HEALTH, POSITION} from '../../../../components/_ComponentNames';
import assertType from 'gameEngine/utils/assertType';
import {ISystemArguments} from '../../../../../interfaces/IGameLoop';
import {BaseEntity} from '../../../../BaseEntity';

/**
 * Renders the health bar of the various entities
 * @param systemArguments
 * @param entity
 */
function renderHealthBar(systemArguments: ISystemArguments, entity: BaseEntity) {
  assertType(entity[HEALTH], 'Health Component', 'object');
  const {mapAPI} = systemArguments;

  const healthWidth = entity[HEALTH].width;
  const healthMargin = entity[HEALTH].height;
  const healthHeight = 2;
  const healthPercent = entity[HEALTH].current / entity[HEALTH].max;

  mapAPI.drawRect({
    id: `${entity.id}-full-${'HEALTH_BAR_SHAPE'}-`,
    x: entity[POSITION].x - healthWidth / 2,
    y: entity[POSITION].y + healthMargin,
    width: healthWidth,
    height: healthHeight,
    strokeStyle: 'black',
    lineWidth: 2
  });

  mapAPI.drawRect({
    id: `${entity.id}-damage-${'HEALTH_BAR_SHAPE'}`,
    x: entity[POSITION].x - healthWidth / 2,
    y: entity[POSITION].y + healthMargin,
    width: healthWidth * healthPercent,
    height: healthHeight,
    strokeStyle: 'lime',
    lineWidth: 2
  });
}

export default renderHealthBar;
