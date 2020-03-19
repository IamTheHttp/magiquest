import {PLAYER_CONTROLLED_COMP} from '../../../components/ComponentNamesConfig';
import BaseEntity from "BaseEntity";
import {ISystemArguments} from "../../../../interfaces/gameloop.i";
import {IAction} from "../../../../interfaces/interfaces";

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