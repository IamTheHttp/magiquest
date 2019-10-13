import {DIRECTIONS} from '../../../constants';
import {ATTACK_COMP, POSITION_COMP} from '../../../components/ComponentNamesConfig';
import onDirection from '../../componentUtils/positionUtils/onDirection';

function renderCircle(systemArguments, entity) {
  let {mapAPI} = systemArguments;
  let {x: curX, y: curY, radius, direction: curDirection} = entity[POSITION_COMP];
  
  mapAPI.addCircle(
    {
      id: `${entity.id}`,
      x: curX,
      y: curY,
      radius,
      fillColor: 'red',
      strokeStyle: 'red',
      lineWidth: 1
    }
  );
  
  // We set the direction of the circle
  let dirXOffset = 0;
  let dirYOffset = 0;
  
  if (curDirection === DIRECTIONS.LEFT) {
    dirXOffset = -radius;
  }
  
  if (curDirection === DIRECTIONS.RIGHT) {
    dirXOffset = entity[POSITION_COMP].radius;
  }
  
  if (curDirection === DIRECTIONS.UP) {
    dirYOffset = -entity[POSITION_COMP].radius;
  }
  
  if (curDirection === DIRECTIONS.DOWN) {
    dirYOffset = entity[POSITION_COMP].radius;
  }
  
  mapAPI.addCircle(
    {
      id: `${entity.id}-direction`,
      x: curX + dirXOffset,
      y: curY + dirYOffset,
      radius: 2,
      fillColor: 'white',
      strokeStyle: 'white',
      lineWidth: 1
    }
  );
  
  
  /**
   * @type {AttackComponent}
   */
  let attackComp = entity[ATTACK_COMP];
  let isAnimationStillGoing =
    attackComp &&
    attackComp.currentFrame < attackComp.animationDuration &&
    attackComp.targetForAnimation;
  
  // TODO - Why only for circle shapes?
  
  // if entity has the attack component, and it has a target for animation....
  // if animation is still not done, draw an animation frame
  if (isAnimationStillGoing) {
    attackComp.currentFrame++;
    
    let animationX = curX;
    let animationY = curY;
    let animSpeed = 2;
    
    onDirection(
      entity,
      () => {
        animationY = curY - attackComp.currentFrame * animSpeed; // 5 == animation speed
      },
      () => {
        animationX = curX + attackComp.currentFrame * animSpeed;
      },
      () => {
        animationY = curY + attackComp.currentFrame * animSpeed;
      },
      () => {
        animationX = curX - attackComp.currentFrame * animSpeed;
      }
    );
    
    mapAPI.addCircle(
      {
        id: `${entity.id}-attack-direction`,
        x: animationX,
        y: animationY,
        radius: 2,
        fillColor: 'black',
        strokeStyle: 'black',
        lineWidth: 1
      }
    );
  } else {
    if (attackComp) {
      attackComp.currentFrame = 0;
      attackComp.targetForAnimation = null;
    }
  }
}

export default renderCircle;