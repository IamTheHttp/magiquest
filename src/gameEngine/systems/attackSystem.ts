import {CAN_ATTACK, HEALTH_COMP, IS_ATTACKING_COMP, PLAYER_CONTROLLED_COMP} from '../components/_ComponentNamesConfig';
import ShockWave from 'gameEngine/entities/ShockWave';
import {getTileIdxByEnt} from 'gameEngine/utils/componentUtils/tileUtils/tileIdxUtils';
import {ISystemArguments} from '../../interfaces/IGameLoop';
import {Entity, entityLoop} from 'game-platform';
import {PlayerIsAttacked} from '../classes/GameEvents';
import Player from '../entities/placeableEntities/Player';
import {BaseEntity} from '../BaseEntity';
import PlaceableEntity from '../entities/placeableEntities/PlaceableEntity';

function attackSystem(systemArguments: ISystemArguments) {
  let {gameEvents} = systemArguments;
  let entities = Entity.getByComps<BaseEntity>([IS_ATTACKING_COMP, CAN_ATTACK]);
  if (entities.length) {
    entityLoop(entities, (entity) => {
      let dmg = entity[CAN_ATTACK].damage;
      let coolDownFrames = entity[CAN_ATTACK].cooldownFrames;
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
        if (entity === targetTile.entities[entID] || !targetTile.entities[entID][HEALTH_COMP]) {
          continue; // cannot attack self, or anything without health
        }

        let entTarget = targetTile.entities[entID] as PlaceableEntity;

        // do the attack, ensure health is >= 0
        entTarget[HEALTH_COMP].current -= dmg;
        entTarget[HEALTH_COMP].current = Math.max(entTarget[HEALTH_COMP].current, 0);

        if (entTarget[PLAYER_CONTROLLED_COMP]) {
          gameEvents.pushEvent(new PlayerIsAttacked(entTarget as Player));
        }

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

          // We can't destroy the entity here, because we need the information in following systems (Like experience)
          // What we'll do is store the would-be-destroyed entities in memory to be processed later in the same tick
          systemArguments.destroyedPlaceableEntities.push(entTarget);
        }
      }

      entity[IS_ATTACKING_COMP].currentFrame++;
    });
  }
}

export default attackSystem;
