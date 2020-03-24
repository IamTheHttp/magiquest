import GAME_PLATFORM from 'game-platform';
import {
  EXPERIENCE_COMP,
  PLAYER_CONTROLLED_COMP
} from 'components/ComponentNamesConfig';
import {ISystemArguments} from "../../interfaces/gameloop.i";
import Player from "entities/characters/Player";
import {EnemyKillEvent} from "classes/GameEvents";

let { Entity} = GAME_PLATFORM;

function experienceSystem(systemArguments: ISystemArguments) {
  let {gameEvents} = systemArguments;

  gameEvents.getEvents();

  let player = Entity.getByComps([PLAYER_CONTROLLED_COMP])[0] as Player;

  gameEvents.getEvents().forEach((event) => {
    if (event instanceof EnemyKillEvent) {
      player[EXPERIENCE_COMP].exp++;
    }
  });
}

export default experienceSystem;


