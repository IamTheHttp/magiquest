import filterOutFarEntities from '../utils/systemUtils/filterOutFarEntities';
import GAME_PLATFORM from 'game-platform/dist';
import {ANIMATION_COMP, BACKGROUND_COMP, PLAYER_CONTROLLED_COMP, UI_COMP} from '../components/ComponentNamesConfig';
import renderBackgroundLayer from '../utils/systemUtils/render/renderBackgroundLayer';
import renderMainLayer from '../utils/systemUtils/render/renderMainLayer';
import {getTileIdxByEnt, getTileIdxByPos} from 'utils/componentUtils/tileUtils/getTileIdx';
import assertType from 'utils/assertType';
let {Entity, entityLoop} = GAME_PLATFORM;


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