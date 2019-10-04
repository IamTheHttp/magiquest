import tiles from '../../assets/tileSet.png';

let tileSetImage = new Image();
tileSetImage.src = tiles;

import {
  UI_COMP,
  POSITION,
  BACKGROUND_COMP,
  MAP_TILE, CIRCLE
} from 'gameEngine/constants';

// TODO should probably not be here :)
// MOVE to where assets are loaded

import filterOutFarEntities from './utils/filterOutFarEntities';
import GAME_PLATFORM from 'game-platform/dist';


let {Entity, entityLoop} = GAME_PLATFORM;


function getSprite(col, row) {
  return {
    cropStartX: 32 * col, cropStartY: 32 * row, cropSizeX: 32, cropSizeY: 32
  };
}

// TODO utility crops, move to somewhere useful
// TODO all these 32s are magical
let grassTile = getSprite(0, 0);
let mountainTile = getSprite(6, 11);
let riverTiles = getSprite(5, 10);
let brownBrickDay = getSprite(17, 2);
let brownDoorDay = getSprite(15, 20);
let redRoofDay = getSprite(14, 10);
let monument = getSprite(22, 7);

let tileTypes = {
  0: mountainTile,
  1: grassTile,
  2: riverTiles,
  3: brownBrickDay,
  4: brownDoorDay,
  5: redRoofDay,
  6: monument
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
            x: entity[POSITION].x, y: entity[POSITION].y,
            height: entity[POSITION].height, width: entity[POSITION].width,
            ...tileTypes[section.data.tileType],
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