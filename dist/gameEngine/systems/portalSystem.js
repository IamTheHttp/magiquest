import { PLAYER_CONTROLLED_COMP } from '../components/ComponentNamesConfig';
import { getTileIdxByEnt } from 'gameEngine/utils/componentUtils/tileUtils/getTileIdx';
import assertType from 'gameEngine/utils/assertType';
function portalSystem(systemArguments) {
    var levelArea = systemArguments.levelArea, game = systemArguments.game, Entity = systemArguments.Entity;
    var player = Entity.getByComps(PLAYER_CONTROLLED_COMP)[0];
    var index = getTileIdxByEnt(player);
    assertType(index, 'level index', 'string');
    var trigger = levelArea.triggers.move[index] || {};
    // TODO This feels counter intuitive, the triggers should be pushed and the trigger system should decide what to do with active triggers
    if (trigger.type === 'portal') {
        var level = trigger.level, area = trigger.area;
        game.handleAreaChange(level, area);
    }
}
export default portalSystem;
