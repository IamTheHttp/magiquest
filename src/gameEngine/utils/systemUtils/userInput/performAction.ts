import {PLAYER_CONTROLLED, POSITION} from 'gameEngine/components/_ComponentNames';
import {getTileIdxByEnt} from 'gameEngine/utils/componentUtils/tileUtils/tileIdxUtils';
import IsAttackingComp from 'gameEngine/components/Attacking';
import {pushTrigger, DialogTrigger} from 'gameEngine/systems/triggerSystem';
import {ISystemArguments} from '../../../../interfaces/IGameLoop';
import {entityLoop} from 'game-platform';
import {IEntityMap} from 'game-platform/dist/lib/interfaces';
import FamNPC from '../../../entities/placeableEntities/FamNPC';
import {BaseEntity} from '../../../BaseEntity';
import IndexedTile from '../../../classes/IndexedTile';
import {InteractWithNPC} from '../../../classes/GameEvents';
import {isNonEmptyArray} from '../../../systems/portalSystem';
import {IAction} from '../../../../interfaces/IGeneral';

function getEntitiesInTargetTile(systemArguments: ISystemArguments): {
  targetTile: IndexedTile;
  targetEntities: IEntityMap<BaseEntity>;
} {
  const {indexedTileMap, Entity, zone} = systemArguments;
  const entity = Entity.getByComp<BaseEntity>(PLAYER_CONTROLLED)[0];

  const curOrientation = entity[POSITION].orientation;

  // tile to perform action on...
  const tileIdx = getTileIdxByEnt(entity);
  let col = +tileIdx.split(',')[0]; // TODO move to util to abstract the comma
  let row = +tileIdx.split(',')[1]; // TODO move to util to abstract the comma

  if (curOrientation === 'LEFT') {
    col -= 1;
  }

  if (curOrientation === 'RIGHT') {
    col += 1;
  }

  if (curOrientation === 'UP') {
    row -= 1;
  }

  if (curOrientation === 'DOWN') {
    row += 1;
  }

  const targetIdx = `${col},${row}`; // TODO move to util to abstract the comma
  /**
   * @type {IndexedTile}
   */
  const targetTile = indexedTileMap[targetIdx];

  const entities = (targetTile && targetTile.entities) || [];
  return {
    targetTile,
    targetEntities: entities
  };
}

function performAction(systemArguments: ISystemArguments, action: IAction) {
  const {targetEntities, targetTile} = getEntitiesInTargetTile(systemArguments);
  const {Entity, zone, gameEvents} = systemArguments;
  const player = Entity.getByComp<BaseEntity>(PLAYER_CONTROLLED)[0];

  entityLoop(targetEntities, (targetEnt) => {
    // try to attack
    if (targetEnt.isAttackable() && targetTile && !player.isAttacking()) {
      player.addComponent(new IsAttackingComp(targetTile));
    } else {
      // try to activate a trigger
      const triggers = zone.triggers.actOnEntity[targetEnt.name];

      if (targetEnt instanceof FamNPC) {
        gameEvents.pushEvent(new InteractWithNPC(targetEnt));
      }

      // TODO should the trigger system listen to Game Events?
      if (isNonEmptyArray(triggers)) {
        // activate all triggers related to acting on this entity
        for (let i = 0; i < triggers.length; i++) {
          const trigger = triggers[i];

          if (trigger.type === 'dialog') {
            pushTrigger(
              new DialogTrigger({
                type: 'dialog',
                oneOff: trigger.oneOff,
                lines: trigger.lines,
                actedOnEntity: targetEnt
              })
            );
          }
        }
        return;
      }
    }
  });
}

export default performAction;
