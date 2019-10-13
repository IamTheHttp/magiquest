

// import filterOutFarEntities from '../utils/utils/filterOutFarEntities';


import filterOutFarEntities from '../utils/systemUtils/filterOutFarEntities';
import GAME_PLATFORM from 'game-platform/dist';
import {ATTACK_COMP, BACKGROUND_COMP, HEALTH_COMP, POSITION_COMP, UI_COMP} from '../components/ComponentNamesConfig';
import {CIRCLE_SHAPE, DIRECTIONS, HEALTH_BAR_SHAPE, MAP_TILE_SHAPE} from '../constants';
import renderCircle from '../utils/systemUtils/render/renderCircle';
import renderHealthBar from '../utils/systemUtils/render/renderHealthBar';
import renderBackgroundLayer from '../utils/systemUtils/render/renderBackgroundLayer';


let {Entity, entityLoop} = GAME_PLATFORM;


/**
 * @param systemArguments
 * @param {Entity[]} closeEnts
 * @return void
 */
function renderMainLayer(systemArguments, closeEnts) {
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
}

function renderSystem(systemArguments) {
  let {mapAPI, miniMapAPI, getRenderBackground} = systemArguments;
  // clear everything before we move forward
  mapAPI.clear();
  miniMapAPI.clear();
  
  // render background
  if (getRenderBackground()) {
    mapAPI.clear('background');
    let allBackgroundEnts = Entity.getByComps([BACKGROUND_COMP]); // O1 fetching
    let closeBackgroundEnts = filterOutFarEntities(systemArguments, allBackgroundEnts);
    
    renderBackgroundLayer(systemArguments, closeBackgroundEnts);
    mapAPI.draw('background');
  }
  
  
  // render main...
  
  let allEntsToDraw = Entity.getByComps([UI_COMP]); // O1 fetching
  let closeEnts = filterOutFarEntities(systemArguments, allEntsToDraw);
  
  renderMainLayer(systemArguments, closeEnts);
  mapAPI.draw();
  
  
  // renderOnMinimap(allEntsToDraw);
  //
  //
  //
  // // filter out out-of-scope
  //
  // mainLayerRender(systemArguments, mapAPI, miniMapAPI);
  // backgroundLayerRender(systemArguments, mapAPI, miniMapAPI);
}

export default renderSystem;