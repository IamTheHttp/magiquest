import {ISystemArguments} from '../../../../interfaces/IGameLoop';
import {IAction} from '../../../../interfaces/IGeneral';
import {AllowedActions, DIRECTIONS_OPTIONS, TILE_SIZE} from '../../../gameConstants';

export function panMapInEditorAction(systemArguments: ISystemArguments, action: IAction) {
  const currentPanValue = systemArguments.mapAPI.getCurrentPanValue();
  const MAP_WIDTH = systemArguments.viewSize.mapWidth;
  const MAP_HEIGHT = systemArguments.viewSize.mapHeight;

  const VIEW_WIDTH = systemArguments.viewSize.viewWidth;
  const VIEW_HEIGHT = systemArguments.viewSize.viewHeight;

  if (action.name === AllowedActions.DRAG_PAN_MAP) {
    const pannedDistanceX = action.data.startDragCursorX - action.data.currentCursorX;
    const pannedDistanceY = action.data.startDragCursorY - action.data.currentCursorY;

    let NEW_X = 0;
    NEW_X = Math.min(currentPanValue.panX - pannedDistanceX, TILE_SIZE);
    NEW_X = Math.max(NEW_X, VIEW_WIDTH - MAP_WIDTH - TILE_SIZE);

    let NEW_Y = 0;
    NEW_Y = Math.min(currentPanValue.panY - pannedDistanceY, TILE_SIZE);
    NEW_Y = Math.max(NEW_Y, VIEW_HEIGHT - MAP_HEIGHT - TILE_SIZE);

    systemArguments.mapAPI.panCamera(NEW_X, NEW_Y);
  }

  if (action.name === AllowedActions.MOVE_ACTION) {
    let {direction} = action;

    if (direction === DIRECTIONS_OPTIONS.DOWN) {
      if (MAP_HEIGHT - VIEW_HEIGHT > -currentPanValue.panY - TILE_SIZE) {
        systemArguments.mapAPI.panCamera(currentPanValue.panX, currentPanValue.panY - TILE_SIZE);
      } else {
        // Do nothing, we're out of bounds
      }
    }

    if (direction === DIRECTIONS_OPTIONS.UP) {
      if (currentPanValue.panY < TILE_SIZE) {
        systemArguments.mapAPI.panCamera(currentPanValue.panX, currentPanValue.panY + 32);
      } else {
        // Do not allow panning outside of the map
      }
    }

    if (direction === DIRECTIONS_OPTIONS.LEFT) {
      if (currentPanValue.panX < TILE_SIZE) {
        systemArguments.mapAPI.panCamera(currentPanValue.panX + TILE_SIZE, currentPanValue.panY);
      } else {
        // Do not allow panning outside of the map
      }
    }

    if (direction === DIRECTIONS_OPTIONS.RIGHT) {
      if (MAP_WIDTH - VIEW_WIDTH > -currentPanValue.panX - TILE_SIZE) {
        systemArguments.mapAPI.panCamera(currentPanValue.panX - TILE_SIZE, currentPanValue.panY);
      } else {
        // Do nothing, we're out of bounds
      }
    }
  }

  systemArguments.game.requestBackgroundRender();
}
