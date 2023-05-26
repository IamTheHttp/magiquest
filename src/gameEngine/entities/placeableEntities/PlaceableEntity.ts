import Levels from '../../components/Levels';
import {ATTACK_SPEEDS, CANVAS_OUTPUT} from '../../gameConstants';
import {IPlaceableEntityData, IPlacedEntityInstanceAttr} from '../../../interfaces/IPlaceableEntityData';
import Health from '../../components/Health';
import Position from '../../components/Position';
import {BaseEntity} from '../../BaseEntity';
import HasUI from '../../components/HasUI';
import {getCenterPosOfGridIdx} from '../../utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
import {LEVELS, WAS_SPAWNED} from '../../components/_ComponentNames';
import AIVision from '../../components/AIVision';
import WasSpawned from '../../components/WasSpawned';
import Movement from '../../components/Movement';
import {Animations} from '../../components/Animations';
import Attacker from '../../components/Attacker';

class PlaceableEntity extends BaseEntity {
  [WAS_SPAWNED]: WasSpawned;
  [LEVELS]: Levels;
  constructor(instanceAttributes: IPlacedEntityInstanceAttr, placeableEntityData: IPlaceableEntityData) {
    super();
    const {col, row, entityLevel} = instanceAttributes;
    const {speed, health, radius, dmg, attackSpeed, vision, id, displayName, possibleAnimationsForEntity} =
      placeableEntityData;

    const {x, y} = getCenterPosOfGridIdx(col, row);

    this.addComponent(new Levels(entityLevel));
    this.addComponent(new Position({x, y, radius}));

    if (speed) {
      this.addComponent(new Movement(speed));
    }

    if (health) {
      const adjustedHealth = this.getLevelAdjustedHealth(health, entityLevel);
      this.addComponent(new Health(adjustedHealth, radius * 2, radius));
      // the UI component can be completely overwritten by the extending class (like Player)
      this.addComponent(
        new HasUI([
          {
            name: CANVAS_OUTPUT,
            shape: 'HEALTH_BAR_SHAPE',
            data: {}
          }
        ])
      );
    }

    if (vision) {
      this.addComponent(new AIVision(vision));
    }

    if (dmg) {
      const adjustedDmg = this.getLevelAdjustedDamage(dmg, entityLevel);
      this.addComponent(new Attacker(adjustedDmg, ATTACK_SPEEDS[attackSpeed]));
    }

    if (possibleAnimationsForEntity) {
      this.addComponent(new Animations(possibleAnimationsForEntity));
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
