import {ISystemArguments} from '../../interfaces/IGameLoop';
import {PlayerIsAttacked, PlayerSkillsChangeEvent} from '../classes/GameEvents';

/**
 * The last system to run, cleans up old events and notifies the React UI of changes to the game
 * @param systemArguments
 */
export function endTickSystem(systemArguments: ISystemArguments) {
  const {gameEvents, game} = systemArguments;

  gameEvents.getEvents().forEach((event) => {
    // TODO, do we want a more general 'NotifyUISystem' event?
    // TODO this feels too specific :)
    // TODO rename PlayerIsAttacked to PlayerIsAttackedEvent
    if (event instanceof PlayerIsAttacked || event instanceof PlayerSkillsChangeEvent) {
      // notify UI (App.tsx) of certain events
      game.dispatchGameEvent(game.getPlayerStateEvent());
    }
  });
  game.gameEvents.endTick();
}
