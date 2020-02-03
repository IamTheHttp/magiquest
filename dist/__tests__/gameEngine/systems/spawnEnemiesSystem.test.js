import GAME_PLATFORM from 'game-platform/dist';
import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';
import Player from 'entities/Player';
import spawnEnemiesSystem from 'gameEngine/systems/spawnEnemiesSystem';
import { AI_CONTROLLED_COMP } from 'gameEngine/components/ComponentNamesConfig';
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
    it('Attempts to spawn enemies on the map', function () {
        expect(Entity.getByComps(AI_CONTROLLED_COMP).length).toBe(0);
        spawnEnemiesSystem(systemArguments);
        expect(Entity.getByComps(AI_CONTROLLED_COMP).length).toBeGreaterThan(0);
    });
    it('Can safely not create any enemies', function () {
        global.Math.random = function () {
            return 1; // prevents all spawns from being created
        };
        expect(Entity.getByComps(AI_CONTROLLED_COMP).length).toBe(0);
        spawnEnemiesSystem(systemArguments);
        expect(Entity.getByComps(AI_CONTROLLED_COMP).length).toBe(0);
    });
});
