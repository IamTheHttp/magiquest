import GAME_PLATFORM from 'game-platform';
import {
  EXPERIENCE_COMP, LEVEL_COMP,
  PLAYER_CONTROLLED_COMP
} from 'components/ComponentNamesConfig';
import {ISystemArguments} from "../../interfaces/gameloop.i";
import Player from "entities/characters/Player";
import {EnemyKilledEvent} from "classes/GameEvents";

let { Entity} = GAME_PLATFORM;

function experienceSystem(systemArguments: ISystemArguments) {
  let {gameEvents} = systemArguments;
  let player = Entity.getByComps([PLAYER_CONTROLLED_COMP])[0] as Player;

  gameEvents.getEvents().forEach((event) => {
    if (event instanceof EnemyKilledEvent) {
      let baseXP = 10;

      // enemy[LE]
      let currentXP = player[EXPERIENCE_COMP].XP;
      let newXP = event.entity[LEVEL_COMP].characterLevel * baseXP;


      player[EXPERIENCE_COMP].XP = currentXP + newXP;
      console.log(player[EXPERIENCE_COMP].XP);
    }
  });
}

export default experienceSystem;


