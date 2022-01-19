import filterOutFarEntities from '../utils/systemUtils/filterOutFarEntities';
import {ANIMATION_COMP, BACKGROUND_COMP, UI_COMP} from '../components/ComponentNamesConfig';
import renderBackgroundLayer from '../utils/systemUtils/render/renderBackgroundLayer';
import renderMainLayer from '../utils/systemUtils/render/renderMainLayer';
import {ISystemArguments} from '../../interfaces/gameloop.i';
import {Entity} from 'game-platform';
import {BaseEntity} from '../BaseEntity';

function renderSystem(systemArguments: ISystemArguments) {
  let {mapAPI, shouldRenderBackground, game} = systemArguments;
  // clear everything before we move forward
  mapAPI.clearAllShapesInLayer();

  // render background
  if (shouldRenderBackground) {
    mapAPI.clearAllShapesInLayer('background');
    renderBackgroundLayer(systemArguments);
    game.notifyBackgroundWasRendered();
    mapAPI.drawAllShapesInLayer('background');
  }

  let allEntsToDraw = Entity.getByComps<BaseEntity>([UI_COMP]); // O1 fetching
  let closeEnts = filterOutFarEntities(systemArguments, allEntsToDraw);

  let allAnimationsToDraw = Entity.getByComps<BaseEntity>([ANIMATION_COMP]);
  let closeAnimations = filterOutFarEntities(systemArguments, allAnimationsToDraw);

  renderMainLayer(systemArguments, closeEnts, closeAnimations);

  mapAPI.drawAllShapesInLayer();
}

export default renderSystem;
