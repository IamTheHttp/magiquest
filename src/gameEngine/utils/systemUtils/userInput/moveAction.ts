import {PLAYER_CONTROLLED_COMP} from '../../../components/ComponentNamesConfig';
import {ISystemArguments} from '../../../../interfaces/IGameLoop';
import {IAction} from '../../../../interfaces/IGeneral';
import {BaseEntity} from '../../../BaseEntity';

function moveAction(systemArguments: ISystemArguments, action: IAction) {
  let {Entity} = systemArguments;
  let {direction} = action;
  let ent = Entity.getByComp<BaseEntity>(PLAYER_CONTROLLED_COMP)[0];

  if (typeof direction !== 'undefined' && direction !== null) {
    ent.setMoveDirection(direction);
  } else {
    ent.removeDirection();
  }
}

export default moveAction;
