import {POSITION} from '../../../../components/_ComponentNames';
import {ISystemArguments} from '../../../../../interfaces/IGameLoop';
import {BaseEntity} from '../../../../BaseEntity';
import {IUISection} from '../../../../../interfaces/IGeneral';
import {TILE_SIZE} from '../../../../gameConstants';

export function renderSprite(systemArguments: ISystemArguments, entity: BaseEntity, section: IUISection) {
  const {mapAPI, SPRITES, viewSize} = systemArguments;
  let {x, y, radius, isFixedToViewPort, width, height} = entity[POSITION];

  // Render things fixed to the viewport (Take into account viewport size
  if (isFixedToViewPort) {
    const {panX, panY} = mapAPI.getCurrentPanValue();
    mapAPI.drawImage({
      id: `${entity.id}-${section.data.spriteName}`,
      // @ts-ignore Skip type checks of these dynamics types, trust the spriteName coming from section.data
      ...SPRITES[section.data.spriteName],
      x: viewSize.viewWidth - TILE_SIZE - x - panX,
      y: y - panY,
      height: TILE_SIZE,
      width: TILE_SIZE,
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
      height: TILE_SIZE,
      width: TILE_SIZE,
      rotation: 0 // in radians
    });
  }
}
