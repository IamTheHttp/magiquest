import getDest from './getDest';

function destReached(ent) {
  let xReached = ent.getPos().x === getDest(ent).x;
  let yReached = ent.getPos().y === getDest(ent).y;
  return xReached && yReached;
}

export default destReached;