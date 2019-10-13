import {BACKGROUND_COMP, POSITION_COMP} from '../../../components/ComponentNamesConfig';
import {MAP_TILE_SHAPE} from '../../../constants';
import {tileTypes} from 'gameEngine/config';
function renderBackgroundLayer(systemArguments, closeBackgroundEnts) {
  let {mapAPI, tileSetImage} = systemArguments;
  
  for (let i = 0; i < closeBackgroundEnts.length; i++) {
    let entity = closeBackgroundEnts[i];
    
    entity[BACKGROUND_COMP].sections.forEach((section) => {
      if (section.shape === MAP_TILE_SHAPE) {
        // tile type
        mapAPI.addImage(
          {
            id: `${entity.id}-${i}`,
            image: tileSetImage,
            x: entity[POSITION_COMP].x, y: entity[POSITION_COMP].y,
            height: entity[POSITION_COMP].height, width: entity[POSITION_COMP].width,
            ...tileTypes[section.data.tileType],
            rotation: 0 // in radians
          },
          'background'
        );
      }
    });
  }
}


export default renderBackgroundLayer;