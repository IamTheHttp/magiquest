import {PLAYER_CONTROLLED, POSITION} from 'gameEngine/components/_ComponentNames';
import {Entity, entityLoop} from 'game-platform';
import {BaseEntity} from '../BaseEntity';

function destroyAllButPlayer() {
  console.log('Debug: Destroying all but player');
  const player = Entity.getByComp<BaseEntity>(PLAYER_CONTROLLED)[0];
  const allEnts = Entity.getByComp<BaseEntity>(POSITION);
  entityLoop(allEnts, (entity) => {
    if (entity !== player) {
      entity.destroy();
    }
  });
}

export default destroyAllButPlayer;
