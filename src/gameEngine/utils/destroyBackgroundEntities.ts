import {HAS_BACKGROUND_UI} from 'gameEngine/components/_ComponentNamesConfig';
import {Entity, entityLoop} from 'game-platform';
import {BaseEntity} from '../BaseEntity';
function destroyBackgroundEntities() {
  let oldTiles = Entity.getByComp<BaseEntity>(HAS_BACKGROUND_UI);
  entityLoop(oldTiles, (entity) => {
    entity.destroy();
  });
}

export default destroyBackgroundEntities;
