import {CONTROLLED_BY_AI, PLAYER_CONTROLLED, POSITION} from 'gameEngine/components/_ComponentNames';
import {Entity, entityLoop} from 'game-platform';
import {BaseEntity} from '../BaseEntity';

function destroyAllButPlayer() {
  console.log('Debug: Destroying all but player');
  let player = Entity.getByComp<BaseEntity>(PLAYER_CONTROLLED)[0];
  let allEnts = Entity.getByComp<BaseEntity>(POSITION);
  entityLoop(allEnts, (entity) => {
    if (entity !== player) {
      entity.destroy();
    }
  });
}

export default destroyAllButPlayer;
