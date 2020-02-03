var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { CANVAS_OUTPUT, MAP_TILE_SHAPE } from '../gameConstants';
import PositionComponent from '../components/PositionComponent';
import BackgroundComponent from '../components/BackgroundComponent';
import TraversableComponent from '../components/TraversableComponent';
import BaseEntity from '../BaseEntity';
import CanSpawn from 'gameEngine/components/CanSpawn';
var Tile = /** @class */ (function (_super) {
    __extends(Tile, _super);
    function Tile(_a) {
        var x = _a.x, y = _a.y, tileIdx = _a.tileIdx, height = _a.height, width = _a.width, tileType = _a.tileType, _b = _a.spawnableEnemies, spawnableEnemies = _b === void 0 ? [] : _b;
        var _this = _super.call(this, Tile) || this;
        _this.tileIdx = tileIdx;
        _this.addComponent(new PositionComponent({ x: x, y: y, height: height, width: width }));
        // 1 is grass, 7 is road
        // REFACTOR - Seems strange here.. (if type === 1?)
        if (tileType === 1 || tileType === 7 || tileType === 100) {
            _this.addComponent(new TraversableComponent());
            _this.addComponent(new CanSpawn(spawnableEnemies));
        }
        _this.addComponent(new BackgroundComponent([{
                name: CANVAS_OUTPUT,
                shape: MAP_TILE_SHAPE,
                data: {
                    tileType: tileType
                }
            }]));
        return _this;
    }
    return Tile;
}(BaseEntity));
export default Tile;
