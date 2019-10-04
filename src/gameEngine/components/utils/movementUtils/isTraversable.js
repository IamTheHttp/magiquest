import {TRAVERSABLE_COMP} from '../../ComponentNamesConfig';

function isTraversable(tileIdx, x, y) {
  // What tile are we going to?
  // easy to calc, no?
  // TODO this 32 should be in a config.. this is a 32BIT game after all..
  let col = Math.floor(x / 32);
  let row = Math.floor(y / 32);
  
  let tile = tileIdx[`${row}-${col}`]; // TODO, we need a function to properly access the idx
  
  return tile && tile.hasComponents(TRAVERSABLE_COMP);
}

export default isTraversable;