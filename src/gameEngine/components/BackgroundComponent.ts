import {BACKGROUND_COMP} from './ComponentNamesConfig';
import assertType from 'gameEngine/utils/assertType';
import {IUISection} from "../../interfaces/interfaces";

class BackgroundComponent {
  name:string;
  sections: IUISection[];
  constructor(sections: IUISection[]) {
    this.name = BACKGROUND_COMP;
  
    let sectionsArray = Array.isArray(sections) ? sections : [sections];
  
    this.sections = sectionsArray.map((section) => {
      // if it's an object, great, we're done.
      if (typeof section === 'object') {
        assertType(section.name, 'section.name', 'string');
        return section;
      } else {
        return {
          name: section,
          shape: null,
          data: {}
        };
      }
    });
  }
}

export default BackgroundComponent;