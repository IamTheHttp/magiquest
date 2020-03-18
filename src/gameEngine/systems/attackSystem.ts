import GAME_PLATFORM from 'game-platform';
import {
  ATTACK_COMP, DEATH_PROCESS_COMP, HEALTH_COMP, IS_ATTACKING_COMP
} from '../components/ComponentNamesConfig';
import ShockWave from 'gameEngine/entities/ShockWave';
import { getTileIdxByEnt } from 'gameEngine/utils/componentUtils/tileUtils/getTileIdx';
import {ISystemArguments} from "../../interfaces/gameloop.i";
import BaseEntity from "BaseEntity";
import DeathProcessComp from "components/DeathProcessComp";

let { Entity, entityLoop } = GAME_PLATFORM;

function attackSystem(systemArguments: ISystemArguments) {
  let entities = Entity.getByComps([IS_ATTACKING_COMP, ATTACK_COMP]);
  if (entities.length) {
    entityLoop(entities, (entity: BaseEntity) => {
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

        let entTarget = targetTile.entities[entID] as BaseEntity;

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
          entTarget.addComponent(new DeathProcessComp());
          // entTarget.destroy();
        }
      }

      entity[IS_ATTACKING_COMP].currentFrame++;
    });
  }
}

export default attackSystem;


