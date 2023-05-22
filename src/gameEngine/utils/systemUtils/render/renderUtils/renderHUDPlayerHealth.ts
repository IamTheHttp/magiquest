import {ISystemArguments} from '../../../../../interfaces/IGameLoop';
import Player from '../../../../entities/placeableEntities/Player';
import {HUD_PADDING_LEFT_RIGHT, HUD_PADDING_TOP_BOTTOM} from '../../../../gameConstants';
import {getFixedPositionRelativeToViewport} from './getFixedPositionRelativeToViewport';

/**
 * Renders the health bar on the HUD, as a percent of the player's health
 * @param systemArguments
 * @param player
 */
export function renderHUDPlayerHealth(systemArguments: ISystemArguments, player: Player) {
  const {mapAPI, viewSize} = systemArguments;
  const {panX, panY} = mapAPI.getCurrentPanValue();

  const width = 100;
  const height = 20;

  const HEALTH_LINE_WIDTH = 1;
  const WIDTH_WITHOUT_BORDER = width - HEALTH_LINE_WIDTH * 2;
  const HEIGHT_WITHOUT_BORDER = height - HEALTH_LINE_WIDTH * 2;

  const {viewportAbsX, viewportAbsY} = getFixedPositionRelativeToViewport(systemArguments, {
    width: 100,
    height: 20,
    x: -HUD_PADDING_LEFT_RIGHT,
    y: HUD_PADDING_TOP_BOTTOM
  });

  // calculate the fill width as percent of player health
  const CALC_HEALTH_BAR_FILL_WIDTH = (player.HEALTH.current / player.HEALTH.max) * WIDTH_WITHOUT_BORDER;

  // Draw border
  mapAPI.drawRect({
    id: 'health-border',
    x: viewportAbsX,
    y: viewportAbsY,
    strokeStyle: 'red',
    lineWidth: HEALTH_LINE_WIDTH,
    width,
    height
  });

  const absFill = getFixedPositionRelativeToViewport(systemArguments, {
    width: WIDTH_WITHOUT_BORDER,
    height: HEIGHT_WITHOUT_BORDER,
    x: -(HUD_PADDING_LEFT_RIGHT + HEALTH_LINE_WIDTH),
    y: HUD_PADDING_TOP_BOTTOM + HEALTH_LINE_WIDTH
  });

  // Draw fill
  mapAPI.drawRect({
    id: 'health-fill',
    x: absFill.viewportAbsX,
    y: absFill.viewportAbsY,
    strokeStyle: 'transparent',
    fillColor: 'maroon',
    width: CALC_HEALTH_BAR_FILL_WIDTH,
    height: HEIGHT_WITHOUT_BORDER
  });
}
