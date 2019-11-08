import {AI_CONTROLLED_COMP, PLAYER_CONTROLLED_COMP, POSITION_COMP} from 'components/ComponentNamesConfig';
import entityLoop from 'game-platform/src/lib/ECS/util/entityLoop';
import {Entity} from 'BaseEntity';

function destroyAllButPlayer() {
  let player = Entity.getByComps(PLAYER_CONTROLLED_COMP)[0];
  let allEnts = Entity.getByComps(POSITION_COMP);
  entityLoop(allEnts, (ent) => {
    if (ent !== player) {
      ent.destroy();
    }
  });
}

export default destroyAllButPlayer;