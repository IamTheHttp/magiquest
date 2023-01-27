import {ATTRIBUTES, SKILLS, EXPERIENCE, PLAYER_CONTROLLED} from 'gameEngine/components/_ComponentNames';
import {ISystemArguments} from '../../../../interfaces/IGameLoop';
import Player from '../../../entities/placeableEntities/Player';
import {IAction} from '../../../../interfaces/IGeneral';
import {AllowedAttributes} from '../../../../data/attributesConfig';
import {BaseEntity} from '../../../BaseEntity';
import {PlayerAttributesChangeEvent} from '../../../classes/GameEvents';

function buyAttr(systemArguments: ISystemArguments, action: IAction) {
  let {Entity, zone, gameEvents} = systemArguments;
  let player = Entity.getByComp<Player>(PLAYER_CONTROLLED)[0];

  // TODO how can we improve type safety here?
  if (action.data && action.data.attrID) {
    let attrID = action.data.attrID as AllowedAttributes;

    if (player[ATTRIBUTES].spendableAttributePoints > 0) {
      player[ATTRIBUTES].spendableAttributePoints--;
      player[ATTRIBUTES].attributes[attrID]++;

      gameEvents.pushEvent(new PlayerAttributesChangeEvent(player));
    }
  }
}

export default buyAttr;
