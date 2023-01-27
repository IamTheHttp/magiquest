import {DIALOG, STACKABLE} from 'gameEngine/components/_ComponentNames';
import renderAnimations from 'gameEngine/utils/systemUtils/render/renderAnimations';
import renderDialog from 'gameEngine/utils/systemUtils/render/renderUtils/renderDialog';
import {ISystemArguments} from '../../../../interfaces/IGameLoop';
import {Entity} from 'game-platform';
import {BaseEntity} from '../../../BaseEntity';
import Player from '../../../entities/placeableEntities/Player';
import {renderStaticEntity} from './renderUtils/renderStaticEntity';
import {getColRowByTileIdx, getTileIdxByEnt} from '../../componentUtils/tileUtils/tileIdxUtils';
import {TILE_SIZE} from '../../../gameConstants';

interface IMainLayerData {
  closeEntitiesWithUI: BaseEntity[];
  closeEntitiesWithAnimations: BaseEntity[];
  player: Player;
}

/**
 * Keep track of Entity Positions, useful when we want to add counters on the map
 */
let ENTITY_POSITIONS: {
  [key: string]: {
    entities: BaseEntity[];
  };
} = {};

function renderMainLayer(systemArguments: ISystemArguments, mainLayerData: IMainLayerData) {
  const {closeEntitiesWithUI, closeEntitiesWithAnimations, player} = mainLayerData;
  const {mapAPI} = systemArguments;

  // render static entities (Without animations)
  for (let i = 0; i < closeEntitiesWithUI.length; i++) {
    let entity = closeEntitiesWithUI[i];

    /**
     * Collect data to render the numbers on tiles that contain more than one element
     */
    if (entity.hasComponents(STACKABLE)) {
      const entityCurrentTileIdx = getTileIdxByEnt(entity);
      if (!ENTITY_POSITIONS[entityCurrentTileIdx]) {
        ENTITY_POSITIONS[entityCurrentTileIdx] = {
          entities: [entity]
        };
      } else {
        ENTITY_POSITIONS[entityCurrentTileIdx].entities.push(entity);
      }
    }

    // TODO - Can we optimize this? we currently don't have negative selectors, so the entity list contains the player
    if (!entity.isPlayer()) {
      renderStaticEntity({systemArguments, entity});
    }
  }

  /**
   * We render the player last to ensure it's the last "layer" of the canvas.
   * This prevents other entities overlapping on top of the player, such as items on the ground
   * We of course check that the player exists first since the player can be very far, and so we might skip rendering it
   */
  if (player) {
    renderStaticEntity({systemArguments, entity: player});
  }

  // render animations
  for (let i = 0; i < closeEntitiesWithAnimations.length; i++) {
    let entity = closeEntitiesWithAnimations[i];

    renderAnimations(systemArguments, entity);
  }

  // Render item quantity on the ground
  for (let tileIdx in ENTITY_POSITIONS) {
    if (ENTITY_POSITIONS[tileIdx].entities.length > 1) {
      const QUANTITY = ENTITY_POSITIONS[tileIdx].entities.length;
      const {col, row} = getColRowByTileIdx(tileIdx);

      mapAPI.drawText({
        id: `counter-${tileIdx}`,
        text: `x${QUANTITY}`,
        font: '15px arial',
        fillStyle: 'white',
        textBaseline: 'bottom',
        y: (row + 1) * TILE_SIZE,
        x: (col + 1) * TILE_SIZE - 0.5 * TILE_SIZE // Make sure the text is slightly tucked back on the tile itself
      });
    }
  }

  // one dialog at a time!
  let entity = Entity.getByComp<BaseEntity>(DIALOG)[0];
  if (entity) {
    renderDialog(systemArguments, entity);
    systemArguments.game.stop();
    entity.removeComponent(DIALOG);
  }

  // Reset the POSITIONS map
  ENTITY_POSITIONS = {};
}

export default renderMainLayer;
