import {IPlayerState, IUIEvent} from '../../interfaces/IGeneral';

class PlayerState implements IPlayerState {
  public maxHealth: number;
  public currentHealth: number;
  public percentHealth: number;
  public spendableXP: number;
  public levelProgress: number;

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
