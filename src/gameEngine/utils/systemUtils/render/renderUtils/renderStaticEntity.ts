import {renderBackpackItems} from './renderBackpackItems';
import {renderInteractionSign} from './renderInteractionSign';
import {POSITION, UI} from '../../../../components/_ComponentNames';
import {DIRECTIONS, PossibleUIShapes, TILE_SIZE} from '../../../../gameConstants';
import renderCircle from './renderCircle';
import renderHealthBar from './renderHealthBar';
import {renderRectOnEntity} from './renderRectOnEntity';
import {ISystemArguments} from '../../../../../interfaces/IGameLoop';
import {BaseEntity} from '../../../../BaseEntity';

interface IRenderStaticEntity {
  systemArguments: ISystemArguments;
  entity: BaseEntity;
}

/**
 * This function renders entities without their animations
 * Things such as sprites, static items, etc. will be rendered here.
 *
 */
export function renderStaticEntity({systemArguments, entity}: IRenderStaticEntity) {
  const {mapAPI, SPRITES} = systemArguments;

  if (entity.isPlayer()) {
    renderBackpackItems(entity, systemArguments);
  }

  // Draw the NPC interaction sign (Like a question mark)
  renderInteractionSign(entity, systemArguments);

  // Draw UI Components related to a specific entity
  // These usually are related to the position of the entity itself
  entity[UI].sections.forEach((section) => {
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
      let {radius, x, y} = entity[POSITION];
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

    // Draw a dropped item
    if (section.shape === PossibleUIShapes.DROPPED_ITEM_SHAPE) {
      let {radius, x, y} = entity[POSITION];

      mapAPI.drawImage({
        id: `${entity.id}`,
        // TODO add a check and log errors if spriteName doesn't exist in SPRITES
        // @ts-ignore Skip type checks of these dynamics
        ...SPRITES[section.data.spriteName],
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

      let {radius, x, y} = entity[POSITION];
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
