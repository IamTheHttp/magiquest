import GAME_PLATFORM from 'game-platform/dist';
import { ATTACK_COMP, HEALTH_COMP, IS_ATTACKING_COMP } from '../components/ComponentNamesConfig';
import ShockWave from 'gameEngine/entities/ShockWave';
import { getTileIdxByEnt } from 'gameEngine/utils/componentUtils/tileUtils/getTileIdx';
var Entity = GAME_PLATFORM.Entity, entityLoop = GAME_PLATFORM.entityLoop;
function attackSystem(systemArguments) {
    var entities = Entity.getByComps([IS_ATTACKING_COMP, ATTACK_COMP]);
    if (entities.length) {
        entityLoop(entities, function (entity) {
            var dmg = entity[ATTACK_COMP].damage;
            var coolDownFrames = entity[ATTACK_COMP].cooldownFrames;
            var targetTile = entity[IS_ATTACKING_COMP].targetTile;
            var currentFrame = entity[IS_ATTACKING_COMP].currentFrame;
            if (currentFrame === coolDownFrames) {
                entity.removeComponent(IS_ATTACKING_COMP);
                return;
            }
            if (currentFrame > 0) {
                entity[IS_ATTACKING_COMP].currentFrame++;
                return;
            }
            if (targetTile.getEntCount() === 0) {
                entity.removeComponent(IS_ATTACKING_COMP);
                return;
            }
            for (var entID in targetTile.entities) {
                if (entity === targetTile.entities[entID]) {
                    continue; // cannot attack self.
                }
                /**
                 * @type {BaseEntity}
                 */
                var entTarget = targetTile.entities[entID];
                // do the attack
                entTarget[HEALTH_COMP].current -= dmg;
                new ShockWave({
                    x: entity.getPos().x,
                    y: entity.getPos().y,
                    fromTileIdx: getTileIdxByEnt(entity),
                    toTileIdx: targetTile.idx
                });
                // remove dead entities
                if (entTarget[HEALTH_COMP].current <= 0) {
                    // remove the entity from the tile...
                    targetTile.removeEnt(entTarget);
                    entTarget.destroy();
                }
            }
            entity[IS_ATTACKING_COMP].currentFrame++;
        });
    }
}
export default attackSystem;
