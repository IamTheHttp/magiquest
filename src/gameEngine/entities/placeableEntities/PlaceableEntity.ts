import LevelComp from '../../components/LevelComp';
import {PossibleUIShapes, ATTACK_SPEEDS, CANVAS_OUTPUT} from '../../gameConstants';
import {IPlaceableEntityData, IPlacedEntityInstanceAttr} from '../../../interfaces/IPlaceableEntityData';
import Health from '../../components/Health';
import PositionComponent from '../../components/PositionComponent';
import {BaseEntity} from '../../BaseEntity';
import UIComponent from '../../components/UIComponent';
import {getCenterPosOfGridIdx} from '../../utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
import {LEVEL_COMP, SPAWNED_COMP} from '../../components/ComponentNamesConfig';
import AIVisionComponent from '../../components/AIVisionComponent';
import SpawnedComponent from '../../components/SpawnedComponent';
import MoveComponent from '../../components/MoveComponent';
import {AnimationComp} from '../../components/AnimationComp';
import AttackComponent from '../../components/AttackComponent';

class PlaceableEntity extends BaseEntity {
  [SPAWNED_COMP]: SpawnedComponent;
  [LEVEL_COMP]: LevelComp;
  constructor(instanceAttributes: IPlacedEntityInstanceAttr, placeableEntityData: IPlaceableEntityData) {
    super();
    let {col, row, entityLevel} = instanceAttributes;
    let {speed, health, radius, dmg, attackSpeed, vision, id, displayName, possibleAnimationsForEntity} =
      placeableEntityData;

    let {x, y} = getCenterPosOfGridIdx(col, row);

    this.addComponent(new LevelComp(entityLevel));
    this.addComponent(new PositionComponent({x, y, radius}));

    if (speed) {
      this.addComponent(new MoveComponent(speed));
    }

    if (health) {
      let adjustedHealth = this.getLevelAdjustedHealth(health, entityLevel);
      this.addComponent(new Health(adjustedHealth, radius * 2, radius));
      // the UI component can be completely overwritten by the extending class (like Player)
      this.addComponent(
        new UIComponent([
          {
            name: CANVAS_OUTPUT,
            shape: PossibleUIShapes.HEALTH_BAR_SHAPE,
            data: {}
          }
        ])
      );
    }

    if (vision) {
      this.addComponent(new AIVisionComponent(vision));
    }

    if (dmg) {
      let adjustedDmg = this.getLevelAdjustedDamage(dmg, entityLevel);
      this.addComponent(new AttackComponent(adjustedDmg, ATTACK_SPEEDS[attackSpeed]));
    }

    if (possibleAnimationsForEntity) {
      this.addComponent(new AnimationComp(possibleAnimationsForEntity));
    }
  }

  getLevelAdjustedHealth(health: number, level: number) {
    return health + (health * level) / 100; // base health + 1% per level
  }

  getLevelAdjustedDamage(dmg: number, level: number) {
    return dmg + (dmg * level) / 200; // base damage + 0.5% per level
  }
}

export default PlaceableEntity;
