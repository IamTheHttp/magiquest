import { AI_CONTROLLED_COMP } from 'gameEngine/components/ComponentNamesConfig';
import entityLoop from 'game-platform/src/lib/ECS/util/entityLoop';
import { Entity } from 'gameEngine/BaseEntity';
function destroyAIEntities() {
    var oldEnemies = Entity.getByComps(AI_CONTROLLED_COMP);
    entityLoop(oldEnemies, function (ent) {
        ent.destroy();
    });
}
export default destroyAIEntities;
