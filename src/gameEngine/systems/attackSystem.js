import GAME_PLATFORM from 'game-platform/dist';
import {
  ATTACK_COMP, HEALTH_COMP, IS_ATTACKING_COMP
} from '../components/ComponentNamesConfig';
import ShockWave from 'gameEngine/entities/ShockWave';
import { getTileIdxByEnt } from 'utils/componentUtils/tileUtils/getTileIdx';

let { Entity, entityLoop } = GAME_PLATFORM;

function attackSystem(systemArguments) {
  let entities = Entity.getByComps([IS_ATTACKING_COMP, ATTACK_COMP]);
  if (entities.length) {
    entityLoop(entities, (entity) => {
      let dmg = entity[ATTACK_COMP].damage;
      let coolDownFrames = entity[ATTACK_COMP].cooldownFrames;
      let targetTile = entity[IS_ATTACKING_COMP].targetTile;
      let currentFrame = entity[IS_ATTACKING_COMP].currentFrame;

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

      for (let entID in targetTile.entities) {
        if (entity === targetTile.entities[entID]) {
          continue; // cannot attack self.
        }
        /**
         * @type {BaseEntity}
         */
        let entTarget = targetTile.entities[entID];

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


