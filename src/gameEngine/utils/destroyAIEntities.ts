import {IS_CONTROLLED_BY_AI} from 'gameEngine/components/_ComponentNamesConfig';
import {Entity, entityLoop} from 'game-platform';
import {BaseEntity} from '../BaseEntity';
function destroyAIEntities() {
  let oldEnemies = Entity.getByComp<BaseEntity>(IS_CONTROLLED_BY_AI);
  entityLoop(oldEnemies, (entity) => {
    entity.destroy();
  });
}

export default destroyAIEntities;
