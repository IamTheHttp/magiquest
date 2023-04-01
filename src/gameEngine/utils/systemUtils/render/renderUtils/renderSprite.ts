import {POSITION} from '../../../../components/_ComponentNames';
import {ISystemArguments} from '../../../../../interfaces/IGameLoop';
import {BaseEntity} from '../../../../BaseEntity';
import {IUISection} from '../../../../../interfaces/IGeneral';

export function renderSprite(systemArguments: ISystemArguments, entity: BaseEntity, section: IUISection) {
  const {mapAPI, SPRITES, viewSize} = systemArguments;
  let {x, y, radius, isFixedToViewPort, width, height} = entity[POSITION];

  // Render things fixed to the viewport (Take into account viewport size
  if (isFixedToViewPort) {
    const {panX, panY} = mapAPI.getCurrentPanValue();

    const DISTANCE_FROM_SIDE = x > 0 ? -panX + x : -panX + viewSize.viewWidth - width - -x; // flip X as its negative
    const DISTANCE_FROM_TOP_BOTTOM = y > 0 ? -panY + y : -panY + viewSize.viewHeight - height - -y; // flip Y as its negative

    console.log(DISTANCE_FROM_TOP_BOTTOM, viewSize.viewHeight, height, y);
    mapAPI.drawImage({
      id: `${entity.id}-${section.data.spriteName}`,
      // @ts-ignore Skip type checks of these dynamics types, trust the spriteName coming from section.data
      ...SPRITES[section.data.spriteName],
      x: DISTANCE_FROM_SIDE,
      y: DISTANCE_FROM_TOP_BOTTOM,
      height: height,
      width: width,
      rotation: 0 // in radians
    });
  } else {
    // Render things relative to the Entity
    mapAPI.drawImage({
      id: `${entity.id}`,
      // @ts-ignore Skip type checks of these dynamics types, trust the spriteName coming from section.data
      ...SPRITES[section.data.spriteName],
      x: x - radius,
      y: y - radius,
      height: height,
      width: width,
      rotation: 0 // in radians
    });
  }
}
