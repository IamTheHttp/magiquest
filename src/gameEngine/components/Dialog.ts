import {DIALOG_COMP} from './ComponentNamesConfig';

class Dialog {
  name:string;
  text:string;
  constructor(text) {
    this.name = DIALOG_COMP;
    this.text = `${text}\n\n\nPress space to continue ...`;
  }
}

export default Dialog;