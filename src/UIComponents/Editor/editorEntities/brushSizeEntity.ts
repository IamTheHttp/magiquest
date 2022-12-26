import {BaseEntity} from '../../../gameEngine/BaseEntity';
import {Entity} from 'game-platform';
import PositionComponent from '../../../gameEngine/components/PositionComponent';
import {PossibleUIShapes, CANVAS_OUTPUT, TILE_SIZE} from '../../../gameEngine/gameConstants';
import UIComponent from '../../../gameEngine/components/UIComponent';

class BrushSizeEntity extends BaseEntity {
  constructor() {
    super();
    this.addComponent({
      name: 'EDITOR_BRUSH_SIZE'
    });
  }

  setBrushSize({currentBrushSize, col, row}: {currentBrushSize: number; col: number; row: number}) {
    this.addComponent(
      new PositionComponent({
        x: col * TILE_SIZE,
        y: row * TILE_SIZE,
        width: TILE_SIZE * currentBrushSize,
        height: TILE_SIZE * currentBrushSize
      })
    );

    this.addComponent(
      new UIComponent([
        {
          name: CANVAS_OUTPUT,
          shape: PossibleUIShapes.RECT_SHAPE,
          data: {}
        }
      ])
    );
  }
}

/**
 * Get or create a new brushSize entity
 */
function getBrushSizeEntity() {
  let brushSizeEnt = Entity.getByComp<BrushSizeEntity>('EDITOR_BRUSH_SIZE')[0];

  if (!brushSizeEnt) {
    brushSizeEnt = new BrushSizeEntity();
  }

  return brushSizeEnt;
}

export {getBrushSizeEntity};
