import {HAS_HEALTH, HAS_POSITION} from '../../../../components/_ComponentNamesConfig';
import {PossibleUIShapes} from 'gameEngine/gameConstants';
import assertType from 'gameEngine/utils/assertType';
import {ISystemArguments} from '../../../../../interfaces/IGameLoop';
import {BaseEntity} from '../../../../BaseEntity';

function renderHealthBar(systemArguments: ISystemArguments, entity: BaseEntity) {
  assertType(entity[HAS_HEALTH], 'Health Component', 'object');
  let {mapAPI} = systemArguments;

  let healthWidth = entity[HAS_HEALTH].width;
  let healthMargin = entity[HAS_HEALTH].height;
  let healthHeight = 2;
  let healthPercent = entity[HAS_HEALTH].current / entity[HAS_HEALTH].max;

  mapAPI.drawRect({
    id: `${entity.id}-full-${PossibleUIShapes.HEALTH_BAR_SHAPE}-`,
    x: entity[HAS_POSITION].x - healthWidth / 2,
    y: entity[HAS_POSITION].y + healthMargin,
    width: healthWidth,
    height: healthHeight,
    strokeStyle: 'black',
    lineWidth: 2
  });

  mapAPI.drawRect({
    id: `${entity.id}-damage-${PossibleUIShapes.HEALTH_BAR_SHAPE}`,
    x: entity[HAS_POSITION].x - healthWidth / 2,
    y: entity[HAS_POSITION].y + healthMargin,
    width: healthWidth * healthPercent,
    height: healthHeight,
    strokeStyle: 'lime',
    lineWidth: 2
  });
}

export default renderHealthBar;
