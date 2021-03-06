import {AllowedSkills} from '../../data/skillConfig';
import {IPlayerState, IUIEvent} from '../../interfaces/IGeneral';
import {IAssignedCharacterAttributes} from '../components/CharacterAttributesComponent';

class PlayerState implements IPlayerState {
  public maxHealth: number;
  public currentHealth: number;
  public percentHealth: number;
  public skills: AllowedSkills[];
  public spendableXP: number;
  public levelProgress: number;
  public attributes: IAssignedCharacterAttributes;
  public spendableAttributePoints: number;

  constructor(playerStateProperties: IPlayerState) {
    Object.assign(this, playerStateProperties);
  }
}

class PlayerStateChangeEvent extends PlayerState implements IUIEvent {
  public type: string;
  public name: string;
  constructor(playerStateProperties: IPlayerState) {
    super(playerStateProperties);
    this.type = 'UI_EVENT';
    this.name = 'PLAYER_STATE_CHANGE';
  }
}

export {PlayerState, PlayerStateChangeEvent};
