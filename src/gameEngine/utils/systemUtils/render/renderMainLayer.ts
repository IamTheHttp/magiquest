import {DIALOG_COMP, POSITION_COMP, UI_COMP} from 'gameEngine/components/ComponentNamesConfig';
import {PossibleUIShapes, TILE_SIZE, DIRECTIONS} from '../../../gameConstants';
import renderCircle from './renderCircle';
import renderHealthBar from './renderHealthBar';
import renderAnimations from 'gameEngine/utils/systemUtils/render/renderAnimations';
import {assetLoader} from 'utils/assetLoader';
import renderDialog from 'gameEngine/utils/systemUtils/render/renderDialog';
import {ISystemArguments} from '../../../../interfaces/IGameLoop';
import {Entity} from 'game-platform';
import {BaseEntity} from '../../../BaseEntity';
import {renderRectOnEntity} from './renderRectOnEntity';
import {renderEquippedItems} from './renderUtils/renderEquippedItems';
import {renderInteractionSign} from './renderUtils/renderInteractionSign';

function renderMainLayer(
  systemArguments: ISystemArguments,
  closeEnts: BaseEntity[],
  closeEntsWithAnimation: BaseEntity[]
) {
  let {mapAPI, SPRITES} = systemArguments;

  // render entities
  for (let i = 0; i < closeEnts.length; i++) {
    let entity = closeEnts[i];

    if (entity.isPlayer()) {
      renderEquippedItems(entity, systemArguments);
    }

    // Draw the NPC interaction sign (Like a question mark)
    renderInteractionSign(entity, systemArguments);

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
        let {radius, x, y} = entity[POSITION_COMP];
        mapAPI.drawImage({
          id: `${entity.id}`,
          ...SPRITES.ENTITY_CHEST,
          x: x - radius,
          y: y - radius,
          height: TILE_SIZE,
          width: TILE_SIZE,
          rotation: 0 // in radians
        });
      }

      // Draw a Player on the screen
      if (section.shape === PossibleUIShapes.PLAYER_CHAR) {
        let spriteCrop = {
          [DIRECTIONS.LEFT]: SPRITES.ENTITY_PLAYER_LEFT,
          [DIRECTIONS.RIGHT]: SPRITES.ENTITY_PLAYER_RIGHT,
          [DIRECTIONS.UP]: SPRITES.ENTITY_PLAYER_UP,
          [DIRECTIONS.DOWN]: SPRITES.ENTITY_PLAYER_DOWN
        };

        let playerSprite = spriteCrop[entity.getOrientation()];

        let {radius, x, y} = entity[POSITION_COMP];
        // When the player is out of animation phase, this is what we show
        mapAPI.drawImage({
          id: `${entity.id}`,
          x: x - radius,
          y: y - radius,
          height: TILE_SIZE,
          width: TILE_SIZE,
          ...playerSprite,
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
