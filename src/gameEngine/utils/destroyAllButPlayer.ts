import {AI_CONTROLLED_COMP, PLAYER_CONTROLLED_COMP, POSITION_COMP} from 'gameEngine/components/ComponentNamesConfig';
import GAME_PLATFORM from 'game-platform';
import {Entity} from 'gameEngine/BaseEntity';
let {entityLoop} = GAME_PLATFORM;

function destroyAllButPlayer() {
  let player = Entity.getByComp(PLAYER_CONTROLLED_COMP)[0];
  let allEnts = Entity.getByComp(POSITION_COMP);
  entityLoop(allEnts, (ent) => {
    if (ent !== player) {
      ent.destroy();
    }
  });
}

export default destroyAllButPlayer;