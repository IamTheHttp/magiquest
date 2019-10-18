import {PLAYER_CONTROLLED_COMP} from '../components/ComponentNamesConfig';
import {getTileIdxByEnt} from 'utils/componentUtils/tileUtils/getTileIdx';
import assertType from 'utils/assertType';

function portalSystem(systemArguments) {
  let {levelArea, game, Entity} = systemArguments;
  let player = Entity.getByComps(PLAYER_CONTROLLED_COMP)[0];
  let index = getTileIdxByEnt(player);
  
  assertType(levelArea.portals, 'levelArea.portals', 'object');
  assertType(index, 'level index', 'string');
  
  let portal = levelArea.portals[index];
  
  if (portal) {
    let {level, area} = portal.target;
    game.handleAreaChange(level, area);
  }
}

export default portalSystem;