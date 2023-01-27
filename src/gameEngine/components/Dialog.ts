import {DIALOG} from './_ComponentNames';

// Used within renderDialog
class Dialog {
  name: string;
  text: string;
  speaker: string;
  constructor(text: string, speaker: string) {
    this.name = DIALOG;
    this.speaker = speaker;
    this.text = `${text}\n\n\nPress space to continue ...`;
  }
}

export default Dialog;
