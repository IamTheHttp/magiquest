import tiles from '../../assets/tileSet.png';

let tileSetImage = new Image();
tileSetImage.src = tiles;


// TODO should probably not be here :)
// MOVE to where assets are loaded

import filterOutFarEntities from './utils/filterOutFarEntities';
import GAME_PLATFORM from 'game-platform/dist';
import {BACKGROUND_COMP, HEALTH_COMP, POSITION_COMP, UI_COMP} from '../components/ComponentNamesConfig';
import {CIRCLE_SHAPE, HEALTH_BAR_SHAPE, MAP_TILE_SHAPE} from '../constants';
import {bit} from '../config';




let {Entity, entityLoop} = GAME_PLATFORM;


function getSprite(col, row) {
  return {
    cropStartX: bit * col, cropStartY: bit * row, cropSizeX: bit, cropSizeY: bit
  };
}

// TODO utility crops, move to somewhere useful
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

function renderMainLayer(systemArguments, closeEnts) {
  let {mapAPI} = systemArguments;
  for (let i = 0; i < closeEnts.length; i++) {
    let entity = closeEnts[i];
    entity[UI_COMP].sections.forEach((section) => {
      if (section.shape === CIRCLE_SHAPE) {
        // tile type
        mapAPI.addCircle(
          {
            id: `${entity.id}-${i}`,
            image: tileSetImage,
            x: entity[POSITION_COMP].x,
            y: entity[POSITION_COMP].y,
            radius: entity[POSITION_COMP].radius,
            fillColor: 'red',
            strokeStyle: 'red',
            lineWidth:1
          }
        );
      }
      
      if (section.shape === HEALTH_BAR_SHAPE) {
        let healthWidth = entity[POSITION_COMP].width || entity[POSITION_COMP].radius * 2 || 200;
        let healthMargin = entity[POSITION_COMP].height || entity[POSITION_COMP].radius * 1 + 2 || 200;
        let healthHeight = 2;
        
        
        let healthPercent = entity[HEALTH_COMP].current / entity[HEALTH_COMP].max;
        
        
        mapAPI.addRect(
          {
            id: `${entity.id}-${i}-${HEALTH_BAR_SHAPE}-`,
            image: tileSetImage,
            x: entity[POSITION_COMP].x - healthWidth / 2,
            y: entity[POSITION_COMP].y + healthMargin,
            width: healthWidth,
            height: healthHeight,
            strokeStyle: 'black',
            lineWidth:2
          }
        );
  
        mapAPI.addRect(
          {
            id: `${entity.id}-${i}-${HEALTH_BAR_SHAPE}`,
            image: tileSetImage,
            x: entity[POSITION_COMP].x - healthWidth / 2,
            y: entity[POSITION_COMP].y + healthMargin,
            width: healthWidth * healthPercent,
            height: healthHeight,
            strokeStyle: 'lime',
            lineWidth:2
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