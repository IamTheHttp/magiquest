import {ISystemArguments} from '../../../../../interfaces/IGameLoop';

/**
 * This function gets the absolute position relative to the viewSize (provided by systemArguments)
 * The function takes into account panning, x, height and width.
 * @param systemArguments
 * @param x
 * @param y
 * @param width
 * @param height
 */
export function getFixedPositionRelativeToViewport(
  systemArguments: ISystemArguments,
  {x, y, width, height}: {x: number; y: number; width: number; height: number}
) {
  const {mapAPI, viewSize} = systemArguments;
  const {panX, panY} = mapAPI.getCurrentPanValue();
  const viewportAbsX = x > 0 ? -panX + x : -panX + viewSize.viewWidth - width - -x; // flip X as its negative
  const viewportAbsY = y > 0 ? -panY + y : -panY + viewSize.viewHeight - height - -y; // flip Y as its negative

  return {
    viewportAbsX,
    viewportAbsY
  };
}
