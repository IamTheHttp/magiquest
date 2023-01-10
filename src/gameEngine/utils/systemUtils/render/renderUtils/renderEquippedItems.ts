import {INVENTORY_COMP} from '../../../../components/ComponentNamesConfig';
import Player from '../../../../entities/placeableEntities/Player';
import {ISystemArguments} from '../../../../../interfaces/IGameLoop';

export function renderEquippedItems(player: Player, systemArguments: ISystemArguments) {
  const {mapAPI, SPRITES} = systemArguments;

  // Ensure right spacing between equipment slots
  // 20       []
  // 20+30    [] []
  // 20+30+30 [] [] []
  player[INVENTORY_COMP].equipped.forEach((equippedItem, i) => {
    const {panX, panY} = mapAPI.getCurrentPanValue();
    mapAPI.drawRect({
      id: `equipment-slot-${i}`,
      x: 20 + 50 * i - panX,
      y: 20 - panY,
      width: 30,
      height: 30,
      strokeStyle: 'lime',
      lineWidth: 2,
      fillColor: 'rgba(255,255,255,0.6)'
    });

    mapAPI.drawImage({
      id: `equipment-slot-${i}-sprite`,
      ...SPRITES[equippedItem.spriteName],
      x: 20 + 50 * i - panX,
      y: 20 - panY,
      height: 30,
      width: 30,
      rotation: 0 // in radians
    });
  });
}
