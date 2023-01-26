import {AI_CONTROLLED_COMP, PLAYER_CONTROLLED_COMP, POSITION_COMP} from 'gameEngine/components/_ComponentNamesConfig';
import {Entity, entityLoop} from 'game-platform';
import {BaseEntity} from '../BaseEntity';

function destroyAllButPlayer() {
  console.log('Debug: Destroying all but player');
  let player = Entity.getByComp<BaseEntity>(PLAYER_CONTROLLED_COMP)[0];
  let allEnts = Entity.getByComp<BaseEntity>(POSITION_COMP);
  entityLoop(allEnts, (entity) => {
    if (entity !== player) {
      entity.destroy();
    }
  });
}

export default destroyAllButPlayer;
