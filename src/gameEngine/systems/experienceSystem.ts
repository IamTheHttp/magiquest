import {Entity} from 'game-platform';
import Player from '../entities/placeableEntities/Player';
import {ATTRIBUTES, EXPERIENCE, LEVELS, PLAYER_CONTROLLED} from '../components/_ComponentNames';
import {ISystemArguments} from '../../interfaces/IGameLoop';

/**
 * Experience system reads events that happened before it, such as EnemyKilledEvent, and apply its business logic
 * @param systemArguments
 */
function experienceSystem(systemArguments: ISystemArguments) {
  let {destroyedPlaceableEntities, game} = systemArguments;
  let player = Entity.getByComps<Player>([PLAYER_CONTROLLED])[0];

  destroyedPlaceableEntities.forEach((entity) => {
    let currentXP = player[EXPERIENCE].XP;
    let newXP = entity[LEVELS].entityLevel; // we currently give a certain XP boost per character level
    player[EXPERIENCE].XP = currentXP + newXP;
  });

  // gameEvents.getEvents().forEach((event) => {
  //   if (event instanceof EnemyKilledEvent) {
  //     let currentXP = player[EXPERIENCE].XP;
  //     let newXP = event.readEvent().entity[LEVEL_COMP].entityLevel; // we currently give a certain XP boost per character level
  //     player[EXPERIENCE].XP = currentXP + newXP;
  //   }
  // });

  // just in case we advanced several levels during this iteration
  while (player[EXPERIENCE].getLevelProgress() >= 1) {
    player[EXPERIENCE].level++;
    player[ATTRIBUTES].spendableAttributePoints++;
  }

  // Notify the UI of experience changes
  game.dispatchGameEvent(game.getPlayerStateEvent());
}

export default experienceSystem;
