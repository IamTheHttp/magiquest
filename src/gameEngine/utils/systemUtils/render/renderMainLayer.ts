import {DIALOG_COMP} from 'gameEngine/components/ComponentNamesConfig';
import renderAnimations from 'gameEngine/utils/systemUtils/render/renderAnimations';
import renderDialog from 'gameEngine/utils/systemUtils/render/renderUtils/renderDialog';
import {ISystemArguments} from '../../../../interfaces/IGameLoop';
import {Entity} from 'game-platform';
import {BaseEntity} from '../../../BaseEntity';
import Player from '../../../entities/placeableEntities/Player';
import {renderStaticEntity} from './renderUtils/renderStaticEntity';

interface IMainLayerData {
  closeEntitiesWithUI: BaseEntity[];
  closeEntitiesWithAnimations: BaseEntity[];
  player: Player;
}

function renderMainLayer(systemArguments: ISystemArguments, mainLayerData: IMainLayerData) {
  const {closeEntitiesWithUI, closeEntitiesWithAnimations, player} = mainLayerData;

  // render static entities (Without animations)
  for (let i = 0; i < closeEntitiesWithUI.length; i++) {
    let entity = closeEntitiesWithUI[i];
    // TODO - Can we optimize this?
    if (!entity.isPlayer()) {
      renderStaticEntity({systemArguments, entity});
    }
  }

  /**
   * We render the player last to ensure it's the last "layer" of the canvas.
   * This prevents other entities overlapping on top of the player, such as items on the ground
   * We of course check that the player exists first since the player can be very far, and so we might skip rendering it
   */
  if (player) {
    renderStaticEntity({systemArguments, entity: player});
  }

  // render animations
  for (let i = 0; i < closeEntitiesWithAnimations.length; i++) {
    let entity = closeEntitiesWithAnimations[i];

    renderAnimations(systemArguments, entity);
  }

  // one dialog at a time!
  let entity = Entity.getByComp<BaseEntity>(DIALOG_COMP)[0];
  if (entity) {
    renderDialog(systemArguments, entity);
    systemArguments.game.stop();
    entity.removeComponent(DIALOG_COMP);
  }
}

export default renderMainLayer;
