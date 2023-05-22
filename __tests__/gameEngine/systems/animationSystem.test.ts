import animationSystem from '../../../src/gameEngine/systems/animationSystem';
import createSystemArgs from '../../__TEST__UTILS__/createTestSystemArguments';
import SpyFns from '../../__TEST__UTILS__/SpyFns';
import {ISystemArguments} from '../../../src/interfaces/IGameLoop';
import createTestPlayer from '../../__TEST__UTILS__/createTestPlayer';
import {Entity} from 'game-platform';
import {getSpriteCrop} from '../../../src/gameEngine/utils/getSpriteCrop';

describe('Tests for the Animation system', () => {
  let systemArguments: ISystemArguments;
  let spyPan;

  beforeEach(() => {
    Entity.reset();
    spyPan = jest.fn();
    systemArguments = createSystemArgs(new SpyFns(spyPan)) as ISystemArguments;
  });

  it('doesnt break with no ents', () => {
    animationSystem(systemArguments);
  });

  it('Adds a and runs a simple animation', () => {
    const player = createTestPlayer(0, 0);
    player.addAnimationToRun({
      animationDurationInTicks: 5, // arbitrary for tests
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

    expect(player.getRunningAnimations().TEST_ANIMATION.ticksRunning).toBe(0);

    animationSystem(systemArguments);
    expect(player.getRunningAnimations().TEST_ANIMATION.ticksRunning).toBe(1);
  });

  it('Advances a single frame when run', () => {
    // Add a player...
    // Set Direction

    const player = createTestPlayer(0, 0);

    player.addAnimationToRun(player.getPossibleAnimations().MOVE_RIGHT);
    expect(player.getRunningAnimations().MOVE_RIGHT.ticksRunning).toBe(0);

    animationSystem(systemArguments);
    expect(player.getRunningAnimations().MOVE_RIGHT.ticksRunning).toBe(1);
  });

  it('Animation will run its course successfully', () => {
    const player = createTestPlayer(0, 0);
    player.addAnimationToRun(player.getPossibleAnimations().MOVE_RIGHT);

    // animation duration (in frames) is related to the frame count it takes to move 32 pixels
    // run all the frames
    let i = 0;
    while (player.getRunningAnimations().MOVE_RIGHT) {
      const anim = player.getRunningAnimations().MOVE_RIGHT;
      expect(anim.ticksRunning).toBe(i);

      animationSystem(systemArguments);
      i++;
    }
  });

  it('Animation will loop when over if so configured', () => {
    const player = createTestPlayer(0, 0);

    player.addAnimationToRun({
      loops: true,
      frames: [{}, {}],
      animationDurationInTicks: 2,
      animationName: 'TEST_LOOP'
    });

    // animation duration (in frames) is related to the frame count it takes to move 32 pixels

    animationSystem(systemArguments);
    animationSystem(systemArguments);
    animationSystem(systemArguments);
    const anim = player.getRunningAnimations().TEST_LOOP;
    expect(anim.ticksRunning).toBe(0);
  });
});
