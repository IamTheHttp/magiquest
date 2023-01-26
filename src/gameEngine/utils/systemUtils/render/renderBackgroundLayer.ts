import {BACKGROUND_COMP, POSITION_COMP} from '../../../components/_ComponentNamesConfig';
import filterOutFarEntities from '../filterOutFarEntities';
import {PossibleUIShapes} from 'gameEngine/gameConstants';
import {ISystemArguments} from '../../../../interfaces/IGameLoop';
import {BaseEntity} from '../../../BaseEntity';

import {mapTileTypeToSprite} from '../../../getSprites';

function renderBackgroundLayer(systemArguments: ISystemArguments) {
  let {mapAPI, Entity, SPRITES} = systemArguments;
  let allBackgroundEnts = Entity.getByComps<BaseEntity>([BACKGROUND_COMP]);
  let closeBackgroundEnts = filterOutFarEntities(systemArguments, allBackgroundEnts);

  for (let i = 0; i < closeBackgroundEnts.length; i++) {
    let entity = closeBackgroundEnts[i];
    entity[BACKGROUND_COMP].sections.forEach((section) => {
      if (section.shape === PossibleUIShapes.MAP_TILE_SHAPE) {
        // tile type
        mapAPI.drawImage({
          id: `${entity.id}-${i}`,
          x: entity[POSITION_COMP].x,
          y: entity[POSITION_COMP].y,
          height: entity[POSITION_COMP].height,
          width: entity[POSITION_COMP].width,
          ...mapTileTypeToSprite(section.data.tileType, SPRITES),
          rotation: 0, // in radians
          layerName: 'background'
        });
      }
    });
  }
}

export default renderBackgroundLayer;
