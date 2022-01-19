import {BACKGROUND_COMP, POSITION_COMP} from '../../../components/ComponentNamesConfig';
import filterOutFarEntities from '../filterOutFarEntities';
import {AllowedUIShapes} from 'gameEngine/gameConstants';
import {ISystemArguments} from '../../../../interfaces/gameloop.i';
import {BaseEntity} from '../../../BaseEntity';
import {TILE_TYPES} from '../../../createEntitySprites';

function renderBackgroundLayer(systemArguments: ISystemArguments) {
  let {mapAPI, tileSetSprite, Entity} = systemArguments;
  let allBackgroundEnts = Entity.getByComps<BaseEntity>([BACKGROUND_COMP]);
  let closeBackgroundEnts = filterOutFarEntities(systemArguments, allBackgroundEnts);

  for (let i = 0; i < closeBackgroundEnts.length; i++) {
    let entity = closeBackgroundEnts[i];
    entity[BACKGROUND_COMP].sections.forEach((section) => {
      if (section.shape === AllowedUIShapes.MAP_TILE_SHAPE) {
        // tile type
        mapAPI.drawImage({
          id: `${entity.id}-${i}`,
          image: tileSetSprite,
          x: entity[POSITION_COMP].x,
          y: entity[POSITION_COMP].y,
          height: entity[POSITION_COMP].height,
          width: entity[POSITION_COMP].width,
          ...TILE_TYPES[section.data.tileType],
          rotation: 0, // in radians
          layerName: 'background'
        });
      }
    });
  }
}

export default renderBackgroundLayer;
