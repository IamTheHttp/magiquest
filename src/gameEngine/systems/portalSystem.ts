import {PLAYER_CONTROLLED_COMP} from '../components/ComponentNamesConfig';
import {getTileIdxByEnt} from 'gameEngine/utils/componentUtils/tileUtils/getTileIdx';
import assertType from 'gameEngine/utils/assertType';

function portalSystem(systemArguments) {
  let {levelArea, game, Entity} = systemArguments;
  let player = Entity.getByComps(PLAYER_CONTROLLED_COMP)[0];
  let index = getTileIdxByEnt(player);
  
  assertType(index, 'level index', 'string');
  
  let trigger = levelArea.triggers.move[index] || {};

  // TODO This feels counter intuitive, the triggers should be pushed and the trigger system should decide what to do with active triggers
  if (trigger.type === 'portal') {
    let {level, area} = trigger;
    game.handleAreaChange(level, area);
  }
}

export default portalSystem;