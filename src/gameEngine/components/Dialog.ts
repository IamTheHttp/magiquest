import {DIALOG_COMP} from './ComponentNamesConfig';

// Used within renderDialog
class Dialog {
  name: string;
  text: string;
  speaker: string;
  constructor(text: string, speaker: string) {
    this.name = DIALOG_COMP;
    this.speaker = speaker;
    this.text = `${text}\n\n\nPress space to continue ...`;
  }
}

export default Dialog;
