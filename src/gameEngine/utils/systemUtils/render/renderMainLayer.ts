import {
  ANIMATION_COMP,
  DIALOG_COMP,
  HAS_ACTION_SIGN_COMP,
  INVENTORY_COMP,
  POSITION_COMP,
  UI_COMP
} from 'gameEngine/components/ComponentNamesConfig';
import {PossibleUIShapes, TILE_SIZE, DIRECTIONS} from '../../../gameConstants';
import renderCircle from './renderCircle';
import renderHealthBar from './renderHealthBar';
import char from '../../../../assets/player.png';
import misc from '../../../../assets/misc.png';
import {getSpriteCrop} from 'gameEngine/utils/getSpriteCrop';
import renderAnimations from 'gameEngine/utils/systemUtils/render/renderAnimations';
import {assetLoader} from 'utils/assetLoader';
import renderDialog from 'gameEngine/utils/systemUtils/render/renderDialog';
import {ISystemArguments} from '../../../../interfaces/IGameLoop';
import {Entity} from 'game-platform';
import {BaseEntity} from '../../../BaseEntity';
import {renderRectOnEntity} from './renderRectOnEntity';

function renderMainLayer(
  systemArguments: ISystemArguments,
  closeEnts: BaseEntity[],
  closeEntsWithAnimation: BaseEntity[]
) {
  let {mapAPI} = systemArguments;

  // render entities
  for (let i = 0; i < closeEnts.length; i++) {
    let entity = closeEnts[i];

    // Draw inventory for the player on the UI
    if (entity.isPlayer()) {
      // Ensure right spacing between equipment slots
      // 20       []
      // 20+30    [] []
      // 20+30+30 [] [] []
      entity[INVENTORY_COMP].equipped.forEach((v, i) => {
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
          image: assetLoader.getAsset(misc),
          x: 20 + 50 * i - panX,
          y: 20 - panY,
          height: 30,
          width: 30,
          cropStartX: TILE_SIZE,
          cropStartY: 4 * TILE_SIZE,
          cropSizeX: TILE_SIZE,
          cropSizeY: TILE_SIZE,
          rotation: 0 // in radians
        });
      });
    }

    // Draw the question sign post
    if (entity.hasComponents(HAS_ACTION_SIGN_COMP)) {
      let {x, y, radius} = entity[POSITION_COMP];
      let {symbol} = entity[HAS_ACTION_SIGN_COMP];
      mapAPI.drawText({
        id: `${entity.id}-assign-quest`,
        text: symbol,
        textBaseline: 'middle',
        fillStyle: 'yellow',
        strokeStyle: 'black',
        font: `${radius * 2}px Arial`,
        x: x + radius / 2,
        y: y - radius
      });
    }

    // Draw UI Components related to a specific entity
    // These usually are related to the position of the entity itself
    entity[UI_COMP].sections.forEach((section) => {
      if (section.shape === PossibleUIShapes.CIRCLE_SHAPE) {
        renderCircle(systemArguments, entity, section);
      }

      if (section.shape === PossibleUIShapes.HEALTH_BAR_SHAPE) {
        renderHealthBar(systemArguments, entity);
      }

      if (section.shape === PossibleUIShapes.RECT_SHAPE) {
        renderRectOnEntity(systemArguments, entity);
      }

      // Draw a chest
      if (section.shape === PossibleUIShapes.CHEST_SHAPE) {
        let crops = {
          cropStartX: TILE_SIZE,
          cropStartY: 0
        };

        let {radius, x, y} = entity[POSITION_COMP];
        mapAPI.drawImage({
          id: `${entity.id}`,
          image: assetLoader.getAsset(misc),
          x: x - radius,
          y: y - radius,
          height: TILE_SIZE,
          width: TILE_SIZE,
          ...crops,
          cropSizeX: TILE_SIZE,
          cropSizeY: TILE_SIZE,
          rotation: 0 // in radians
        });
      }

      // Draw a Player on the screen
      if (section.shape === PossibleUIShapes.PLAYER_CHAR) {
        let spriteCrop = {
          [DIRECTIONS.LEFT]: getSpriteCrop(1, 1),
          [DIRECTIONS.RIGHT]: getSpriteCrop(1, 0),
          [DIRECTIONS.UP]: getSpriteCrop(1, 3),
          [DIRECTIONS.DOWN]: getSpriteCrop(1, 2)
        };

        let crops = spriteCrop[entity.getOrientation()] || {
          cropStartX: 0,
          cropStartY: 0
        };

        let {radius, x, y} = entity[POSITION_COMP];
        // When the player is out of animation phase, this is what we show
        mapAPI.drawImage({
          id: `${entity.id}`,
          image: assetLoader.getAsset(char),
          x: x - radius,
          y: y - radius,
          height: TILE_SIZE,
          width: TILE_SIZE,
          ...crops,
          cropSizeX: TILE_SIZE,
          cropSizeY: TILE_SIZE,
          rotation: 0 // in radians
        });
      }
    });
  }

  // render animations
  for (let i = 0; i < closeEntsWithAnimation.length; i++) {
    let entity = closeEntsWithAnimation[i];

    renderAnimations(systemArguments, entity);
  }
  // one dialog at a time!

  let entity = Entity.getByComp<BaseEntity>(DIALOG_COMP)[0];
  if (entity) {
    renderDialog(systemArguments, entity);
    systemArguments.game.stop();
    entity.removeComponent(DIALOG_COMP);
  }
}

export default renderMainLayer;
