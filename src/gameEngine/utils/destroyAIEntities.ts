import {CONTROLLED_BY_AI} from 'gameEngine/components/_ComponentNames';
import {Entity, entityLoop} from 'game-platform';
import {BaseEntity} from '../BaseEntity';
function destroyAIEntities() {
  let oldEnemies = Entity.getByComp<BaseEntity>(CONTROLLED_BY_AI);
  entityLoop(oldEnemies, (entity) => {
    entity.destroy();
  });
}

export default destroyAIEntities;
