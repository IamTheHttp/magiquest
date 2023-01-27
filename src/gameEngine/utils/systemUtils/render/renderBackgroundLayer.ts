import {BACKGROUND, POSITION} from '../../../components/_ComponentNames';
import filterOutFarEntities from '../filterOutFarEntities';
import {PossibleUIShapes} from 'gameEngine/gameConstants';
import {ISystemArguments} from '../../../../interfaces/IGameLoop';
import {BaseEntity} from '../../../BaseEntity';

import {mapTileTypeToSprite} from '../../../getSprites';

function renderBackgroundLayer(systemArguments: ISystemArguments) {
  let {mapAPI, Entity, SPRITES} = systemArguments;
  let allBackgroundEnts = Entity.getByComps<BaseEntity>([BACKGROUND]);
  let closeBackgroundEnts = filterOutFarEntities(systemArguments, allBackgroundEnts);

  for (let i = 0; i < closeBackgroundEnts.length; i++) {
    let entity = closeBackgroundEnts[i];
    entity[BACKGROUND].sections.forEach((section) => {
      if (section.shape === PossibleUIShapes.MAP_TILE_SHAPE) {
        // tile type
        mapAPI.drawImage({
          id: `${entity.id}-${i}`,
          x: entity[POSITION].x,
          y: entity[POSITION].y,
          height: entity[POSITION].height,
          width: entity[POSITION].width,
          ...mapTileTypeToSprite(section.data.tileType, SPRITES),
          rotation: 0, // in radians
          layerName: 'background'
        });
      }
    });
  }
}

export default renderBackgroundLayer;
