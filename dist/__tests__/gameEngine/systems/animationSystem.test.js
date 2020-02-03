var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import animationSystem from '../../../src/gameEngine/systems/animationSystem';
import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';
import GAME_PLATFORM from 'game-platform/dist';
import Player from 'entities/Player';
import getSpriteCrop from 'utils/getSpriteCrop';
var Entity = GAME_PLATFORM.Entity;
describe('Tests for the Animation system', function () {
    var systemArguments, spyPan;
    beforeEach(function () {
        Entity.reset();
        spyPan = jest.fn();
        systemArguments = createSystemArgs({ spyPan: spyPan });
    });
    it('doesnt break with no ents', function () {
        animationSystem(systemArguments);
    });
    it('Adds a and runs a simple animation', function () {
        var player = new Player({ col: 0, row: 0 });
        player.addAnimation({
            frames: [
                __assign({ spriteURL: 'some_URL' }, getSpriteCrop(0, 1)),
                __assign({ spriteURL: 'some_URL' }, getSpriteCrop(3, 1))
            ],
            animationName: 'TEST_ANIMATION',
            loops: false
        });
        expect(player.getAnimations()['TEST_ANIMATION'].realFrameCount).toBe(0);
        animationSystem(systemArguments);
        expect(player.getAnimations()['TEST_ANIMATION'].realFrameCount).toBe(1);
    });
    it('Advances a single frame when run', function () {
        // Add a player...
        // Set Direction
        var player = new Player({ col: 0, row: 0 });
        player.addAnimation(player.getAnimationTypes()['MOVE_RIGHT']);
        expect(player.getAnimations()['MOVE_RIGHT'].realFrameCount).toBe(0);
        animationSystem(systemArguments);
        expect(player.getAnimations()['MOVE_RIGHT'].realFrameCount).toBe(1);
    });
    it('Animation will run its course successfully', function () {
        var player = new Player({ col: 0, row: 0 });
        player.addAnimation(player.getAnimationTypes()['MOVE_RIGHT']);
        // animation duration (in frames) is related to the frame count it takes to move 32 pixels
        // run all the frames
        var i = 0;
        while (player.getAnimations()['MOVE_RIGHT']) {
            var anim = player.getAnimations()['MOVE_RIGHT'];
            expect(anim.realFrameCount).toBe(i);
            animationSystem(systemArguments);
            i++;
        }
    });
    it('Animation will loop when over if so configured', function () {
        var player = new Player({ col: 0, row: 0 });
        player.addAnimation({
            loops: true,
            frames: [{}, {}],
            animationDuration: 2,
            animationName: 'TEST_LOOP'
        });
        // animation duration (in frames) is related to the frame count it takes to move 32 pixels
        animationSystem(systemArguments);
        animationSystem(systemArguments);
        animationSystem(systemArguments);
        var anim = player.getAnimations()['TEST_LOOP'];
        expect(anim.realFrameCount).toBe(0);
    });
});
