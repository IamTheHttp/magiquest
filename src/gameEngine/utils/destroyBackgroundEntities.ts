import {BACKGROUND_COMP} from 'gameEngine/components/ComponentNamesConfig';
import entityLoop from 'game-platform/src/lib/ECS/util/entityLoop';
import {Entity} from 'gameEngine/BaseEntity';

function destroyBackgroundEntities() {
  let oldTiles = Entity.getByComps(BACKGROUND_COMP);
  entityLoop(oldTiles, (ent) => {
    ent.destroy();
  });
}

export default destroyBackgroundEntities;