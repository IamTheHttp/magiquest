import {BACKGROUND_COMP} from 'components/ComponentNamesConfig';
import entityLoop from 'game-platform/src/lib/ECS/util/entityLoop';
import {Entity} from 'BaseEntity';

function destroyBackgroundEntities() {
  let oldTiles = Entity.getByComps(BACKGROUND_COMP);
  entityLoop(oldTiles, (ent) => {
    ent.destroy();
  });
}

export default destroyBackgroundEntities;