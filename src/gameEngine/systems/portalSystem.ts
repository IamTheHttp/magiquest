import {PLAYER_CONTROLLED_COMP} from '../components/ComponentNamesConfig';
import {getTileIdxByEnt} from 'gameEngine/utils/componentUtils/tileUtils/getTileIdx';
import assertType from 'gameEngine/utils/assertType';
import {ISystemArguments} from "../../interfaces/gameloop.i";
import Player from "../entities/characters/Player";

export function isNonEmptyArray(x: any) {
  return x && x.length;
}

function portalSystem(systemArguments: ISystemArguments) {
  let {levelArea, game, Entity} = systemArguments;
  let player = Entity.getByComp<Player>(PLAYER_CONTROLLED_COMP)[0];
  let index = getTileIdxByEnt(player);

  assertType(index, 'level index', 'string');

  let triggers = levelArea.triggers.move[index];

  if (isNonEmptyArray(triggers)) {
    triggers.forEach((trigger) => {
      // TODO This feels counter intuitive, the triggers should be pushed and the trigger system should decide what to do with active triggers
      if (trigger && trigger.type === 'portal') {
        let {level, area} = trigger;

        game.handleAreaChange(level, area, trigger.exitTile);
      }
    });
  }
}

export default portalSystem;