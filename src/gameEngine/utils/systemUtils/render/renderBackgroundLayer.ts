import {HAS_BACKGROUND_UI, HAS_POSITION} from '../../../components/_ComponentNamesConfig';
import filterOutFarEntities from '../filterOutFarEntities';
import {PossibleUIShapes} from 'gameEngine/gameConstants';
import {ISystemArguments} from '../../../../interfaces/IGameLoop';
import {BaseEntity} from '../../../BaseEntity';

import {mapTileTypeToSprite} from '../../../getSprites';

function renderBackgroundLayer(systemArguments: ISystemArguments) {
  let {mapAPI, Entity, SPRITES} = systemArguments;
  let allBackgroundEnts = Entity.getByComps<BaseEntity>([HAS_BACKGROUND_UI]);
  let closeBackgroundEnts = filterOutFarEntities(systemArguments, allBackgroundEnts);

  for (let i = 0; i < closeBackgroundEnts.length; i++) {
    let entity = closeBackgroundEnts[i];
    entity[HAS_BACKGROUND_UI].sections.forEach((section) => {
      if (section.shape === PossibleUIShapes.MAP_TILE_SHAPE) {
        // tile type
        mapAPI.drawImage({
          id: `${entity.id}-${i}`,
          x: entity[HAS_POSITION].x,
          y: entity[HAS_POSITION].y,
          height: entity[HAS_POSITION].height,
          width: entity[HAS_POSITION].width,
          ...mapTileTypeToSprite(section.data.tileType, SPRITES),
          rotation: 0, // in radians
          layerName: 'background'
        });
      }
    });
  }
}

export default renderBackgroundLayer;
