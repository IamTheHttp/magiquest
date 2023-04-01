import createSystemArgs from '../../__TEST__UTILS__/createTestSystemArguments';
import SpyFns, {fn} from '../../__TEST__UTILS__/SpyFns';
import {ISystemArguments} from '../../../src/interfaces/IGameLoop';
import createTestPlayer from '../../__TEST__UTILS__/createTestPlayer';
import {Entity} from 'game-platform';
import renderSystem from '../../../src/gameEngine/systems/renderSystem';

describe('Tests for the Render system', () => {
  let systemArguments: ISystemArguments;
  let spyPan: fn;
  let spyClear: fn;
  let spyAddImage: fn;
  let spyDraw: fn;
  let spyDrawRect: fn;

  beforeEach(() => {
    Entity.reset();
    spyPan = jest.fn();
    spyClear = jest.fn();
    spyAddImage = jest.fn();
    spyDraw = jest.fn();
    spyDrawRect = jest.fn();
    systemArguments = createSystemArgs(
      new SpyFns(spyPan, spyClear, spyAddImage, spyDraw, null, spyDrawRect)
    ) as ISystemArguments;
  });

  it('doesnt break with no ents', () => {
    Entity.reset();
    renderSystem(systemArguments);
  });

  it('Given the mock map we use for tests, we should have 9 items painted', () => {
    renderSystem(systemArguments);
    expect(spyAddImage.mock.calls.length).toBe(9);

    // expect the first thing to render, to be the background layer
    expect(spyDraw.mock.calls[0][0]).toBe('background');

    // expect the second thing to clear, to be the background layer (as the first is without arguments
    expect(spyClear.mock.calls[1][0]).toBe('background');
  });

  it('Does not render background if was not requested', () => {
    systemArguments.shouldRenderBackground = false;

    renderSystem(systemArguments);
    expect(spyAddImage.mock.calls.length).toBe(0);
  });

  it('Does not render a very far away Entity', () => {
    Entity.reset(); // remove all others
    createTestPlayer(5000, 5000);
    renderSystem(systemArguments);

    // nothing to render, as it's too far - the "1" expected here is the HUD item which is always shown
    expect(spyAddImage.mock.calls.length).toBe(1);
  });
});
