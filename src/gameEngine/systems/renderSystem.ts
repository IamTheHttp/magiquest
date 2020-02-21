import filterOutFarEntities from '../utils/systemUtils/filterOutFarEntities';
import GAME_PLATFORM from 'game-platform';
import {ANIMATION_COMP, BACKGROUND_COMP, UI_COMP} from '../components/ComponentNamesConfig';
import renderBackgroundLayer from '../utils/systemUtils/render/renderBackgroundLayer';
import renderMainLayer from '../utils/systemUtils/render/renderMainLayer';
import {ISystemArguments} from "../../interfaces";
let {Entity, entityLoop} = GAME_PLATFORM;


function renderSystem(systemArguments: ISystemArguments) {
  let {mapAPI, miniMapAPI, shouldRenderBackground, game} = systemArguments;
  // clear everything before we move forward
  mapAPI.clear();
  
  // render background
  if (shouldRenderBackground) {
    mapAPI.clear('background');
    renderBackgroundLayer(systemArguments);
    game.notifyBackgroundWasRendered();
    mapAPI.draw('background');
  }
  
  let allEntsToDraw = Entity.getByComps([UI_COMP]); // O1 fetching
  let closeEnts = filterOutFarEntities(systemArguments, allEntsToDraw);
  
  let allAnimationsToDraw = Entity.getByComps([ANIMATION_COMP]);
  let closeAnimations = filterOutFarEntities(systemArguments, allAnimationsToDraw);
  
  renderMainLayer(systemArguments, closeEnts, closeAnimations);
  
  mapAPI.draw();
}

export default renderSystem;