import { POSITION_COMP } from '../../../components/ComponentNamesConfig';
function renderCircle(systemArguments, entity) {
    var mapAPI = systemArguments.mapAPI;
    var _a = entity[POSITION_COMP], curX = _a.x, curY = _a.y, radius = _a.radius;
    mapAPI.addCircle({
        id: "" + entity.id,
        x: curX,
        y: curY,
        radius: radius,
        fillColor: 'red',
        strokeStyle: 'red',
        lineWidth: 1
    });
}
export default renderCircle;
