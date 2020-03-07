import {AI_CONTROLLED_COMP} from 'gameEngine/components/ComponentNamesConfig';
import GAME_PLATFORM from 'game-platform';
import BaseEntity, {Entity} from 'gameEngine/BaseEntity';
let {entityLoop} = GAME_PLATFORM;
function destroyAIEntities() {
  let oldEnemies = Entity.getByComp(AI_CONTROLLED_COMP);
  entityLoop(oldEnemies, (entity: BaseEntity) => {
    entity.destroy();
  });
}

export default destroyAIEntities;