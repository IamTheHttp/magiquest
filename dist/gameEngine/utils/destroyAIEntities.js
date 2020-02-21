import { AI_CONTROLLED_COMP } from 'gameEngine/components/ComponentNamesConfig';
import GAME_PLATFORM from 'game-platform/dist';
import { Entity } from 'gameEngine/BaseEntity';
var entityLoop = GAME_PLATFORM.entityLoop;
function destroyAIEntities() {
    var oldEnemies = Entity.getByComps(AI_CONTROLLED_COMP);
    entityLoop(oldEnemies, function (ent) {
        ent.destroy();
    });
}
export default destroyAIEntities;
