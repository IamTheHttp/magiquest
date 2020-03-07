import {UI_COMP} from './ComponentNamesConfig';
import assertType from 'gameEngine/utils/assertType';
import {IUISection} from "../../interfaces/interfaces";

class UIComponent {
  name:string;
  sections: IUISection[];// TODO should not be any

  constructor(sections: IUISection[] = []) {
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
          shape: null,
          data: {}
        };
      }
    });
  }
}

export default UIComponent;