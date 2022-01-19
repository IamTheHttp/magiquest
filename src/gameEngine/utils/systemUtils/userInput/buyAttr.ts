import {
  CHARACTER_ATTRIBUTES_COMP,
  CHARACTER_SKILLS_COMP,
  EXPERIENCE_COMP,
  PLAYER_CONTROLLED_COMP
} from 'gameEngine/components/ComponentNamesConfig';
import {ISystemArguments} from '../../../../interfaces/gameloop.i';
import Player from '../../../entities/characters/Player';
import {IAction} from '../../../../interfaces/interfaces';
import {AllowedAttributes} from '../../../../data/attributesConfig';
import {BaseEntity} from '../../../BaseEntity';
import {PlayerAttributesChangeEvent} from '../../../classes/GameEvents';

function buyAttr(systemArguments: ISystemArguments, action: IAction) {
  let {Entity, zone, gameEvents} = systemArguments;
  let player = Entity.getByComp<Player>(PLAYER_CONTROLLED_COMP)[0];

  // TODO how can we improve type safety here?
  if (action.data && action.data.attrID) {
    let attrID = action.data.attrID as AllowedAttributes;

    if (player[CHARACTER_ATTRIBUTES_COMP].spendableAttributePoints > 0) {
      player[CHARACTER_ATTRIBUTES_COMP].spendableAttributePoints--;
      player[CHARACTER_ATTRIBUTES_COMP].attributes[attrID]++;

      gameEvents.pushEvent(new PlayerAttributesChangeEvent(player));
    }
  }
}

export default buyAttr;
