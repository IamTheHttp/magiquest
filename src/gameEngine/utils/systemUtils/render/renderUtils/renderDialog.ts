import {DIALOG_COMP} from 'gameEngine/components/_ComponentNamesConfig';
import {ISystemArguments} from '../../../../../interfaces/IGameLoop';
import {BaseEntity} from '../../../../BaseEntity';

function renderDialog(systemArguments: ISystemArguments, entity: BaseEntity) {
  let {mapAPI, viewSize} = systemArguments;

  let {panY, panX} = mapAPI.getCurrentPanValue();
  let width = 250;
  let x = viewSize.viewWidth - width - panX;
  let y = -panY;

  mapAPI.drawTextBubble({
    id: 'someText',
    x,
    y,
    text: `${entity[DIALOG_COMP].speaker}:\n${entity[DIALOG_COMP].text}`,
    backgroundColor: '#b78846',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    fontColor: '#FFFFFF',
    fontSize: 12,
    paddingTop: 10,
    width, // auto based on text
    height: 100 // auto based on height of text
  });
}

export default renderDialog;
