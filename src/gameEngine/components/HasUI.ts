import {UI} from './_ComponentNames';
import assertType from 'gameEngine/utils/assertType';
import {IUISection} from '../../interfaces/IGeneral';

/**
 * This Component is required for an entity to be rendered.
 * Removing the UI Component is one way to make an entity transparent
 */
class HasUI {
  name: string;
  sections: IUISection[];

  constructor(sections: IUISection[] = []) {
    this.name = UI;

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

export default HasUI;
