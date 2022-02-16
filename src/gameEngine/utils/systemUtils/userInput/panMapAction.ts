import {ISystemArguments} from '../../../../interfaces/IGameLoop';
import {IAction} from '../../../../interfaces/IGeneral';
import {DIRECTIONS_OPTIONS} from '../../../gameConstants';

export function panMapAction(systemArguments: ISystemArguments, action: IAction) {
  const currentPanValue = systemArguments.mapAPI.getCurrentPanValue();

  let {direction} = action;

  if (direction === DIRECTIONS_OPTIONS.DOWN) {
    systemArguments.mapAPI.panCamera(currentPanValue.panX, currentPanValue.panY - 32);
  }

  if (direction === DIRECTIONS_OPTIONS.UP) {
    systemArguments.mapAPI.panCamera(currentPanValue.panX, currentPanValue.panY + 32);
  }

  if (direction === DIRECTIONS_OPTIONS.LEFT) {
    systemArguments.mapAPI.panCamera(currentPanValue.panX + 32, currentPanValue.panY);
  }

  if (direction === DIRECTIONS_OPTIONS.RIGHT) {
    systemArguments.mapAPI.panCamera(currentPanValue.panX - 32, currentPanValue.panY);
  }

  systemArguments.game.requestBackgroundRender();
}
