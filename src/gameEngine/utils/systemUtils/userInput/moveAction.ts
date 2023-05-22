import {PLAYER_CONTROLLED} from '../../../components/_ComponentNames';
import {ISystemArguments} from '../../../../interfaces/IGameLoop';
import {IAction} from '../../../../interfaces/IGeneral';
import {BaseEntity} from '../../../BaseEntity';

function moveAction(systemArguments: ISystemArguments, action: IAction) {
  const {Entity} = systemArguments;
  const {direction} = action;
  const ent = Entity.getByComp<BaseEntity>(PLAYER_CONTROLLED)[0];

  if (typeof direction !== 'undefined' && direction !== null) {
    ent.setMoveDirection(direction);
  } else {
    ent.removeDirection();
  }
}

export default moveAction;
