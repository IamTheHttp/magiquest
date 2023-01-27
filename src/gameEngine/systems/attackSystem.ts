import {ATTACKER, HEALTH, ATTACKING, PLAYER_CONTROLLED} from '../components/_ComponentNames';
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
  let entities = Entity.getByComps<BaseEntity>([ATTACKING, ATTACKER]);
  if (entities.length) {
    entityLoop(entities, (entity) => {
      let dmg = entity[ATTACKER].damage;
      let coolDownFrames = entity[ATTACKER].cooldownFrames;
      let targetTile = entity[ATTACKING].targetTile;
      let currentFrame = entity[ATTACKING].currentFrame;

      if (currentFrame === coolDownFrames) {
        entity.removeComponent(ATTACKING);
        return;
      }

      if (currentFrame > 0) {
        entity[ATTACKING].currentFrame++;
        return;
      }

      if (targetTile.getEntCount() === 0) {
        entity.removeComponent(ATTACKING);
        return;
      }

      for (let entID in targetTile.entities) {
        if (entity === targetTile.entities[entID] || !targetTile.entities[entID][HEALTH]) {
          continue; // cannot attack self, or anything without health
        }

        let entTarget = targetTile.entities[entID] as PlaceableEntity;

        // do the attack, ensure health is >= 0
        entTarget[HEALTH].current -= dmg;
        entTarget[HEALTH].current = Math.max(entTarget[HEALTH].current, 0);

        if (entTarget[PLAYER_CONTROLLED]) {
          gameEvents.pushEvent(new PlayerIsAttacked(entTarget as Player));
        }

        new ShockWave({
          x: entity.getPos().x,
          y: entity.getPos().y,
          fromTileIdx: getTileIdxByEnt(entity),
          toTileIdx: targetTile.idx
        });

        // remove dead entities
        if (entTarget[HEALTH].current <= 0) {
          // remove the entity from the tile...
          targetTile.removeEnt(entTarget);

          // We can't destroy the entity here, because we need the information in following systems (Like experience)
          // What we'll do is store the would-be-destroyed entities in memory to be processed later in the same tick
          systemArguments.destroyedPlaceableEntities.push(entTarget);
        }
      }

      entity[ATTACKING].currentFrame++;
    });
  }
}

export default attackSystem;
