import {HAS_INVENTORY, HAS_UI} from '../../../../components/_ComponentNamesConfig';
import Player from '../../../../entities/placeableEntities/Player';
import {ISystemArguments} from '../../../../../interfaces/IGameLoop';

export function renderBackpackItems(player: Player, systemArguments: ISystemArguments) {
  const {mapAPI, SPRITES} = systemArguments;

  // Ensure right spacing between equipment slots
  // 20       []
  // 20+30    [] []
  // 20+30+30 [] [] []
  player[HAS_INVENTORY].backpack.forEach((itemInBackpack, i) => {
    const {panX, panY} = mapAPI.getCurrentPanValue();
    // Draw rectangle in which to place the item
    mapAPI.drawRect({
      id: `backpack-slot-${i}`,
      x: 20 + 50 * i - panX,
      y: 20 - panY,
      width: 30,
      height: 30,
      strokeStyle: 'lime',
      lineWidth: 2,
      fillColor: 'rgba(255,255,255,0.6)'
    });

    // Draw the item using its UI Component
    itemInBackpack[HAS_UI].sections.forEach((section) => {
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
