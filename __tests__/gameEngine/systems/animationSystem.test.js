import animationSystem from '../../../src/gameEngine/systems/animationSystem';
import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';
import GAME_PLATFORM from 'game-platform/dist';
import {ANIMATIONS} from 'gameConstants';
import {ANIMATION_COMP} from 'components/ComponentNamesConfig';
import {animationTypes} from 'config';
import BaseEntity from 'BaseEntity';

let {Entity} = GAME_PLATFORM;

describe('Tests for the AI system', () => {
  let systemArguments, spyPan;
  
  beforeEach(() => {
    Entity.reset();
    spyPan = jest.fn();
    systemArguments = createSystemArgs(spyPan);
  });
  
  it ('doesnt break with no ents', () => {
    animationSystem(systemArguments);
  });
  
  it ('Tests an entity with an infinte looping animation (And multiple animations)', () => {
    let ent = new BaseEntity();
  
    ent.addAnimation(animationTypes[ANIMATIONS.IDLE]);
    ent.addAnimation(animationTypes[ANIMATIONS.BREATHING]);
    
    expect(ent[ANIMATION_COMP].animations[ANIMATIONS.IDLE].currentFrame).toBe(0);
    animationSystem(systemArguments);
    expect(ent[ANIMATION_COMP].animations[ANIMATIONS.IDLE].currentFrame).toBe(1);
    expect(ent[ANIMATION_COMP].animations[ANIMATIONS.BREATHING].currentFrame).toBe(1);
    
    // since IDLE is a looping animation, it should still exist 200 frames deep
    for (let frame = 0; frame  < 200 ; frame++) {
      animationSystem(systemArguments);
    }
  
    expect(ent[ANIMATION_COMP]).toBeTruthy();
  });
  
  it ('Test an entity with a non looping animation', () => {
    let ent = new BaseEntity();
    
    ent.addAnimation(animationTypes[ANIMATIONS.BREATHING]);
    
    expect(ent[ANIMATION_COMP].animations[ANIMATIONS.BREATHING].currentFrame).toBe(0);
    animationSystem(systemArguments);
    expect(ent[ANIMATION_COMP].animations[ANIMATIONS.BREATHING].currentFrame).toBe(1);
    
    // since IDLE is a looping animation, it should still exist 200 frames deep
    for (let frame = 0; frame  < 200 ; frame++) {
      animationSystem(systemArguments);
    }
    
    // no animations, so no animation component
    expect(ent[ANIMATION_COMP]).toBeFalsy();
  });
});