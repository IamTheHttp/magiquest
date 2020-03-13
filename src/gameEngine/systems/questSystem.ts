import GAME_PLATFORM from 'game-platform';
import {
  POSITION_COMP,
  PLAYER_CONTROLLED_COMP, CAN_ASSIGN_QUESTS_COMP, UI_COMP, HAS_ACTION_SIGN_COMP
} from 'components/ComponentNamesConfig';

import BaseEntity from "BaseEntity";
import {ISystemArguments} from "../../interfaces/gameloop.i";
import {AllowedUIShapes, CANVAS_OUTPUT} from "gameConstants";
import {AllowedQuestState} from "classes/Quest";
import HasActionSignComponent from "components/HasActionSignComponent";

let {Entity, entityLoop} = GAME_PLATFORM;

function questSystem(systemArguments: ISystemArguments) {
  let entities = Entity.getByComps([CAN_ASSIGN_QUESTS_COMP, POSITION_COMP, UI_COMP]);
  let player = Entity.getByComp(PLAYER_CONTROLLED_COMP)[0] as BaseEntity;

  entityLoop(entities, (entity: BaseEntity) => {
    // if we have quests, add a question mark on the entity
    let quests = entity.getQuestsByStatus(AllowedQuestState.AVAILABLE);

    if (entity.getQuestsByStatus(AllowedQuestState.AVAILABLE).length) {
      // We have quests
      if (!entity.hasComponents(HAS_ACTION_SIGN_COMP)) {
        entity.addComponent(new HasActionSignComponent());
      }
    } else {
      entity.removeComponent(HAS_ACTION_SIGN_COMP);
    }
  });
}

export default questSystem;