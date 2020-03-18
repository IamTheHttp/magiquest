import {DEATH_PROCESS_COMP, KILL_QUEST_DATA_COMP, SPAWNED_COMP} from '../components/ComponentNamesConfig';
import GAME_PLATFORM from 'game-platform';
import {ISystemArguments} from "../../interfaces/gameloop.i";
import BaseEntity from "BaseEntity";
import {KillQuest} from "entities/Quest";
import {AllowedQuestState} from "components/QuestDataComponent";

let {entityLoop} = GAME_PLATFORM;

function deathProcessSystem(systemArguments: ISystemArguments) {
  let {Entity} = systemArguments;
  let entities = Entity.getByComps([DEATH_PROCESS_COMP]);
  let quests = Entity.getByComps([KILL_QUEST_DATA_COMP]) as KillQuest[];

  entityLoop(entities, (entity: BaseEntity) => {
    quests.forEach((quest) => {
      let locationID = entity[SPAWNED_COMP].spawningTileLocationID;

      if (quest.getState() === AllowedQuestState.IN_PROGRESS) {
        if (locationID === quest[KILL_QUEST_DATA_COMP].data.kill.location) {
          quest[KILL_QUEST_DATA_COMP].data.kill.killed++;

          if (quest.isPostReqComplete()) {
            quest.setState(AllowedQuestState.DONE);
          }
        }
      }
    });

    // destroy entity
    entity.destroy();
  });
}

export default deathProcessSystem;