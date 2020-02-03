import filterOutFarEntities from '../utils/systemUtils/filterOutFarEntities';
import GAME_PLATFORM from 'game-platform/dist';
import { ANIMATION_COMP, UI_COMP } from '../components/ComponentNamesConfig';
import renderBackgroundLayer from '../utils/systemUtils/render/renderBackgroundLayer';
import renderMainLayer from '../utils/systemUtils/render/renderMainLayer';
var Entity = GAME_PLATFORM.Entity, entityLoop = GAME_PLATFORM.entityLoop;
function renderSystem(systemArguments) {
    var mapAPI = systemArguments.mapAPI, miniMapAPI = systemArguments.miniMapAPI, shouldRenderBackground = systemArguments.shouldRenderBackground, game = systemArguments.game;
    // clear everything before we move forward
    mapAPI.clear();
    // render background
    if (shouldRenderBackground) {
        mapAPI.clear('background');
        renderBackgroundLayer(systemArguments);
        game.notifyBackgroundWasRendered();
        mapAPI.draw('background');
    }
    var allEntsToDraw = Entity.getByComps([UI_COMP]); // O1 fetching
    var closeEnts = filterOutFarEntities(systemArguments, allEntsToDraw);
    var allAnimationsToDraw = Entity.getByComps([ANIMATION_COMP]);
    var closeAnimations = filterOutFarEntities(systemArguments, allAnimationsToDraw);
    renderMainLayer(systemArguments, closeEnts, closeAnimations);
    mapAPI.draw();
}
export default renderSystem;
