import UIComponent from '../../../components/UIComponent';
import PositionComponent from '../../../components/PositionComponent';
import MoveComponent from '../../../components/MoveComponent';
import {CANVAS_OUTPUT, AllowedUIShapes, AllowedLevelLocationIDs} from 'gameConstants';
import Health from '../../../components/Health';
import AIControlledComp from '../../../components/AIControlledComp';
import BaseEntity from '../../../BaseEntity';
import AnimationComp, {IAnimationTypes} from 'components/AnimationComp';
import enemyAnimations from 'entities/animations/enemyAnimations';
import AIVisionComponent from 'components/AIVisionComponent';
import AttackComponent from 'components/AttackComponent';
import {ATTACK_SPEEDS_OPTIONS, attackSpeeds} from 'config';
import {getCenterPosOfGridIdx} from 'utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
import SpawnedComponent from "components/SpawnedComponent";
import {LEVEL_COMP, SPAWNED_COMP} from "components/ComponentNamesConfig";
import LevelComp from "components/LevelComp";
import {ICharacterConfig} from "../../../../levels/charactersDataConfig";

interface IEnemyInstanceAttr {
  col: number;
  row: number;
  characterLevel:number,
  spawningTileLocationID: AllowedLevelLocationIDs
}


class Enemy extends BaseEntity {
  [SPAWNED_COMP]: SpawnedComponent;
  [LEVEL_COMP]: LevelComp;
  constructor(instanceAttributes: IEnemyInstanceAttr, charConfig:ICharacterConfig) {
    let {col, row, characterLevel, spawningTileLocationID} = instanceAttributes;
    let {speed, health, radius, dmg, attackSpeed, vision, animationTypes} = charConfig;

    super(Enemy);
    let {x, y} = getCenterPosOfGridIdx(col, row);

    this.addComponent(new LevelComp(characterLevel));
    this.addComponent(new SpawnedComponent(spawningTileLocationID));
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