import {BACKGROUND, POSITION} from '../../../components/_ComponentNames';
import filterOutFarEntities from '../filterOutFarEntities';
import {ISystemArguments} from '../../../../interfaces/IGameLoop';
import {BaseEntity} from '../../../BaseEntity';

import {mapTileTypeToSprite} from '../../../getSprites';

function renderBackgroundLayer(systemArguments: ISystemArguments) {
  const {mapAPI, Entity, SPRITES} = systemArguments;
  const allBackgroundEnts = Entity.getByComps<BaseEntity>([BACKGROUND]);
  const closeBackgroundEnts = filterOutFarEntities(systemArguments, allBackgroundEnts);

  for (let i = 0; i < closeBackgroundEnts.length; i++) {
    const entity = closeBackgroundEnts[i];
    entity[BACKGROUND].sections.forEach((section) => {
      if (section.shape === 'MAP_TILE_SHAPE') {
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
