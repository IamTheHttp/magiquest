import {Entity} from 'game-platform';
import Player from '../entities/placeableEntities/Player';
import {
  CHARACTER_ATTRIBUTES_COMP,
  EXPERIENCE_COMP,
  LEVEL_COMP,
  PLAYER_CONTROLLED_COMP
} from '../components/ComponentNamesConfig';
import {ISystemArguments} from '../../interfaces/IGameLoop';

/**
 * Experience system reads events that happened before it, such as EnemyKilledEvent, and apply its business logic
 * @param systemArguments
 */
function experienceSystem(systemArguments: ISystemArguments) {
  let {destroyedPlaceableEntities, game} = systemArguments;
  let player = Entity.getByComps<Player>([PLAYER_CONTROLLED_COMP])[0];

  destroyedPlaceableEntities.forEach((entity) => {
    let currentXP = player[EXPERIENCE_COMP].XP;
    let newXP = entity[LEVEL_COMP].entityLevel; // we currently give a certain XP boost per character level
    player[EXPERIENCE_COMP].XP = currentXP + newXP;
  });

  // gameEvents.getEvents().forEach((event) => {
  //   if (event instanceof EnemyKilledEvent) {
  //     let currentXP = player[EXPERIENCE_COMP].XP;
  //     let newXP = event.readEvent().entity[LEVEL_COMP].entityLevel; // we currently give a certain XP boost per character level
  //     player[EXPERIENCE_COMP].XP = currentXP + newXP;
  //   }
  // });

  // just in case we advanced several levels during this iteration
  while (player[EXPERIENCE_COMP].getLevelProgress() >= 1) {
    player[EXPERIENCE_COMP].level++;
    player[CHARACTER_ATTRIBUTES_COMP].spendableAttributePoints++;
  }

  // Notify the UI of experience changes
  game.dispatchGameEvent(game.getPlayerStateEvent());
}

export default experienceSystem;
