import {Entity} from 'game-platform';
import {EnemyKilledEvent} from '../classes/GameEvents';
import Player from '../entities/characters/Player';
import {
  CHARACTER_ATTRIBUTES_COMP,
  EXPERIENCE_COMP,
  LEVEL_COMP,
  PLAYER_CONTROLLED_COMP
} from '../components/ComponentNamesConfig';
import {ISystemArguments} from '../../interfaces/IGameLoop';

function experienceSystem(systemArguments: ISystemArguments) {
  let {gameEvents} = systemArguments;
  let player = Entity.getByComps<Player>([PLAYER_CONTROLLED_COMP])[0];

  gameEvents.getEvents().forEach((event) => {
    if (event instanceof EnemyKilledEvent) {
      let currentXP = player[EXPERIENCE_COMP].XP;
      let newXP = event.entity[LEVEL_COMP].characterLevel; // we currently give a certain XP boost per character level

      player[EXPERIENCE_COMP].XP = currentXP + newXP;
    }
  });

  // just in case we advanced several levels during this iteration
  while (player[EXPERIENCE_COMP].getLevelProgress() >= 1) {
    player[EXPERIENCE_COMP].level++;
    player[CHARACTER_ATTRIBUTES_COMP].spendableAttributePoints++;
  }
}

export default experienceSystem;
