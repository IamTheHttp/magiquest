import {UI_COMP} from 'gameEngine/constants';

class UIComponent {
  constructor(sections) {
    this.name = UI_COMP;
    
    let sectionsArray = Array.isArray(sections) ? sections : [sections];
    
    this.sections = sectionsArray.map((section) => {
      // if it's an object, great, we're done.
      if (typeof section === 'object') {
        // if it doesn't have our expected fields, throw..
        if (!section.name) {
          throw ('Missing field "name" for section in BackgroundComponent');
        }
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