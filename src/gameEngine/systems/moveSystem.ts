import {MOVEMENT, MOVING, POSITION, ITEM_PICKUP, INVENTORY} from 'gameEngine/components/_ComponentNames';
import getSafeDest from '../utils/systemUtils/getSafeDest';
import isTraversable from '../utils/componentUtils/movementUtils/isTraversable';
import {updateIndexedTileMap} from '../utils/systemUtils/move/updateIndexedTileMap';
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
import Player from '../entities/placeableEntities/Player';
import {ItemEntity} from '../entities/placeableEntities/Item';

// TODO - Sort this mess :) -- ORIENTATION vs DIRECTION vs animation.direction

/**
 *
 * @param systemArguments
 * @param {BaseEntity} entity
 */
function moveEntity(systemArguments: ISystemArguments, entity: BaseEntity) {
  const {mapAPI, game, indexedTileMap, viewSize, zone} = systemArguments;
  const {mapHeight, mapWidth, viewHeight, viewWidth} = viewSize;
  const {x: currX, y: currY} = entity.getPos();
  const {x: desiredDestX, y: desiredDestY} = entity.getDest();
  const direction = entity.getMoveDirection();

  // the user has a desired place he wants to go..
  let modDestX = desiredDestX;
  let modDestY = desiredDestY;

  // Set the modified, safe destination for the user
  if (isNum(desiredDestX) && isNum(desiredDestY)) {
    // make sure the that the desired destination is valid, and doesn't leave the map
    const {x, y} = getSafeDest(desiredDestX, desiredDestY, mapWidth, mapHeight);
    modDestY = y;
    modDestX = x;
  } else if (typeof direction !== 'undefined' && direction !== null) {
    // TODO replace with a util? // OR change the ENUM to start from 1?
    // create destination from the direction we want to go

    const {x, y} = entity.getDestFromDirection(direction);
    modDestY = y;
    modDestX = x;
  } else {
    // no direction, no destination? too bad, stop.
    entity.stop();
    return;
  }

  entity.setOrientation(entity.calcOrientation(modDestX, modDestY));

  const animationName = `MOVE_${entity.getOrientation()}`;
  const animationToAdd = entity.getPossibleAnimations()[animationName];

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
    updateIndexedTileMap({
      entity,
      indexedTileMap,
      newX: entity.getDest().x,
      newY: entity.getDest().y,
      oldX: entity[POSITION].originX,
      oldY: entity[POSITION].originY
    });

    // Are there any items in this tile?
    if (entity.hasComponents(ITEM_PICKUP) && entity.hasComponents(INVENTORY)) {
      const indexedTile = indexedTileMap[getTileIdxByPos(entity.getPos().x, entity.getPos().y)];

      for (const entID in indexedTile.entities) {
        const entInTile = indexedTile.entities[entID] as ItemEntity;
        // For all the items, collect them to backpack
        if (entInTile instanceof ItemEntity) {
          indexedTile.removeEnt(entInTile);
          entInTile.removeComponent(POSITION);
          (entity as Player)[INVENTORY].addItemToBackpack(entInTile);
        }
      }
    }

    // if entity has a direction it wants to go, lets stop it, and reset its movement in the direction
    entity.stop();

    const {x, y} = entity.getPos();
    assertType((x + TILE_SIZE / 2) % TILE_SIZE === 0, `Entities should be on the grid ${x} ${y}`, true);
    assertType((y + TILE_SIZE / 2) % TILE_SIZE === 0, 'gameEngine/entities should be on the grid', true);
    if (typeof direction !== 'undefined' && direction !== null) {
      entity.setMoveDirection(direction);
    }

    /**
     * Execute possible triggers when movement is done
     */
    const {col, row} = getGridIdxFromPos(x, y);
    const tileIdx = getTileIdxByPos(x, y);

    if (entity.isPlayer()) {
      const triggers = zone.triggers.move[tileIdx];

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
  if (!isTraversable(indexedTileMap, modDestX, modDestY, entity)) {
    entity.stop();
    return;
  }

  /**
   * Prep before we move, occupy the target tile
   */
  updateIndexedTileMap({
    entity,
    indexedTileMap,
    newX: entity.getDest().x,
    newY: entity.getDest().y
  });

  /**
   * Calc the new X,Y to move to
   */
  const {x: newX, y: newY} = calcNewPosToMove(entity, currX, currY, entity.getDest().x, entity.getDest().y);

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
    updateIndexedTileMap({entity, indexedTileMap, oldX: currX, oldY: currY});
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
  const entities = Entity.getByComps<BaseEntity>([MOVEMENT, POSITION, MOVING]);
  if (entities.length) {
    entityLoop(entities, (entity) => {
      moveEntity(systemArguments, entity);
    });
  }
}

export default moveSystem;
