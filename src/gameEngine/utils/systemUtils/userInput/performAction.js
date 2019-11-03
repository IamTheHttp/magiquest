import {IS_MOVING_COMP, PLAYER_CONTROLLED_COMP, POSITION_COMP} from 'components/ComponentNamesConfig';
import {getTileIdxByEnt} from 'utils/componentUtils/tileUtils/getTileIdx';


import {DIRECTIONS} from 'gameConstants';
import IsAttackingComp from 'components/IsAttacking';
import entityLoop from 'game-platform/src/lib/ECS/util/entityLoop';
import Dialog from 'components/Dialog';
import {pushTrigger, Trigger} from 'systems/triggerSystem';

function performAction(systemArguments, action) {
  let {tileIdxMap, Entity, levelArea} = systemArguments;
  let entity = Entity.getByComps(PLAYER_CONTROLLED_COMP)[0];
  let curOrientation = entity[POSITION_COMP].orientation;

  // tile to perform action on...
  let tileIdx = getTileIdxByEnt(entity);
  let row = +tileIdx.split('-')[0];
  let col = +tileIdx.split('-')[1];

  if (curOrientation === DIRECTIONS.LEFT) {
    col -= 1;
  }

  if (curOrientation === DIRECTIONS.RIGHT) {
    col += 1;
  }

  if (curOrientation === DIRECTIONS.UP) {
    row -= 1;
  }

  if (curOrientation === DIRECTIONS.DOWN) {
    row += 1;
  }

  let targetIdx = `${row}-${col}`;
  /**
   * @type {IndexedTile}
   */
  let targetTile = tileIdxMap[targetIdx];

  // ensure we're not out of bounds (and we target a real tile)
  if (targetTile) {
    let targetEntities = targetTile.entities;

    // For each target entity...
    entityLoop(targetEntities,
      /** @param {BaseEntity} targetEnt */
      (targetEnt) => {
        // try to attack
        if (targetEnt.isAttackable() && targetTile && !entity.isAttacking()) {
          entity.addComponent(new IsAttackingComp(targetTile));
        } else {
          // try to activate a trigger
          let triggers = levelArea.triggers.actOnEntity[targetEnt.name] || [];

          // activate all triggers related to acting on this entity
          for (let i = 0; i < triggers.length; i++) {
            let trigger = triggers[i];

            if (trigger.type === 'dialog') {
              pushTrigger(new Trigger({
                type: 'dialog',
                lines: trigger.lines,
                actedOnEntity: targetEnt
              }));
            }
          }
        }
      }
    );
  }
}


export default performAction;