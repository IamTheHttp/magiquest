import { PLAYER_CONTROLLED_COMP, POSITION_COMP } from 'gameEngine/components/ComponentNamesConfig';
import GAME_PLATFORM from 'game-platform/dist';
import { Entity } from 'gameEngine/BaseEntity';
var entityLoop = GAME_PLATFORM.entityLoop;
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
