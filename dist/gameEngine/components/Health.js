import { HEALTH_COMP } from './ComponentNamesConfig';
var Health = /** @class */ (function () {
    function Health(maxHealth, width, height) {
        this.name = HEALTH_COMP;
        this.max = maxHealth;
        this.current = maxHealth;
        this.width = width;
        this.height = height;
    }
    return Health;
}());
export default Health;
