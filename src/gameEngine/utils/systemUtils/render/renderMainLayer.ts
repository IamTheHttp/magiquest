import {
  ANIMATION_COMP,
  DIALOG_COMP,
  HAS_ACTION_SIGN_COMP,
  POSITION_COMP,
  UI_COMP
} from 'gameEngine/components/ComponentNamesConfig';
import {AllowedUIShapes, TILE_SIZE, DIRECTIONS, DIRECTIONS_OPTIONS} from '../../../gameConstants';
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
import {renderRect} from './renderRect';

function renderMainLayer(
  systemArguments: ISystemArguments,
  closeEnts: BaseEntity[],
  closeEntsWithAnimation: BaseEntity[]
) {
  let {mapAPI} = systemArguments;

  // render entities
  for (let i = 0; i < closeEnts.length; i++) {
    let entity = closeEnts[i];

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

    entity[UI_COMP].sections.forEach((section) => {
      if (section.shape === AllowedUIShapes.CIRCLE_SHAPE) {
        renderCircle(systemArguments, entity, section);
      }

      if (section.shape === AllowedUIShapes.HEALTH_BAR_SHAPE) {
        renderHealthBar(systemArguments, entity);
      }

      if (section.shape === AllowedUIShapes.RECT_SHAPE) {
        renderRect(systemArguments, entity);
      }

      if (section.shape === AllowedUIShapes.CHEST_SHAPE) {
        let crops = {
          cropStartX: TILE_SIZE,
          cropStartY: 0
        };

        let {radius, x, y} = entity[POSITION_COMP];
        // When the player is out of animation phase, this is what we show
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

      if (section.shape === AllowedUIShapes.PLAYER_CHAR) {
        let spriteCrop = {
          [DIRECTIONS_OPTIONS.LEFT]: getSpriteCrop(1, 1),
          [DIRECTIONS_OPTIONS.RIGHT]: getSpriteCrop(1, 0),
          [DIRECTIONS_OPTIONS.UP]: getSpriteCrop(1, 3),
          [DIRECTIONS_OPTIONS.DOWN]: getSpriteCrop(1, 2)
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
