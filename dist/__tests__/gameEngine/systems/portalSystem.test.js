import GAME_PLATFORM from 'game-platform/dist';
import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';
import Player from 'entities/Player';
import portalSystem from 'gameEngine/systems/portalSystem';
import { getTileIdxByEnt } from 'gameEngine/utils/componentUtils/tileUtils/getTileIdx';
var Entity = GAME_PLATFORM.Entity;
describe('Tests for the AI system', function () {
    var systemArguments, spyHandleAreaChange, player;
    beforeEach(function () {
        Entity.reset();
        spyHandleAreaChange = jest.fn();
        player = new Player({
            col: 0,
            row: 0,
            radius: 16
        });
        systemArguments = createSystemArgs({ spyHandleAreaChange: spyHandleAreaChange });
    });
    it('doesnt break with no portals to run', function () {
        portalSystem(systemArguments);
    });
    it('triggers the handleAreaChange if player is on a tile with a correct trigger on it', function () {
        var idx = getTileIdxByEnt(player);
        systemArguments.levelArea.triggers.move[idx] = {
            level: 99,
            area: 66,
            type: 'portal'
        };
        portalSystem(systemArguments);
        expect(spyHandleAreaChange.mock.calls[0][0]).toBe(99);
        expect(spyHandleAreaChange.mock.calls[0][1]).toBe(66);
    });
});
