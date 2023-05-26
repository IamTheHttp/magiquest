import Position from '../../components/Position';
import {BaseEntity} from '../../BaseEntity';
import {
  CANVAS_OUTPUT,
  HUD_PADDING_LEFT_RIGHT,
  HUD_PADDING_TOP_BOTTOM,
  TILE_SIZE,
  HUD_ITEM_BORDER_COLOR,
  HUD_ITEM_FILL_COLOR
} from '../../gameConstants';
import HasUI from '../../components/HasUI';

/**
 * This Entity is shown on the HUD
 */
export class HUDOpenInventoryIcon extends BaseEntity {
  constructor() {
    super();
    this.addComponent(
      new Position({
        x: -HUD_PADDING_LEFT_RIGHT,
        y: HUD_PADDING_TOP_BOTTOM * 2 + 5, // magic number, get some distance from the top
        width: TILE_SIZE,
        height: TILE_SIZE,
        isFixedToViewPort: true
      })
    );

    this.addComponent(
      new HasUI([
        {
          name: CANVAS_OUTPUT,
          shape: 'RECT_SHAPE',
          data: {
            backgroundColor: HUD_ITEM_FILL_COLOR,
            borderColor: HUD_ITEM_BORDER_COLOR,
            borderWidth: 1
          }
        },
        {
          name: CANVAS_OUTPUT,
          shape: 'SPRITE',
          data: {
            spriteName: 'CHEST_SPRITE'
          }
        }
      ])
    );
  }
}
