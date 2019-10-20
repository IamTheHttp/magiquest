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
    systemArguments = createSystemArgs({spyPan});
  });
  
  it ('doesnt break with no ents', () => {
    animationSystem(systemArguments);
  });
  
  // TODO missing tests for this system
});