import filterOutFarEntities from '../utils/systemUtils/filterOutFarEntities';
import {HAS_ANIMATIONS, PLAYER_CONTROLLED_COMP, HAS_POSITION, HAS_UI} from '../components/_ComponentNamesConfig';
import renderBackgroundLayer from '../utils/systemUtils/render/renderBackgroundLayer';
import renderMainLayer from '../utils/systemUtils/render/renderMainLayer';
import {ISystemArguments} from '../../interfaces/IGameLoop';
import {Entity} from 'game-platform';
import {BaseEntity} from '../BaseEntity';
import Player from '../entities/placeableEntities/Player';

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

  let entitiesWithUI = Entity.getByComps<BaseEntity>([HAS_UI, HAS_POSITION]); // O1 fetching
  let closeEntitiesWithUI = filterOutFarEntities(systemArguments, entitiesWithUI);

  let entitiesWithAnimations = Entity.getByComps<BaseEntity>([HAS_ANIMATIONS]);
  let closeEntitiesWithAnimations = filterOutFarEntities(systemArguments, entitiesWithAnimations);

  // Just in case we pan out from the player, somehow, skip the rendering of the player.
  const player = filterOutFarEntities(systemArguments, Entity.getByComp<Player>(PLAYER_CONTROLLED_COMP))[0] as Player;

  const mainLayerData = {
    closeEntitiesWithUI,
    closeEntitiesWithAnimations,
    player
  };

  renderMainLayer(systemArguments, mainLayerData);

  mapAPI.drawAllShapesInLayer();
}

export default renderSystem;
