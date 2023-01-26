import LevelComp from '../../components/LevelComp';
import {PossibleUIShapes, ATTACK_SPEEDS, CANVAS_OUTPUT} from '../../gameConstants';
import {IPlaceableEntityData, IPlacedEntityInstanceAttr} from '../../../interfaces/IPlaceableEntityData';
import HasHealth from '../../components/HasHealth';
import HasPosition from '../../components/HasPosition';
import {BaseEntity} from '../../BaseEntity';
import HasUI from '../../components/HasUI';
import {getCenterPosOfGridIdx} from '../../utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
import {LEVEL_COMP, SPAWNED_COMP} from '../../components/_ComponentNamesConfig';
import HasAIVision from '../../components/HasAIVision';
import SpawnedComponent from '../../components/SpawnedComponent';
import MoveComponent from '../../components/MoveComponent';
import {HasAnimations} from '../../components/HasAnimations';
import CanAttack from '../../components/CanAttack';

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
    this.addComponent(new HasPosition({x, y, radius}));

    if (speed) {
      this.addComponent(new MoveComponent(speed));
    }

    if (health) {
      let adjustedHealth = this.getLevelAdjustedHealth(health, entityLevel);
      this.addComponent(new HasHealth(adjustedHealth, radius * 2, radius));
      // the UI component can be completely overwritten by the extending class (like Player)
      this.addComponent(
        new HasUI([
          {
            name: CANVAS_OUTPUT,
            shape: PossibleUIShapes.HEALTH_BAR_SHAPE,
            data: {}
          }
        ])
      );
    }

    if (vision) {
      this.addComponent(new HasAIVision(vision));
    }

    if (dmg) {
      let adjustedDmg = this.getLevelAdjustedDamage(dmg, entityLevel);
      this.addComponent(new CanAttack(adjustedDmg, ATTACK_SPEEDS[attackSpeed]));
    }

    if (possibleAnimationsForEntity) {
      this.addComponent(new HasAnimations(possibleAnimationsForEntity));
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
