import {renderInteractionSign} from './renderInteractionSign';
import {POSITION, UI} from '../../../../components/_ComponentNames';
import {TILE_SIZE} from '../../../../gameConstants';
import renderCircle from './renderCircle';
import renderHealthBar from './renderHealthBar';
import {renderRectOnEntity} from './renderRectOnEntity';
import {ISystemArguments} from '../../../../../interfaces/IGameLoop';
import {BaseEntity} from '../../../../BaseEntity';
import {renderSprite} from './renderSprite';

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

  // Draw the NPC interaction sign (Like a question mark)
  renderInteractionSign(entity, systemArguments);

  // Draw UI Components related to a specific entity
  // These usually are related to the position of the entity itself
  entity[UI].sections.forEach((section) => {
    // Draw static sprites like a dropped item, or a chest
    if (section.shape === 'SPRITE') {
      renderSprite(systemArguments, entity, section);
    }

    if (section.shape === 'CIRCLE_SHAPE') {
      renderCircle(systemArguments, entity, section);
    }

    if (section.shape === 'HEALTH_BAR_SHAPE') {
      renderHealthBar(systemArguments, entity);
    }

    if (section.shape === 'RECT_SHAPE') {
      renderRectOnEntity(systemArguments, entity, section);
    }

    // Draw a Player on the screen
    if (section.shape === 'PLAYER_CHAR') {
      const spriteCrop = {
        ['LEFT']: SPRITES.ENTITY_PLAYER_LEFT,
        ['RIGHT']: SPRITES.ENTITY_PLAYER_RIGHT,
        ['UP']: SPRITES.ENTITY_PLAYER_UP,
        ['DOWN']: SPRITES.ENTITY_PLAYER_DOWN
      };

      const playerSprite = spriteCrop[entity.getOrientation()];

      const {radius, x, y} = entity[POSITION];
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
