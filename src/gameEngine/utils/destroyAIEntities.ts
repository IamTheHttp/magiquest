import {AI_CONTROLLED_COMP} from 'gameEngine/components/_ComponentNamesConfig';
import {Entity, entityLoop} from 'game-platform';
import {BaseEntity} from '../BaseEntity';
function destroyAIEntities() {
  let oldEnemies = Entity.getByComp<BaseEntity>(AI_CONTROLLED_COMP);
  entityLoop(oldEnemies, (entity) => {
    entity.destroy();
  });
}

export default destroyAIEntities;
