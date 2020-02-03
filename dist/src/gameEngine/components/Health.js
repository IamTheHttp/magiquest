import { HEALTH_COMP } from './ComponentNamesConfig';
var Health = /** @class */ (function () {
    function Health(maxHealth) {
        this.name = HEALTH_COMP;
        this.max = maxHealth;
        this.current = maxHealth;
    }
    return Health;
}());
export default Health;
