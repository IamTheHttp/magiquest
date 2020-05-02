import UIComponent from '../../components/UIComponent';
import PositionComponent from '../../components/PositionComponent';
import MoveComponent from '../../components/MoveComponent';
import {AllowedUIShapes, CANVAS_OUTPUT, CHARACTERS} from 'gameConstants';
import Health from '../../components/Health';
import AIControlledComp from '../../components/AIControlledComp';
import BaseEntity from '../../BaseEntity';
import AnimationComp from 'components/AnimationComp';
import AIVisionComponent from 'components/AIVisionComponent';
import AttackComponent from 'components/AttackComponent';
import {attackSpeeds} from 'config';
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
    this.addComponent(new PositionComponent({x, y, radius}));

    if (speed) {
      this.addComponent(new MoveComponent(speed));
    }

    if (health) {
      let adjustedHealth = this.getLevelAdjustedHealth(health, characterLevel);
      this.addComponent(new Health(adjustedHealth, radius * 2, radius));
      // the UI component can be completely overwritten by the extending class (like Player)
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
      let adjustedDmg = this.getLevelAdjustedDamage(dmg, characterLevel);
      this.addComponent(new AttackComponent(adjustedDmg, attackSpeeds[attackSpeed]));
    }

    if (animationTypes) {
      this.addComponent(new AnimationComp(animationTypes));
    }
  }

  getLevelAdjustedHealth(health: number, level:number) {
    return health + health * level / 100 // base health + 1% per level
  }

  getLevelAdjustedDamage(dmg: number, level:number) {
    return dmg + dmg * level / 200; // base damage + 0.5% per level
  }
}

export default Character;