import {ISystemArguments} from '../../../../../interfaces/IGameLoop';
import Player from '../../../../entities/placeableEntities/Player';

export function renderHUDPlayerHealth(systemArguments: ISystemArguments, player: Player) {
  const {mapAPI, viewSize} = systemArguments;
  const {panX, panY} = mapAPI.getCurrentPanValue();

  const HEALTH_LINE_WIDTH = 1;
  const WIDTH = 100;
  const HEIGHT = 20;
  const WIDTH_WITHOUT_BORDER = WIDTH - HEALTH_LINE_WIDTH * 2;
  const HEIGHT_WITHOUT_BORDER = HEIGHT - HEALTH_LINE_WIDTH * 2;

  const Y_PADDING_TOP_FOR_BORDER = 20;
  const Y_PADDING_TOP_FOR_FILL = Y_PADDING_TOP_FOR_BORDER + HEALTH_LINE_WIDTH; // ensure fill is inside the borders

  const X_PADDING_RIGHT = 20;
  const X_PADDING_RIGHT_FOR_FILL = X_PADDING_RIGHT + HEALTH_LINE_WIDTH; // ensure fill is inside the borders

  // calculate the fill width as percent of player health
  const CALC_HEALTH_BAR_FILL_WIDTH = (player['HEALTH'].current / player['HEALTH'].max) * WIDTH_WITHOUT_BORDER;

  // Draw border
  mapAPI.drawRect({
    id: 'health-border',
    x: viewSize.viewWidth - WIDTH - X_PADDING_RIGHT - panX,
    y: Y_PADDING_TOP_FOR_BORDER - panY,
    strokeStyle: 'red',
    lineWidth: HEALTH_LINE_WIDTH,
    width: WIDTH,
    height: HEIGHT
  });

  // Draw fill
  mapAPI.drawRect({
    id: 'health-fill',
    x: viewSize.viewWidth - WIDTH_WITHOUT_BORDER - X_PADDING_RIGHT_FOR_FILL - panX,
    y: Y_PADDING_TOP_FOR_FILL - panY,
    strokeStyle: 'transparent',
    fillColor: 'maroon',
    width: CALC_HEALTH_BAR_FILL_WIDTH,
    height: HEIGHT_WITHOUT_BORDER
  });
}
