import UIComponent from '../../components/UIComponent';
import PositionComponent from '../../components/PositionComponent';
import MoveComponent from '../../components/MoveComponent';
import {CANVAS_OUTPUT, AllowedUIShapes} from 'gameConstants';
import Health from '../../components/Health';
import AIControlledComp from '../../components/AIControlledComp';
import BaseEntity from '../../BaseEntity';
import AnimationComp, {IAnimationTypes} from 'components/AnimationComp';
import enemyAnimations from 'entities/animations/enemyAnimations';
import AIVisionComponent from 'components/AIVisionComponent';
import AttackComponent from 'components/AttackComponent';
import {ATTACK_SPEEDS_OPTIONS, attackSpeeds} from 'config';
import {getCenterPosOfGridIdx} from 'utils/componentUtils/positionUtils/getCenterPosOfGridIdx';

interface IEnemyConstructor {
  col: number;
  row: number;
  radius?: number;
  vision?: number;
  speed?: number;
  health?: number;
  dmg?:number;
  attackSpeed?: ATTACK_SPEEDS_OPTIONS,
  animationTypes?: IAnimationTypes
}

class Enemy extends BaseEntity {
  constructor({
                col,
                row,
                radius = 16,
                vision = 200,
                speed = 0.5,
                health = 100,
                dmg = 1,
                attackSpeed = ATTACK_SPEEDS_OPTIONS.SLOW,
                animationTypes = enemyAnimations
  }: IEnemyConstructor) {
    super(Enemy);
    let {x, y} = getCenterPosOfGridIdx(col, row);

    this.addComponent(new MoveComponent(speed));
    this.addComponent(new PositionComponent({x, y, radius}));
    this.addComponent(new Health(health, radius * 2, radius));
    this.addComponent(new AIVisionComponent(vision));
    this.addComponent(new AttackComponent(dmg, attackSpeeds[attackSpeed]));
    this.addComponent(new AIControlledComp());

    this.addComponent(new UIComponent(
      [{
        name: CANVAS_OUTPUT,
        shape: AllowedUIShapes.HEALTH_BAR_SHAPE,
        data: {}
      }]
    ));

    this.addComponent(new AnimationComp(animationTypes));
  }
}

export default Enemy;