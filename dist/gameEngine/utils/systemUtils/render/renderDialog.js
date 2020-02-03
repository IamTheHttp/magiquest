import { DIALOG_COMP } from 'gameEngine/components/ComponentNamesConfig';
function renderDialog(systemArguments, entity) {
    var mapAPI = systemArguments.mapAPI, viewSize = systemArguments.viewSize;
    var _a = mapAPI.getPan(), panY = _a.panY, panX = _a.panX;
    var width = 250;
    var x = viewSize.viewWidth - width - panX;
    var y = -panY;
    mapAPI.writeBubble({
        id: 'someText',
        x: x,
        y: y,
        text: entity.name + ":\n" + entity[DIALOG_COMP].text,
        backgroundColor: '#b78846',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        fontColor: '#FFFFFF',
        fontSize: 12,
        paddingTop: 10,
        width: width,
        height: 100 // auto based on height of text
    });
}
export default renderDialog;
