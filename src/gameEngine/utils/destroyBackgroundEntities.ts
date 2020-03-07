import {BACKGROUND_COMP} from 'gameEngine/components/ComponentNamesConfig';
import GAME_PLATFORM from 'game-platform';
import BaseEntity, {Entity} from 'gameEngine/BaseEntity';
let {entityLoop} = GAME_PLATFORM;
function destroyBackgroundEntities() {
  let oldTiles = Entity.getByComp(BACKGROUND_COMP);
  entityLoop(oldTiles, (entity:BaseEntity) => {
    entity.destroy();
  });
}

export default destroyBackgroundEntities;