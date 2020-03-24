import {BACKGROUND_COMP, POSITION_COMP} from '../../../components/ComponentNamesConfig';
import {tileTypes} from 'gameEngine/config';
import filterOutFarEntities from '../filterOutFarEntities';
import {AllowedUIShapes} from 'gameEngine/gameConstants';
import {ISystemArguments} from "../../../../interfaces/gameloop.i";
import BaseEntity from "BaseEntity";


function renderBackgroundLayer(systemArguments: ISystemArguments) {
  let {mapAPI, tileSetSprite, Entity} = systemArguments;
  let allBackgroundEnts = Entity.getByComps([BACKGROUND_COMP]) as BaseEntity[];
  let closeBackgroundEnts = filterOutFarEntities(systemArguments, allBackgroundEnts);

  for (let i = 0; i < closeBackgroundEnts.length; i++) {
    let entity = closeBackgroundEnts[i];
    entity[BACKGROUND_COMP].sections.forEach((section) => {
      if (section.shape === AllowedUIShapes.MAP_TILE_SHAPE) {
        // tile type
        mapAPI.addImage(
          {
            id: `${entity.id}-${i}`,
            image: tileSetSprite,
            x: entity[POSITION_COMP].x, y: entity[POSITION_COMP].y,
            height: entity[POSITION_COMP].height, width: entity[POSITION_COMP].width,
            ...tileTypes[section.data.tileType],
            rotation: 0, // in radians
            layerName: 'background'
          }
        );
      }
    });
  }
}


export default renderBackgroundLayer;