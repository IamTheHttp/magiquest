import {INVENTORY, UI} from '../../../../components/_ComponentNames';
import Player from '../../../../entities/placeableEntities/Player';
import {ISystemArguments} from '../../../../../interfaces/IGameLoop';
import {UI_HUD_BORDER_COLOR, UI_HUD_FILL_COLOR} from '../renderValues';

export function renderHUDBackpackItems(systemArguments: ISystemArguments, player: Player) {
  const {mapAPI, SPRITES} = systemArguments;

  const {panX, panY} = mapAPI.getCurrentPanValue();

  // Ensure right spacing between equipment slots
  // 20       []
  // 20+30    [] []
  // 20+30+30 [] [] []
  player[INVENTORY].backpack.forEach((itemInBackpack, i) => {
    // Draw rectangle in which to place the item
    mapAPI.drawRect({
      id: `backpack-slot-${i}`,
      x: 20 + 50 * i - panX,
      y: 20 - panY,
      width: 30,
      height: 30,
      strokeStyle: UI_HUD_BORDER_COLOR,
      lineWidth: 2,
      fillColor: UI_HUD_FILL_COLOR
    });

    // Draw the item using its UI Component
    itemInBackpack[UI].sections.forEach((section) => {
      const spriteName = section.data.spriteName;
      mapAPI.drawImage({
        id: `backpack-slot-${i}-sprite`,
        // TODO add a check and log errors if spriteName doesn't exist in SPRITES
        // @ts-ignore Skip type checks of these dynamics
        ...SPRITES[spriteName],
        x: 20 + 50 * i - panX,
        y: 20 - panY,
        height: 30,
        width: 30,
        rotation: 0 // in radians
      });
    });
  });
}
