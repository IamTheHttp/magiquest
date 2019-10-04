import {TRAVERSABLE_COMP} from '../../ComponentNamesConfig';
import {bit} from '../../../config';

function isTraversable(tileIdx, x, y) {
  // What tile are we going to?
  // easy to calc, no?
  let col = Math.floor(x / bit);
  let row = Math.floor(y / bit);
  
  let tile = tileIdx[`${row}-${col}`]; // TODO, we need a function to properly access the idx
  
  return tile && tile.hasComponents(TRAVERSABLE_COMP);
}

export default isTraversable;