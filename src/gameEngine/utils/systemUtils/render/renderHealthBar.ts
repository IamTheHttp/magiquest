import {HEALTH_COMP, POSITION_COMP} from '../../../components/ComponentNamesConfig';
import {HEALTH_BAR_SHAPE} from 'gameEngine/gameConstants';
import assertType from 'gameEngine/utils/assertType';


function renderHealthBar(systemArguments, entity) {
  assertType(entity[HEALTH_COMP], 'Health Component', 'object');
  let {mapAPI} = systemArguments;
  let healthWidth = entity[POSITION_COMP].width || entity[POSITION_COMP].radius * 2 || 200;
  let healthMargin = entity[POSITION_COMP].height || entity[POSITION_COMP].radius * 1 + 2 || 200;
  let healthHeight = 2;
  let healthPercent = entity[HEALTH_COMP].current / entity[HEALTH_COMP].max;
  
  
  mapAPI.addRect(
    {
      id: `${entity.id}-full-${HEALTH_BAR_SHAPE}-`,
      x: entity[POSITION_COMP].x - healthWidth / 2,
      y: entity[POSITION_COMP].y + healthMargin,
      width: healthWidth,
      height: healthHeight,
      strokeStyle: 'black',
      lineWidth: 2
    }
  );
  
  mapAPI.addRect(
    {
      id: `${entity.id}-damage-${HEALTH_BAR_SHAPE}`,
      x: entity[POSITION_COMP].x - healthWidth / 2,
      y: entity[POSITION_COMP].y + healthMargin,
      width: healthWidth * healthPercent,
      height: healthHeight,
      strokeStyle: 'lime',
      lineWidth: 2
    }
  );
}

export default renderHealthBar;