import {BACKGROUND} from 'gameEngine/components/_ComponentNames';
import {Entity, entityLoop} from 'game-platform';
import {BaseEntity} from '../BaseEntity';
function destroyBackgroundEntities() {
  let oldTiles = Entity.getByComp<BaseEntity>(BACKGROUND);
  entityLoop(oldTiles, (entity) => {
    entity.destroy();
  });
}

export default destroyBackgroundEntities;
