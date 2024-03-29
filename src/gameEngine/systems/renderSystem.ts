import filterOutFarEntities from '../utils/systemUtils/filterOutFarEntities';
import {ANIMATIONS, PLAYER_CONTROLLED, POSITION, UI} from '../components/_ComponentNames';
import renderBackgroundLayer from '../utils/systemUtils/render/renderBackgroundLayer';
import renderMainLayer from '../utils/systemUtils/render/renderMainLayer';
import {ISystemArguments} from '../../interfaces/IGameLoop';
import {Entity} from 'game-platform';
import {BaseEntity} from '../BaseEntity';
import Player from '../entities/placeableEntities/Player';

function renderSystem(systemArguments: ISystemArguments) {
  const {mapAPI, shouldRenderBackground, game} = systemArguments;
  // clear everything before we move forward
  mapAPI.clearAllShapesInLayer();

  // render background
  if (shouldRenderBackground) {
    mapAPI.clearAllShapesInLayer('background');
    renderBackgroundLayer(systemArguments);
    game.notifyBackgroundWasRendered();
    mapAPI.drawAllShapesInLayer('background');
  }

  const entitiesWithUI = Entity.getByComps<BaseEntity>([UI, POSITION]); // O1 fetching
  const closeEntitiesWithUI = filterOutFarEntities(systemArguments, entitiesWithUI);

  const entitiesWithAnimations = Entity.getByComps<BaseEntity>([ANIMATIONS]);
  const closeEntitiesWithAnimations = filterOutFarEntities(systemArguments, entitiesWithAnimations);

  // Just in case we pan out from the player, somehow, skip the rendering of the player.
  const player = filterOutFarEntities(systemArguments, Entity.getByComp<Player>(PLAYER_CONTROLLED))[0] as Player;

  const mainLayerData = {
    closeEntitiesWithUI,
    closeEntitiesWithAnimations,
    player
  };

  renderMainLayer(systemArguments, mainLayerData);

  mapAPI.drawAllShapesInLayer();
}

export default renderSystem;
