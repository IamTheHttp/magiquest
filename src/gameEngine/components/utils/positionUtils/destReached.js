import getPos from './getPos';
import getDest from './getDest';

function destReached(ent) {
  let xReached = getPos(ent).x === getDest(ent).x;
  let yReached = getPos(ent).y === getDest(ent).y;
  return xReached && yReached;
}

export default destReached;