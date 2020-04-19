import GAME_PLATFORM from 'game-platform';
import {EXPERIENCE_COMP, LEVEL_COMP, PLAYER_CONTROLLED_COMP} from 'components/ComponentNamesConfig';
import {ISystemArguments} from "../../interfaces/gameloop.i";
import Player from "entities/characters/Player";
import {EnemyKilledEvent} from "classes/GameEvents";

let { Entity} = GAME_PLATFORM;

function experienceSystem(systemArguments: ISystemArguments) {
  let {gameEvents} = systemArguments;
  let player = Entity.getByComps([PLAYER_CONTROLLED_COMP])[0] as Player;

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
  }
}

export default experienceSystem;


