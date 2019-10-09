import tiles from '../../assets/tileSet.png';

let tileSetImage = new Image();
tileSetImage.src = tiles;


// TODO should probably not be here :)
// MOVE to where assets are loaded

import filterOutFarEntities from './utils/filterOutFarEntities';
import GAME_PLATFORM from 'game-platform/dist';
import {ATTACK_COMP, BACKGROUND_COMP, HEALTH_COMP, POSITION_COMP, UI_COMP} from '../components/ComponentNamesConfig';
import {CIRCLE_SHAPE, DIRECTIONS, HEALTH_BAR_SHAPE, MAP_TILE_SHAPE} from '../constants';
import {bit} from '../config';
import onDirection from '../components/utils/positionUtils/onDirection';


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


/**
 * @param systemArguments
 * @param {Entity[]} closeEnts
 * @return void
 */
function renderMainLayer(systemArguments, closeEnts) {
  let {mapAPI} = systemArguments;
  for (let i = 0; i < closeEnts.length; i++) {
    let entity = closeEnts[i];
    let {x: curX, y: curY, radius, direction: curDirection} = entity[POSITION_COMP];
    
    entity[UI_COMP].sections.forEach((section) => {
      if (section.shape === CIRCLE_SHAPE) {
        // We draw a circle
        mapAPI.addCircle(
          {
            id: `${entity.id}-${i}`,
            x: curX,
            y: curY,
            radius,
            fillColor: 'red',
            strokeStyle: 'red',
            lineWidth: 1
          }
        );
        
        // We set the direction of the circle
        let dirXOffset = 0;
        let dirYOffset = 0;
        
        if (curDirection === DIRECTIONS.LEFT) {
          dirXOffset = -radius;
        }
        
        if (curDirection === DIRECTIONS.RIGHT) {
          dirXOffset = entity[POSITION_COMP].radius;
        }
        
        if (curDirection === DIRECTIONS.UP) {
          dirYOffset = -entity[POSITION_COMP].radius;
        }
        
        if (curDirection === DIRECTIONS.DOWN) {
          dirYOffset = entity[POSITION_COMP].radius;
        }
        
        mapAPI.addCircle(
          {
            id: `${entity.id}-${i}-direction`,
            x: curX + dirXOffset,
            y: curY + dirYOffset,
            radius: 2,
            fillColor: 'white',
            strokeStyle: 'white',
            lineWidth: 1
          }
        );
        
        
        /**
         * @type {AttackComponent}
         */
        let attackComp = entity[ATTACK_COMP];
        let isAnimationStillGoing = attackComp && attackComp.currentFrame < attackComp.animationDuration && attackComp.targetForAnimation;
        
        // TODO - Why only for circle shapes?
        
        // if entity has the attack component, and it has a target for animation....
        // if animation is still not done, draw an animation frame
        if (isAnimationStillGoing) {
          attackComp.currentFrame++;
          
          let animationX = curX;
          let animationY = curY;
          let animSpeed = 2;
          
          onDirection(
            entity,
            () => {
              animationY = curY - attackComp.currentFrame * animSpeed; // 5 == animation speed
            },
            () => {
              animationX = curX + attackComp.currentFrame * animSpeed;
            },
            () => {
              animationY = curY + attackComp.currentFrame * animSpeed;
            },
            () => {
              animationX = curX - attackComp.currentFrame * animSpeed;
            }
          );
          
          mapAPI.addCircle(
            {
              id: `${entity.id}-${i}-direction`,
              x: animationX,
              y: animationY,
              radius: 2,
              fillColor: 'black',
              strokeStyle: 'black',
              lineWidth: 1
            }
          );
        } else {
          if (attackComp) {
            attackComp.currentFrame = 0;
            attackComp.targetForAnimation = null;
          }
        }
        // if (entity[ATTACK_COMP].current < entity[ATTACK_COMP].animationDuration)
        // What animation data do we need?
        // current frame
        // total frame
        // what to do.
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
            lineWidth: 2
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
            lineWidth: 2
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