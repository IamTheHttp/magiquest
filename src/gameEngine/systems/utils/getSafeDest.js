import {bit} from '../../config';

function getSafeDest(destX, destY, mapWidth, mapHeight) {
  let marginFromSides = bit / 2;
  
  // 0 is minY and minX for the map
  return {
    x: Math.max(Math.min(destX, mapWidth - marginFromSides), 0, marginFromSides),
    y: Math.max(Math.min(destY, mapHeight - marginFromSides), 0, marginFromSides)
  };
}

export default getSafeDest;