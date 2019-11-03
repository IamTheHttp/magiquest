import {DIALOG_COMP} from 'components/ComponentNamesConfig';
import {bit} from 'config';

function renderDialog(systemArguments, entity) {
  let {mapAPI, viewSize} = systemArguments;

  let {panY, panX} = mapAPI.getPan();
  let width = 250;
  let x = viewSize.viewWidth - width - panX;
  let y = - panY;

  mapAPI.writeBubble({
    id: 'someText',
    x,
    y,
    text: `${entity.name}:\n${entity[DIALOG_COMP].text}`,
    backgroundColor: '#b78846',
    borderColor:'#FFFFFF',
    borderWidth: 1,
    fontColor: '#FFFFFF',
    fontSize: 12,
    paddingTop:10,
    width, // auto based on text
    height:100 // auto based on height of text
  });
}

export default renderDialog;