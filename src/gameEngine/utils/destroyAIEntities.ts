import {AI_CONTROLLED_COMP} from 'gameEngine/components/ComponentNamesConfig';
import GAME_PLATFORM from 'game-platform/dist';
import {Entity} from 'gameEngine/BaseEntity';
let {entityLoop} = GAME_PLATFORM;
function destroyAIEntities() {
  let oldEnemies = Entity.getByComps(AI_CONTROLLED_COMP);
  entityLoop(oldEnemies, (ent) => {
    ent.destroy();
  });
}

export default destroyAIEntities;