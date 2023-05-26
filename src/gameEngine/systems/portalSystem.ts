import {PLAYER_CONTROLLED} from '../components/_ComponentNames';
import {getTileIdxByEnt} from 'gameEngine/utils/componentUtils/tileUtils/tileIdxUtils';
import assertType from 'gameEngine/utils/assertType';
import {ISystemArguments} from '../../interfaces/IGameLoop';
import Player from '../entities/placeableEntities/Player';

export function isNonEmptyArray(x: any) {
  return x && x.length;
}

function portalSystem(systemArguments: ISystemArguments) {
  const {zone, game, Entity} = systemArguments;
  const player = Entity.getByComp<Player>(PLAYER_CONTROLLED)[0];
  const index = getTileIdxByEnt(player);

  assertType(index, 'level index', 'string');

  const triggers = zone.triggers.move[index];

  if (isNonEmptyArray(triggers)) {
    triggers.forEach((trigger) => {
      // TODO This feels counter intuitive, the triggers should be pushed and the trigger system
      //   should decide what to do with active triggers
      if (trigger && trigger.type === 'portal') {
        const {act, chapter} = trigger;
        game.handleZoneChange(act, chapter, trigger.exitTile);
      }
    });
  }
}

export default portalSystem;
