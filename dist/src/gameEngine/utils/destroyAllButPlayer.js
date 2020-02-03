import { PLAYER_CONTROLLED_COMP, POSITION_COMP } from 'gameEngine/components/ComponentNamesConfig';
import entityLoop from 'game-platform/src/lib/ECS/util/entityLoop';
import { Entity } from 'gameEngine/BaseEntity';
function destroyAllButPlayer() {
    var player = Entity.getByComps(PLAYER_CONTROLLED_COMP)[0];
    var allEnts = Entity.getByComps(POSITION_COMP);
    entityLoop(allEnts, function (ent) {
        if (ent !== player) {
            ent.destroy();
        }
    });
}
export default destroyAllButPlayer;
