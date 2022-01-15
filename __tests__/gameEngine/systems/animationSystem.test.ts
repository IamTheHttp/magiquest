import animationSystem from '../../../src/gameEngine/systems/animationSystem';
import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';
import SpyFns from "../../__TEST__UTILS__/SpyFns";
import {ISystemArguments} from "../../../src/interfaces/gameloop.i";
import createTestPlayer from "../../__TEST__UTILS__/createTestPlayer";
import {Entity} from "game-platform";
import {getSpriteCrop} from "../../../src/gameEngine/utils/getSpriteCrop";


describe('Tests for the Animation system', () => {
  let systemArguments: ISystemArguments, spyPan;

  beforeEach(() => {
    Entity.reset();
    spyPan = jest.fn();
    systemArguments = createSystemArgs(new SpyFns(spyPan))  as ISystemArguments;
  });

  it ('doesnt break with no ents', () => {
    animationSystem(systemArguments);
  });

  it ('Adds a and runs a simple animation', () => {
    let player = createTestPlayer(0, 0);
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

    let player = createTestPlayer(0, 0);

    player.addAnimation(player.getAnimationTypes()['MOVE_RIGHT']);
    expect(player.getAnimations()['MOVE_RIGHT'].realFrameCount).toBe(0);

    animationSystem(systemArguments);
    expect(player.getAnimations()['MOVE_RIGHT'].realFrameCount).toBe(1);
  });

  it('Animation will run its course successfully', () => {
    let player = createTestPlayer(0, 0);
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

  it('Animation will loop when over if so configured', () => {
    let player = createTestPlayer(0, 0);

    player.addAnimation({
      loops: true,
      frames: [{},{}],
      animationDuration: 2,
      animationName: 'TEST_LOOP'
    });

    // animation duration (in frames) is related to the frame count it takes to move 32 pixels

    animationSystem(systemArguments);
    animationSystem(systemArguments);
    animationSystem(systemArguments);
    let anim = player.getAnimations()['TEST_LOOP'];
    expect(anim.realFrameCount).toBe(0);
  });
});