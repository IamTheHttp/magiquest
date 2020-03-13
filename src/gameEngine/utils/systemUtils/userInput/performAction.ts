import {IS_MOVING_COMP, PLAYER_CONTROLLED_COMP, POSITION_COMP} from 'gameEngine/components/ComponentNamesConfig';
import {getTileIdxByEnt} from 'gameEngine/utils/componentUtils/tileUtils/getTileIdx';


import {DIRECTIONS, DIRECTIONS_OPTIONS} from 'gameEngine/gameConstants';
import IsAttackingComp from 'gameEngine/components/IsAttacking';
import GAME_PLATFORM from 'game-platform';

let {entityLoop} = GAME_PLATFORM;


import Dialog from 'gameEngine/components/Dialog';
import {pushTrigger, Trigger} from 'gameEngine/systems/triggerSystem';
import {ISystemArguments} from "../../../../interfaces/gameloop.i";
import BaseEntity from "BaseEntity";
import {isNonEmptyArray} from "systems/portalSystem";
import IndexedTile from "classes/IndexedTile";
import {IEntityMap} from "game-platform/types/lib/interfaces";
import Quest from "entities/Quest";
import {AllowedQuestState} from "components/QuestDataComponent";


function getEntitiesInTargetTile(systemArguments: ISystemArguments): { targetTile: IndexedTile, targetEntities: IEntityMap } {
  let {tileIdxMap, Entity, levelArea} = systemArguments;
  let entity = Entity.getByComp(PLAYER_CONTROLLED_COMP)[0] as BaseEntity;

  let curOrientation = entity[POSITION_COMP].orientation;

  // tile to perform action on...
  let tileIdx = getTileIdxByEnt(entity);
  let col = +tileIdx.split('-')[0];
  let row = +tileIdx.split('-')[1];

  if (curOrientation === DIRECTIONS_OPTIONS.LEFT) {
    col -= 1;
  }

  if (curOrientation === DIRECTIONS_OPTIONS.RIGHT) {
    col += 1;
  }

  if (curOrientation === DIRECTIONS_OPTIONS.UP) {
    row -= 1;
  }

  if (curOrientation === DIRECTIONS_OPTIONS.DOWN) {
    row += 1;
  }

  let targetIdx = `${col}-${row}`;
  /**
   * @type {IndexedTile}
   */
  let targetTile = tileIdxMap[targetIdx];

  let entities = targetTile && targetTile.entities || [];
  ;

  return {
    targetTile,
    targetEntities: entities
  }
}


function performAction(systemArguments: ISystemArguments) {
  let {targetEntities, targetTile} = getEntitiesInTargetTile(systemArguments);
  let {Entity, levelArea} = systemArguments;
  let player = Entity.getByComp(PLAYER_CONTROLLED_COMP)[0] as BaseEntity;

  entityLoop(targetEntities, (targetEnt: BaseEntity) => {
      // try to attack
      if (targetEnt.isAttackable() && targetTile && !player.isAttacking()) {
        player.addComponent(new IsAttackingComp(targetTile));
      } else {
        // try to activate a trigger
        let triggers = levelArea.triggers.actOnEntity[targetEnt.name];

        let quests = targetEnt.getQuestsByStatus(AllowedQuestState.AVAILABLE) as Quest[];

        // we can't do everything at once...
        // first tap, takes the quest, then we do the triggers (or the other actions)
        if (isNonEmptyArray(quests)) {
          let quest = quests[0];
          quest.setState(AllowedQuestState.IN_PROGRESS);
        } else if (isNonEmptyArray(triggers)) {
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
    }
  );
}


export default performAction;