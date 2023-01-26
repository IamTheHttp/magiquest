import {MOVEMENT_COMP, IS_MOVING_COMP, POSITION_COMP} from 'gameEngine/components/ComponentNamesConfig';
import getSafeDest from '../utils/systemUtils/getSafeDest';
import isTraversable from '../utils/componentUtils/movementUtils/isTraversable';
import {updateMapTileIdx} from '../utils/systemUtils/move/updateMapTileIdx';
import calcNewPosToMove from '../utils/systemUtils/calcNewPosToMove';
import centerCameraOnEntity from '../utils/systemUtils/centerCameraOnEntity';
import isNum from 'gameEngine/utils/isNum';
import assertType from 'gameEngine/utils/assertType';
import {getGridIdxFromPos} from 'gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
import {getTileIdxByPos} from 'gameEngine/utils/componentUtils/tileUtils/tileIdxUtils';
import {pushTrigger, DialogTrigger} from 'gameEngine/systems/triggerSystem';
import {ISystemArguments} from '../../interfaces/IGameLoop';
import {Entity, entityLoop} from 'game-platform';
import {BaseEntity} from '../BaseEntity';
import {isNonEmptyArray} from './portalSystem';
import {TILE_SIZE} from '../gameConstants';

// TODO - Sort this mess :) -- ORIENTATION vs DIRECTION vs animation.direction

/**
 *
 * @param systemArguments
 * @param {BaseEntity} entity
 */
function moveEntity(systemArguments: ISystemArguments, entity: BaseEntity) {
  let {mapAPI, game, tileIdxMap, viewSize, zone} = systemArguments;
  let {mapHeight, mapWidth, viewHeight, viewWidth} = viewSize;
  let {x: currX, y: currY} = entity.getPos();
  let {x: desiredDestX, y: desiredDestY} = entity.getDest();
  let direction = entity.getMoveDirection();

  // the user has a desired place he wants to go..
  let modDestX = desiredDestX;
  let modDestY = desiredDestY;

  // Set the modified, safe destination for the user
  if (isNum(desiredDestX) && isNum(desiredDestY)) {
    // make sure the that the desired destination is valid, and doesn't leave the map
    let {x, y} = getSafeDest(desiredDestX, desiredDestY, mapWidth, mapHeight);
    modDestY = y;
    modDestX = x;
  } else if (typeof direction !== 'undefined' && direction !== null) {
    // TODO replace with a util? // OR change the ENUM to start from 1?
    // create destination from the direction we want to go

    let {x, y} = entity.getDestFromDirection(direction);
    modDestY = y;
    modDestX = x;
  } else {
    // no direction, no destination? too bad, stop.
    entity.stop();
    return;
  }

  entity.setOrientation(entity.calcOrientation(modDestX, modDestY));

  let animationName = `MOVE_${entity.getOrientation()}`;
  let animationToAdd = entity.getPossibleAnimations()[animationName];

  // Only add this animation if we don't have it already
  if (animationToAdd && !entity.isSpecificAnimationRunning(animationName)) {
    entity.removeAllRunningAnimations();
    entity.addAnimationToRun(entity.getPossibleAnimations()[animationName]);
  }

  // set destination
  entity.setDest({
    x: modDestX,
    y: modDestY
  });

  /**
   * Stopping Point - Was our destination reached? if it was, we stop.
   */
  if (entity.isDestReached()) {
    // insert the entity as an occupant of the tile
    // since we're moving - make sure the entity leaves the origin tile
    updateMapTileIdx({
      entity,
      tileIdxMap,
      newX: entity.getDest().x,
      newY: entity.getDest().y,
      oldX: entity[POSITION_COMP].originX,
      oldY: entity[POSITION_COMP].originY
    });

    // if entity has a direction it wants to go, lets stop it, and reset its movement in the direction
    entity.stop();

    let {x, y} = entity.getPos();
    assertType((x + TILE_SIZE / 2) % TILE_SIZE === 0, `Entities should be on the grid ${x} ${y}`, true);
    assertType((y + TILE_SIZE / 2) % TILE_SIZE === 0, 'gameEngine/entities should be on the grid', true);
    if (typeof direction !== 'undefined' && direction !== null) {
      entity.setMoveDirection(direction);
    }

    /**
     * Execute possible triggers when movement is done
     */
    let {col, row} = getGridIdxFromPos(x, y);
    let tileIdx = getTileIdxByPos(x, y);

    if (entity.isPlayer()) {
      let triggers = zone.triggers.move[tileIdx];

      if (isNonEmptyArray(triggers)) {
        triggers.forEach((trigger) => {
          if (trigger.type === 'dialog') {
            pushTrigger(
              new DialogTrigger({
                id: trigger.id,
                type: 'dialog',
                oneOff: trigger.oneOff,
                lines: trigger.lines,
                actedOnEntity: entity
              })
            );
          }
        });
      }
    }

    return;
  }

  /**
   * Stopping Point - Is our (modified) destination traversable? if not, we stop.
   */
  if (!isTraversable(tileIdxMap, modDestX, modDestY, entity)) {
    entity.stop();
    return;
  }

  /**
   * Prep before we move, occupy the target tile
   */
  updateMapTileIdx({
    entity,
    tileIdxMap,
    newX: entity.getDest().x,
    newY: entity.getDest().y
  });

  /**
   * Calc the new X,Y to move to
   */
  let {x: newX, y: newY} = calcNewPosToMove(entity, currX, currY, entity.getDest().x, entity.getDest().y);

  /**
   * Update, at the end of the tick, the indexMap
   *
   * Do not free your tile until the end of the tick
   * If you release it too soon, this situation occures;
   * player -> going from 0 to 1
   * enemy -> going from 1 to 0
   * since at the moment of 'going' the tile is already free, the entities pass through each other
   * by waiting for the next tick(or the end of this one), we guarantee that for the duration of THIS tick
   * both destination and origin are occupied
   */

  Promise.resolve().then(() => {
    updateMapTileIdx({entity, tileIdxMap, oldX: currX, oldY: currY});
  });

  entity.setPos({
    x: newX,
    y: newY
  });

  /**
   * Pan the camera around the player controlled entity
   */
  /* istanbul ignore else */
  if (entity.isPlayer()) {
    centerCameraOnEntity(entity, mapAPI, game, viewWidth, viewHeight, mapWidth, mapHeight);
  }
}

function moveSystem(systemArguments: ISystemArguments) {
  let entities = Entity.getByComps<BaseEntity>([MOVEMENT_COMP, POSITION_COMP, IS_MOVING_COMP]);
  if (entities.length) {
    entityLoop(entities, (entity) => {
      moveEntity(systemArguments, entity);
    });
  }
}

export default moveSystem;
