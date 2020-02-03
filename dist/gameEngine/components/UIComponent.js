import { UI_COMP } from './ComponentNamesConfig';
import assertType from 'gameEngine/utils/assertType';
var UIComponent = /** @class */ (function () {
    function UIComponent(sections) {
        if (sections === void 0) { sections = []; }
        this.name = UI_COMP;
        var sectionsArray = Array.isArray(sections) ? sections : [sections];
        this.sections = sectionsArray.map(function (section) {
            // if it's an object, great, we're done.
            if (typeof section === 'object') {
                assertType(section.name, 'section.name', 'string');
                return section;
            }
            else {
                // if it's a string, make it an object..
                return {
                    name: section,
                    data: {}
                };
            }
        });
    }
    return UIComponent;
}());
export default UIComponent;
