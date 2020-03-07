import {IS_MOVING_COMP, PLAYER_CONTROLLED_COMP} from '../../../components/ComponentNamesConfig';
import {DIRECTIONS} from '../../../gameConstants';
import BaseEntity from "BaseEntity";
import {ISystemArguments} from "../../../../interfaces/gameloop.i";
import {IAction} from "systems/userInputSystem";

function moveAction(systemArguments: ISystemArguments, action: IAction) {
  let {Entity} = systemArguments;
  let {direction} = action;
  let ent = Entity.getByComp(PLAYER_CONTROLLED_COMP)[0] as BaseEntity;

  if (typeof direction !== 'undefined' && direction !== null) {
    ent.setMoveDirection(direction);
  } else {
    ent.removeDirection();
  }
}


export default moveAction;