import { BACKGROUND_COMP } from './ComponentNamesConfig';
import assertType from 'gameEngine/utils/assertType';
var BackgroundComponent = /** @class */ (function () {
    function BackgroundComponent(sections) {
        this.name = BACKGROUND_COMP;
        var sectionsArray = Array.isArray(sections) ? sections : [sections];
        this.sections = sectionsArray.map(function (section) {
            // if it's an object, great, we're done.
            if (typeof section === 'object') {
                assertType(section.name, 'section.name', 'string');
                return section;
            }
            else {
                return {
                    name: section,
                    data: {}
                };
            }
        });
    }
    return BackgroundComponent;
}());
export default BackgroundComponent;
