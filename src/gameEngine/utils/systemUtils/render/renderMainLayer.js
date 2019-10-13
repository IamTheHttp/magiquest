import {ANIMATION_COMP, POSITION_COMP, UI_COMP} from '../../../components/ComponentNamesConfig';
import {CIRCLE_SHAPE, HEALTH_BAR_SHAPE} from '../../../constants';
import renderCircle from './renderCircle';
import renderHealthBar from './renderHealthBar';
import renderAnimations from './renderAnimations';

function renderMainLayer(systemArguments, closeEnts, closeEntsWithAnimation) {
  for (let i = 0; i < closeEnts.length; i++) {
    let entity = closeEnts[i];
    
    entity[UI_COMP].sections.forEach((section) => {
      if (section.shape === CIRCLE_SHAPE) {
        renderCircle(systemArguments, entity);
      }
      
      if (section.shape === HEALTH_BAR_SHAPE) {
        renderHealthBar(systemArguments, entity);
      }
    });
  }
  
  for (let i = 0; i < closeEntsWithAnimation.length; i++) {
    let entity = closeEnts[i];
    
    renderAnimations(systemArguments, entity);
  }
}

export default renderMainLayer;