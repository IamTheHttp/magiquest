import {BACKGROUND_COMP} from 'gameEngine/components/ComponentNamesConfig';
import {Entity, entityLoop} from "game-platform";
import {BaseEntity} from "../BaseEntity";
function destroyBackgroundEntities() {
  let oldTiles = Entity.getByComp<BaseEntity>(BACKGROUND_COMP);
  entityLoop(oldTiles, (entity) => {
    entity.destroy();
  });
}

export default destroyBackgroundEntities;