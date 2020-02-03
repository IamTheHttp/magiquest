import GAME_PLATFORM from 'game-platform/dist';
import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';
import Player from 'gameEngine/entities/Player';
import userInputSystem, { pushAction } from 'gameEngine/systems/userInputSystem';
import { MOVE_ACTION, DIRECTIONS } from 'gameEngine/gameConstants';
var Entity = GAME_PLATFORM.Entity;
describe('Tests for the AI system', function () {
    var systemArguments, spyPan, player, NPC;
    beforeEach(function () {
        Entity.reset();
        spyPan = jest.fn();
        player = new Player({
            col: 0,
            row: 0,
            radius: 16
        });
        systemArguments = createSystemArgs({ spyPan: spyPan });
    });
    it('Runs without actions', function () {
        userInputSystem(systemArguments);
    });
    it('Adds an non-existent action type', function () {
        pushAction({
            name: 'foo'
        });
        userInputSystem(systemArguments);
    });
    it('Performs a move action', function () {
        //some sanity
        expect(player.getMoveDirection()).toBeUndefined();
        pushAction({
            name: MOVE_ACTION,
            direction: DIRECTIONS.DOWN
        });
        userInputSystem(systemArguments);
        expect(player.getMoveDirection()).toBe(DIRECTIONS.DOWN);
    });
});
