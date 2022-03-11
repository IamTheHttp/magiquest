import {BACKGROUND_COMP} from './ComponentNamesConfig';
import {IUISection} from '../../interfaces/IGeneral';
import UIComponent from './UIComponent';

/**
 * This extension to the UIComponent allows separation between Front UI Entities (like characters)
 * and Background Entities (Such as Tiles on the map)
 *
 * With this class we can easily select BACKGROUND_COMP vs UI_COMP entities
 */
class BackgroundComponent extends UIComponent {
  constructor(sections: IUISection[] = []) {
    super(sections);
    this.name = BACKGROUND_COMP;
  }
}

export default BackgroundComponent;
