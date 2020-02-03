import { POSITION_COMP } from 'gameEngine/components/ComponentNamesConfig';
var PositionComponent = /** @class */ (function () {
    function PositionComponent(_a) {
        var x = _a.x, y = _a.y, _b = _a.radius, radius = _b === void 0 ? -1 : _b, _c = _a.height, height = _c === void 0 ? -1 : _c, _d = _a.width, width = _d === void 0 ? -1 : _d;
        this.name = POSITION_COMP;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.height = height;
        this.width = width;
        this.destY = null;
        this.destX = null;
        this.originX = null;
        this.originY = null;
    }
    return PositionComponent;
}());
export default PositionComponent;
