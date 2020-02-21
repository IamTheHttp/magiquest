import { BACKGROUND_COMP } from 'gameEngine/components/ComponentNamesConfig';
import GAME_PLATFORM from 'game-platform/dist';
import { Entity } from 'gameEngine/BaseEntity';
var entityLoop = GAME_PLATFORM.entityLoop;
function destroyBackgroundEntities() {
    var oldTiles = Entity.getByComps(BACKGROUND_COMP);
    entityLoop(oldTiles, function (ent) {
        ent.destroy();
    });
}
export default destroyBackgroundEntities;
