import Position from '../../components/Position';
import {BaseEntity} from '../../BaseEntity';
import {CANVAS_OUTPUT, PossibleUIShapes, TILE_SIZE} from '../../gameConstants';
import HasUI from '../../components/HasUI';

/**
 * This Entity is shown on the HUD
 */
export class HUDOpenInventoryIcon extends BaseEntity {
  constructor() {
    super();
    this.addComponent(new Position({x: 50, y: 50, width: TILE_SIZE, height: TILE_SIZE, isFixedToViewPort: true}));

    this.addComponent(
      new HasUI([
        {
          name: CANVAS_OUTPUT,
          shape: PossibleUIShapes.SPRITE,
          data: {
            spriteName: 'CHEST_SPRITE'
          }
        },
        {
          name: CANVAS_OUTPUT,
          shape: PossibleUIShapes.RECT_SHAPE,
          data: {}
        }
      ])
    );
  }
}
