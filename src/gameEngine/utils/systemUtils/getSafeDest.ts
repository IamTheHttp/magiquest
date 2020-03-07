import {bit} from 'gameEngine/config';
import {ICoordinates} from "game-platform/types/lib/interfaces";

function getSafeDest(destX: number, destY: number, mapWidth: number, mapHeight:number): ICoordinates {
  let marginFromSides = bit / 2;
  
  // 0 is minY and minX for the map
  return {
    x: Math.max(Math.min(destX, mapWidth - marginFromSides), 0, marginFromSides),
    y: Math.max(Math.min(destY, mapHeight - marginFromSides), 0, marginFromSides)
  };
}

export default getSafeDest;