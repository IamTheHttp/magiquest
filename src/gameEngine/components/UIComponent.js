import {UI_COMP} from './ComponentNamesConfig';
import assertType from 'utils/assertType';

class UIComponent {
  constructor(sections) {
    this.name = UI_COMP;
    
    let sectionsArray = Array.isArray(sections) ? sections : [sections];
    
    this.sections = sectionsArray.map((section) => {
      // if it's an object, great, we're done.
      if (typeof section === 'object') {
        assertType(section.name, 'section.name', 'string');
        return section;
      } else {
        // if it's a string, make it an object..
        return {
          name: section,
          data: {}
        };
      }
    });
  }
}

export default UIComponent;