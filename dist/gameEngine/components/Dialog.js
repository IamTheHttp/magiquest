import { DIALOG_COMP } from './ComponentNamesConfig';
var Dialog = /** @class */ (function () {
    function Dialog(text) {
        this.name = DIALOG_COMP;
        this.text = text + "\n\n\nPress space to continue ...";
    }
    return Dialog;
}());
export default Dialog;
