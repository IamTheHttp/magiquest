function centerCameraOnEntity(entity, mapAPI, game, viewWidth, viewHeight, mapWidth, mapHeight, force) {
    if (force === void 0) { force = false; }
    var _a = entity.getPos(), x = _a.x, y = _a.y;
    var _b = mapAPI.getPan(), panX = _b.panX, panY = _b.panY;
    var panToX = x < viewWidth / 2 ? panX : -x + viewWidth / 2;
    var panToY = y < viewHeight / 2 ? panY : -y + viewHeight / 2;
    // if we don't need to pan, stop
    if (panX === panToX && panY === panToY && !force) {
        return;
    }
    if (x + viewWidth / 2 > mapWidth) {
        panToX = panX;
    }
    if (y + viewHeight / 2 > mapHeight) {
        panToY = panY;
    }
    game.requestBackgroundRender();
    mapAPI.pan(panToX, panToY);
}
export default centerCameraOnEntity;
