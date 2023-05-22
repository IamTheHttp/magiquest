import {DIALOG} from 'gameEngine/components/_ComponentNames';
import {ISystemArguments} from '../../../../../interfaces/IGameLoop';
import {BaseEntity} from '../../../../BaseEntity';

function renderDialog(systemArguments: ISystemArguments, entity: BaseEntity) {
  const {mapAPI, viewSize} = systemArguments;

  const {panY, panX} = mapAPI.getCurrentPanValue();
  const width = 250;
  const x = viewSize.viewWidth - width - panX;
  const y = -panY;

  mapAPI.drawTextBubble({
    id: 'someText',
    x,
    y,
    text: `${entity[DIALOG].speaker}:\n${entity[DIALOG].text}`,
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
