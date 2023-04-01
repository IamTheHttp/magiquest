import {INVENTORY, UI} from '../../../../components/_ComponentNames';
import Player from '../../../../entities/placeableEntities/Player';
import {ISystemArguments} from '../../../../../interfaces/IGameLoop';
import {getFixedPositionRelativeToViewport} from './getFixedPositionRelativeToViewport';
import {
  HUD_PADDING_LEFT_RIGHT,
  HUD_PADDING_TOP_BOTTOM,
  HUD_ITEM_BORDER_COLOR,
  HUD_ITEM_FILL_COLOR
} from '../../../../gameConstants';

export function renderHUDBackpackItems(systemArguments: ISystemArguments, player: Player) {
  const {mapAPI, SPRITES} = systemArguments;
  // Ensure right spacing between equipment slots
  // 20       []
  // 20+30    [] []
  // 20+30+30 [] [] []
  player[INVENTORY].backpack.forEach((itemInBackpack, i) => {
    const WIDTH = 30;
    const HEIGHT = 30;
    const PADDING_BETWEEN_ITEMS = 10;

    const {viewportAbsX, viewportAbsY} = getFixedPositionRelativeToViewport(systemArguments, {
      width: WIDTH,
      height: HEIGHT,
      x: HUD_PADDING_LEFT_RIGHT + (WIDTH + PADDING_BETWEEN_ITEMS) * i,
      y: HUD_PADDING_TOP_BOTTOM
    });

    // Draw rectangle in which to place the item
    mapAPI.drawRect({
      id: `backpack-slot-${i}`,
      x: viewportAbsX,
      y: viewportAbsY,
      width: WIDTH,
      height: HEIGHT,
      strokeStyle: HUD_ITEM_BORDER_COLOR,
      lineWidth: 2,
      fillColor: HUD_ITEM_FILL_COLOR
    });

    // Draw the item using its UI Component
    itemInBackpack[UI].sections.forEach((section) => {
      const spriteName = section.data.spriteName;
      mapAPI.drawImage({
        id: `backpack-slot-${i}-sprite`,
        // TODO add a check and log errors if spriteName doesn't exist in SPRITES
        // @ts-ignore Skip type checks of these dynamics
        ...SPRITES[spriteName],
        x: viewportAbsX,
        y: viewportAbsY,
        height: WIDTH,
        width: HEIGHT,
        rotation: 0 // in radians
      });
    });
  });
}
