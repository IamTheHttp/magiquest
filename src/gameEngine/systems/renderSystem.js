import {
  UI_COMP,
  POSITION,
  BACKGROUND_COMP,
  MAP_TILE, CIRCLE
} from 'gameEngine/constants';

// TODO should probably not be here :)
// MOVE to where assets are loaded
import tiles from '../../assets/tileSet.png';
import filterOutFarEntities from './utils/filterOutFarEntities';
import GAME_PLATFORM from 'game-platform/dist';
let tileSetImage = new Image();
tileSetImage.src = tiles;
let {Entity, entityLoop} = GAME_PLATFORM;


// TODO utility crops, move to somewhere useful
// TODO all these 32s are magical
let grassTile = () => {
  return {
    cropStartX: 0, cropStartY: 0, cropSizeX: 32, cropSizeY: 32
  };
};

let mountainTile = () => {
  // 7 x 12
  return {
    cropStartX: 32 * 6, cropStartY: 32 * 11, cropSizeX: 32, cropSizeY: 32
  };
};

let tileTypes = {
  0: mountainTile,
  1: grassTile
};




function renderBackgroundLayer(systemArguments, closeBackgroundEnts) {
  let {mapAPI} = systemArguments;
  
  for (let i = 0; i < closeBackgroundEnts.length; i++) {
    let entity = closeBackgroundEnts[i];
    
    entity[BACKGROUND_COMP].sections.forEach((section) => {
      if (section.shape === MAP_TILE) {
        // tile type
        mapAPI.addImage(
          {
            id: `${entity.id}-${i}`,
            image: tileSetImage,
            x:entity[POSITION].x, y: entity[POSITION].y,
            height: entity[POSITION].height, width: entity[POSITION].width,
            ...tileTypes[section.data.tileType](),
            rotation: 0 // in radians
          },
          'background'
        );
      }
    });
  }
}

function renderMainLayer(systemArguments, closeEnts) {
  let {mapAPI} = systemArguments;
  for (let i = 0; i < closeEnts.length; i++) {
    let entity = closeEnts[i];
    entity[UI_COMP].sections.forEach((section) => {
      if (section.shape === CIRCLE) {
        // tile type
        mapAPI.addCircle(
          {
            id: `${entity.id}-${i}`,
            image: tileSetImage,
            x: entity[POSITION].x,
            y: entity[POSITION].y,
            radius: entity[POSITION].radius,
            strokeStyle: 'green',
            fillColor: 'red'
          }
        );
      }
    });
  }
}

function renderSystem(systemArguments) {
  let {mapAPI, miniMapAPI, getRenderBackground} = systemArguments;
  // clear everything before we move forward
  mapAPI.clear();
  miniMapAPI.clear();
  
  // render background
  if (getRenderBackground()) {
    mapAPI.clear('background');
    console.log('Rendering background');
    let allBackgroundEnts = Entity.getByComps([BACKGROUND_COMP]); // O1 fetching
    let closeBackgroundEnts = filterOutFarEntities(systemArguments, allBackgroundEnts);
    
    renderBackgroundLayer(systemArguments, closeBackgroundEnts);
    mapAPI.draw('background');
  }
  
  
  // render main...
  
  let allEntsToDraw = Entity.getByComps([UI_COMP]); // O1 fetching
  let closeEnts = filterOutFarEntities(systemArguments, allEntsToDraw);
  
  renderMainLayer(systemArguments, closeEnts);
  mapAPI.draw();
  
  
  
  // renderOnMinimap(allEntsToDraw);
  //
  //
  //
  // // filter out out-of-scope
  //
  // mainLayerRender(systemArguments, mapAPI, miniMapAPI);
  // backgroundLayerRender(systemArguments, mapAPI, miniMapAPI);
}

export default renderSystem;