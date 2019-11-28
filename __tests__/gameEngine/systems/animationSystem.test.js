import animationSystem from '../../../src/gameEngine/systems/animationSystem';
import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';
import GAME_PLATFORM from 'game-platform/dist';
import Player from 'entities/Player';
import getSpriteCrop from 'utils/getSpriteCrop';

let {Entity} = GAME_PLATFORM;

describe('Tests for the Animation system', () => {
  let systemArguments, spyPan;
  
  beforeEach(() => {
    Entity.reset();
    spyPan = jest.fn();
    systemArguments = createSystemArgs({spyPan});
  });
  
  it ('doesnt break with no ents', () => {
    animationSystem(systemArguments);
  });

  it ('Adds a and runs a simple animation', () => {
    let player = new Player({col:0, row:0});
    player.addAnimation({
      frames: [
        {
          spriteURL: 'some_URL',
          ...getSpriteCrop(0, 1)
        },
        {
          spriteURL: 'some_URL',
          ...getSpriteCrop(3, 1)
        }
      ],
      animationName: 'TEST_ANIMATION',
      loops: false
    });

    expect(player.getAnimations()['TEST_ANIMATION'].realFrameCount).toBe(0);

    animationSystem(systemArguments);
    expect(player.getAnimations()['TEST_ANIMATION'].realFrameCount).toBe(1);
  });


  it ('Advances a single frame when run', () => {
    // Add a player...
    // Set Direction

    let player = new Player({col:0, row:0});

    player.addAnimation(player.getAnimationTypes()['MOVE_RIGHT']);
    expect(player.getAnimations()['MOVE_RIGHT'].realFrameCount).toBe(0);

    animationSystem(systemArguments);
    expect(player.getAnimations()['MOVE_RIGHT'].realFrameCount).toBe(1);
  });

  it('Animation will run its course successfully', () => {
    let player = new Player({col:0, row:0});
    player.addAnimation(player.getAnimationTypes()['MOVE_RIGHT']);

    // animation duration (in frames) is related to the frame count it takes to move 32 pixels
    // run all the frames
    let i = 0;
    while (player.getAnimations()['MOVE_RIGHT']) {
      let anim = player.getAnimations()['MOVE_RIGHT'];
      expect(anim.realFrameCount).toBe(i);

      animationSystem(systemArguments);
      i++;
    }
  });
});