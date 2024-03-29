import {BaseEntity} from '../../../gameEngine/BaseEntity';
import {Entity} from 'game-platform';
import Position from '../../../gameEngine/components/Position';
import {CANVAS_OUTPUT, TILE_SIZE} from '../../../gameEngine/gameConstants';
import HasUI from '../../../gameEngine/components/HasUI';

class BrushSizeEntity extends BaseEntity {
  constructor() {
    super();
    this.addComponent({
      name: 'EDITOR_BRUSH_SIZE'
    });
  }

  setBrushSize({currentBrushSize, col, row}: {currentBrushSize: number; col: number; row: number}) {
    this.addComponent(
      new Position({
        x: col * TILE_SIZE,
        y: row * TILE_SIZE,
        width: TILE_SIZE * currentBrushSize,
        height: TILE_SIZE * currentBrushSize
      })
    );

    this.addComponent(
      new HasUI([
        {
          name: CANVAS_OUTPUT,
          shape: 'RECT_SHAPE',
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
