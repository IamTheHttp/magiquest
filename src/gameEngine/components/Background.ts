import {BACKGROUND} from './_ComponentNames';
import {IUISection} from '../../interfaces/IGeneral';
import HasUI from './HasUI';

/**
 * This extension to the UIComponent allows separation between Front UI Entities (like characters)
 * and Background Entities (Such as Tiles on the map)
 *
 * With this class we can easily select BACKGROUND_COMP vs UI_COMP entities
 */
class Background extends HasUI {
  constructor(sections: IUISection[] = []) {
    super(sections);
    this.name = BACKGROUND;
  }
}

export default Background;
