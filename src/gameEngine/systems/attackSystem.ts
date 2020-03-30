import GAME_PLATFORM from 'game-platform';
import {
  ATTACK_COMP, HEALTH_COMP, IS_ATTACKING_COMP
} from '../components/ComponentNamesConfig';
import ShockWave from 'gameEngine/entities/ShockWave';
import { getTileIdxByEnt } from 'gameEngine/utils/componentUtils/tileUtils/getTileIdx';
import {ISystemArguments} from "../../interfaces/gameloop.i";
import BaseEntity from "BaseEntity";
import {EnemyKilledEvent} from "classes/GameEvents";
import Character from "gameEngine/entities/characters/Character";

let { Entity, entityLoop } = GAME_PLATFORM;

function attackSystem(systemArguments: ISystemArguments) {
  let {gameEvents} = systemArguments;
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

        let entTarget = targetTile.entities[entID] as Character;

        // do the attack, ensure health is >= 0
        entTarget[HEALTH_COMP].current -= dmg;
        entTarget[HEALTH_COMP].current = Math.max(entTarget[HEALTH_COMP].current, 0);

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
          gameEvents.pushEvent(new EnemyKilledEvent(entTarget));
        }
      }

      entity[IS_ATTACKING_COMP].currentFrame++;
    });
  }
}

export default attackSystem;


