import {BACKGROUND_COMP} from './ComponentNamesConfig';
import assertType from 'gameEngine/utils/assertType';

class BackgroundComponent {
  name:string;
  sections: Array<any>;
  constructor(sections) {
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
          data: {}
        };
      }
    });
  }
}

export default BackgroundComponent;