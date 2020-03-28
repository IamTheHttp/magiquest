import UIComponent from '../../components/UIComponent';
import PositionComponent from '../../components/PositionComponent';
import MoveComponent from '../../components/MoveComponent';
import {CANVAS_OUTPUT, AllowedUIShapes, AllowedLevelLocationIDs} from 'gameConstants';
import Health from '../../components/Health';
import AIControlledComp from '../../components/AIControlledComp';
import BaseEntity from '../../BaseEntity';
import AnimationComp, {IAnimationTypes} from 'components/AnimationComp';
import AIVisionComponent from 'components/AIVisionComponent';
import AttackComponent from 'components/AttackComponent';
import {ATTACK_SPEEDS_OPTIONS, attackSpeeds} from 'config';
import {getCenterPosOfGridIdx} from 'utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
import SpawnedComponent from "components/SpawnedComponent";
import {LEVEL_COMP, SPAWNED_COMP} from "components/ComponentNamesConfig";
import LevelComp from "components/LevelComp";
import {ICharacterConfig, ICharacterInstanceAttr} from "entities/characters/ICharacterConfig";


class Character extends BaseEntity {
  [SPAWNED_COMP]: SpawnedComponent;
  [LEVEL_COMP]: LevelComp;
  constructor(instanceAttributes: ICharacterInstanceAttr, charConfig:ICharacterConfig) {
    super(Character);
    let {col, row, characterLevel, spawningTileLocationID} = instanceAttributes;
    let {speed, health, radius, dmg, attackSpeed, vision, animationTypes, id, displayName} = charConfig;

    let {x, y} = getCenterPosOfGridIdx(col, row);

    this.addComponent(new LevelComp(characterLevel));
    this.addComponent(new SpawnedComponent(spawningTileLocationID));
    this.addComponent(new PositionComponent({x, y, radius}));

    if (speed) {
      this.addComponent(new MoveComponent(speed));
    }

    if (health) {
      this.addComponent(new Health(health, radius * 2, radius));
      this.addComponent(new UIComponent(
        [{
          name: CANVAS_OUTPUT,
          shape: AllowedUIShapes.HEALTH_BAR_SHAPE,
          data: {}
        }]
      ));
    }

    if (vision) {
      this.addComponent(new AIVisionComponent(vision));
    }

    if (dmg) {
      this.addComponent(new AttackComponent(dmg, attackSpeeds[attackSpeed]));
    }

    this.addComponent(new AIControlledComp());

    if (animationTypes) {
      this.addComponent(new AnimationComp(animationTypes));
    }
  }
}

export default Character;