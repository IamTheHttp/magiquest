import {ANIMATION_COMP, DIALOG_COMP, POSITION_COMP, UI_COMP} from 'components/ComponentNamesConfig';
import {CIRCLE_SHAPE, DIRECTIONS, HEALTH_BAR_SHAPE, MAP_TILE_SHAPE, PLAYER_CHAR} from '../../../gameConstants';
import renderCircle from './renderCircle';
import renderHealthBar from './renderHealthBar';
import {bit} from '../../../config';
import char from 'assets/characters.png';
import getSpriteCrop from 'utils/getSpriteCrop';
import renderAnimations from 'utils/systemUtils/render/renderAnimations';
import {assetLoader} from 'cache/assetLoader';
import renderDialog from 'utils/systemUtils/render/renderDialog';
import {Entity} from 'BaseEntity';

function renderMainLayer(systemArguments, closeEnts, closeEntsWithAnimation) {
  let {mapAPI} = systemArguments;

  // render entities
  for (let i = 0; i < closeEnts.length; i++) {
    let entity = closeEnts[i];
    
    entity[UI_COMP].sections.forEach((section) => {
      if (section.shape === CIRCLE_SHAPE) {
        renderCircle(systemArguments, entity);
      }
      
      if (section.shape === HEALTH_BAR_SHAPE) {
        renderHealthBar(systemArguments, entity);
      }
  
      
      if (section.shape === PLAYER_CHAR) {
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
        mapAPI.addImage(
          {
            id: `${entity.id}`,
            image: assetLoader.getAsset(char),
            x: x - radius, y: y - radius,
            height: 32,
            width: 32,
            ...crops,
            cropSizeX: bit,
            cropSizeY: bit,
            rotation: section.rotation || 0 // in radians
          }
        );
      }
    });
  }

  // render animations
  for (let i = 0; i < closeEntsWithAnimation.length; i++) {
    let entity = closeEntsWithAnimation[i];
    
    renderAnimations(systemArguments, entity);
  }
  // one dialog at a time!

  let entity = Entity.getByComps(DIALOG_COMP)[0];
  if (entity) {
    renderDialog(systemArguments, entity);
    systemArguments.game.stop();
    entity.removeComponent(DIALOG_COMP);
  }
}

export default renderMainLayer;