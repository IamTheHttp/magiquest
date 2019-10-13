import filterOutFarEntities from '../utils/systemUtils/filterOutFarEntities';
import GAME_PLATFORM from 'game-platform/dist';
import {BACKGROUND_COMP, UI_COMP} from '../components/ComponentNamesConfig';
import renderBackgroundLayer from '../utils/systemUtils/render/renderBackgroundLayer';
import renderMainLayer from '../utils/systemUtils/render/renderMainLayer';
let {Entity, entityLoop} = GAME_PLATFORM;


function renderSystem(systemArguments) {
  let {mapAPI, miniMapAPI, getRenderBackground} = systemArguments;
  // clear everything before we move forward
  mapAPI.clear();
  miniMapAPI.clear();
  
  // render background
  if (getRenderBackground()) {
    mapAPI.clear('background');
    renderBackgroundLayer(systemArguments);
    mapAPI.draw('background');
  }
  
  let allEntsToDraw = Entity.getByComps([UI_COMP]); // O1 fetching
  let closeEnts = filterOutFarEntities(systemArguments, allEntsToDraw);
  
  renderMainLayer(systemArguments, closeEnts);
  mapAPI.draw();
}

export default renderSystem;