import GAME_PLATFORM from 'game-platform';
import {
  POSITION_COMP,
  PLAYER_CONTROLLED_COMP, CAN_ASSIGN_QUESTS_COMP, UI_COMP
} from 'components/ComponentNamesConfig';

import BaseEntity from "BaseEntity";
import {ISystemArguments} from "../../interfaces/gameloop.i";
import {AllowedUIShapes, CANVAS_OUTPUT} from "gameConstants";

let { Entity, entityLoop } = GAME_PLATFORM;

function questSystem(systemArguments: ISystemArguments) {
  let entities = Entity.getByComps([CAN_ASSIGN_QUESTS_COMP, POSITION_COMP, UI_COMP]);
  let player = Entity.getByComp(PLAYER_CONTROLLED_COMP)[0] as BaseEntity;

  entityLoop(entities, (entity: BaseEntity) => {
    console.log(entity.getQuests());
    // if we have quests, add a question mark on the entity
    if (entity.getQuests().length) {
      entity[UI_COMP].sections.push({
        name: undefined, // why do we need this?
        shape: AllowedUIShapes.HAS_QUEST_SIGN,
        data: {}
      })
    }
  });
}

export default questSystem;