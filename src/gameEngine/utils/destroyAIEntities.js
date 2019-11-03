import {AI_CONTROLLED_COMP} from 'components/ComponentNamesConfig';
import entityLoop from 'game-platform/src/lib/ECS/util/entityLoop';
import {Entity} from 'BaseEntity';

function destroyAIEntities() {
  let oldEnemies = Entity.getByComps(AI_CONTROLLED_COMP);
  entityLoop(oldEnemies, (ent) => {
    ent.destroy();
  });
}

export default destroyAIEntities;