import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';
import GAME_PLATFORM from 'game-platform/dist';
import renderSystem from 'systems/renderSystem';
import Player from 'entities/Player';
var Entity = GAME_PLATFORM.Entity;
describe('Tests for the Render system', function () {
    var systemArguments;
    var spyPan;
    var spyClear;
    var spyAddImage;
    var spyDraw;
    beforeEach(function () {
        Entity.reset();
        spyPan = jest.fn();
        spyClear = jest.fn();
        spyAddImage = jest.fn();
        spyDraw = jest.fn();
        systemArguments = createSystemArgs({ spyPan: spyPan, spyClear: spyClear, spyAddImage: spyAddImage, spyDraw: spyDraw });
    });
    it('doesnt break with no ents', function () {
        Entity.reset();
        renderSystem(systemArguments);
    });
    it('Given the mock map we use for tests, we should have 9 items painted', function () {
        renderSystem(systemArguments);
        expect(spyAddImage.mock.calls.length).toBe(9);
        // expect the first thing to render, to be the background layer
        expect(spyDraw.mock.calls[0][0]).toBe('background');
        // expect the second thing to clear, to be the background layer (as the first is without arguments
        expect(spyClear.mock.calls[1][0]).toBe('background');
    });
    it('Does not render background if was not requested', function () {
        systemArguments.shouldRenderBackground = false;
        renderSystem(systemArguments);
        expect(spyAddImage.mock.calls.length).toBe(0);
    });
    it('Does not render a very far away Entity', function () {
        Entity.reset(); // remove all others
        new Player({ col: 5000, row: 5000 }); // add one player
        renderSystem(systemArguments);
        // nothing to render, as it's too far
        expect(spyAddImage.mock.calls.length).toBe(0);
    });
});
