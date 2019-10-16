import {ANIMATION_COMP, POSITION_COMP, UI_COMP} from 'components/ComponentNamesConfig';
import {CIRCLE_SHAPE, HEALTH_BAR_SHAPE, MAP_TILE_SHAPE, PLAYER_CHAR} from '../../../gameConstants';
import renderCircle from './renderCircle';
import renderHealthBar from './renderHealthBar';
import renderAnimations from './renderAnimations';
import {bit} from '../../../config';
import char from 'assets/finalchar.png';
let img = new Image();
img.src = char;

function renderMainLayer(systemArguments, closeEnts, closeEntsWithAnimation) {
  let {mapAPI} = systemArguments;
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
        mapAPI.addImage(
          {
            id: `${entity.id}`,
            image: img,
            x: entity[POSITION_COMP].x - entity[POSITION_COMP].radius, y: entity[POSITION_COMP].y - entity[POSITION_COMP].radius,
            height: 32,
            width: 32,
            cropStartX: bit * 0,
            cropStartY: bit * 0,
            cropSizeX: bit,
            cropSizeY: bit,
            rotation: 0 // in radians
          }
        );
      }
    });
  }
  
  for (let i = 0; i < closeEntsWithAnimation.length; i++) {
    let entity = closeEnts[i];
    
    // TODO - Animation System needs to adjust position (x, y etc.) of the component.
    // Since we don't want to adjust the real X,Y, we probably need an X,Y for animations on the anim component
    // Since we can have multiple animations applied, we need to use each animation to transform the character
    // renderAnimations(systemArguments, entity);
  }
}

export default renderMainLayer;