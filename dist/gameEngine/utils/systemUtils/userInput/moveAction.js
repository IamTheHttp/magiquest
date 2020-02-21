import { PLAYER_CONTROLLED_COMP } from '../../../components/ComponentNamesConfig';
function moveAction(systemArguments, action) {
    var Entity = systemArguments.Entity;
    var direction = action.direction;
    var ent = Entity.getByComps(PLAYER_CONTROLLED_COMP)[0];
    if (direction) {
        ent.setMoveDirection(direction);
    }
    else {
        ent.removeDirection();
    }
}
export default moveAction;
