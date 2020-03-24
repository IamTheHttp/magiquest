import UIComponent from '../../components/UIComponent';
import PositionComponent from '../../components/PositionComponent';
import PlayerControlledComponent from '../../components/PlayerControlledComponent';
import MoveComponent from '../../components/MoveComponent';
import {ANIMATIONS, CANVAS_OUTPUT, AllowedUIShapes} from 'gameConstants';
import AttackComponent from '../../components/AttackComponent';
import BaseEntity, {Entity} from 'BaseEntity';
import AnimationComp from 'components/AnimationComp';
import playerAnimations from 'entities/animations/playerAnimations';
import Health from 'components/Health';
import {ATTACK_SPEEDS_OPTIONS, attackSpeeds, bit} from 'config';
import {getCenterPosOfGridIdx} from 'utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
import {EXPERIENCE_COMP, LEVEL_COMP} from "components/ComponentNamesConfig";
import ExperienceComp from "components/ExperienceComp";
import LevelComp from "components/LevelComp";


interface IPlayerConstructor {
  radius?:number;
  col:number;
  row:number;
  characterLevel?: number;
}

class Player extends BaseEntity {
  [EXPERIENCE_COMP]: ExperienceComp;
  [LEVEL_COMP]: LevelComp;
  constructor({radius = 16, col, row, characterLevel= 1}: IPlayerConstructor) {
    super(Player);
    let {x, y} = getCenterPosOfGridIdx(col, row);

    // TODO Adjust speeds before release

    this.addComponent(new MoveComponent(4));   // we move 32px, so it has to be divisible
    this.addComponent(new PlayerControlledComponent());
    this.addComponent(new LevelComp(characterLevel));
    this.addComponent(new ExperienceComp());
    this.addComponent(new AttackComponent(35, attackSpeeds[ATTACK_SPEEDS_OPTIONS.FASTEST]));
    this.addComponent(new PositionComponent({x, y, radius}));
    this.addComponent(new Health(2000, radius * 2, radius));
    this.addComponent(new UIComponent([
      {
        name: CANVAS_OUTPUT,
        shape: AllowedUIShapes.PLAYER_CHAR,
        data: {}
      },
      {
        name: CANVAS_OUTPUT,
        shape: AllowedUIShapes.HEALTH_BAR_SHAPE,
        data: {}
      }]
    ));

    this.addComponent(new AnimationComp(playerAnimations));
    this.name = 'Jenny';
  }
}

export default Player;