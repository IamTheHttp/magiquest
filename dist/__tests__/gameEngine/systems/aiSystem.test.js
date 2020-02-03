import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';
import aiSystem from 'systems/aiSystem';
import GAME_PLATFORM from 'game-platform/dist';
import moveSystem from 'systems/moveSystem';
import Sentry from 'entities/Sentry';
import IsMoving from 'components/IsMoving';
import Player from 'entities/Player';
import updateMapTileIdx from 'utils/systemUtils/move/updateMapTileIdx';
import { bit } from 'config';
import attackSystem from 'systems/attackSystem';
import { HEALTH_COMP } from 'components/ComponentNamesConfig';
var Entity = GAME_PLATFORM.Entity;
describe('Tests for the AI system', function () {
    var systemArguments, spyPan;
    beforeEach(function () {
        Entity.reset();
        spyPan = jest.fn();
        systemArguments = createSystemArgs({ spyPan: spyPan });
    });
    it('doesnt break with no ents', function () {
        aiSystem(systemArguments);
    });
    it('Moves the AI', function () {
        // position in the center, so it can move up down left or right
        var ent = new Sentry({ col: 1, row: 1 });
        aiSystem(systemArguments);
        moveSystem(systemArguments);
        var _a = ent.getPos(), x = _a.x, y = _a.y;
        var xOrYDiff = x !== 48 || y !== 48;
        expect(xOrYDiff).toBe(true);
    });
    it('doesnt move an already moving AI', function () {
        var ent = new Sentry({ col: 1, row: 1 });
        ent.addComponent(new IsMoving());
        aiSystem(systemArguments);
        moveSystem(systemArguments);
        var _a = ent.getPos(), x = _a.x, y = _a.y;
        var xOrYDiff = x !== 48 || y !== 48;
        expect(xOrYDiff).toBe(false);
    });
    it('Chases the player if within vision', function () {
        var player = new Player({ col: 0, row: 0 });
        updateMapTileIdx({ entity: player, tileIdxMap: systemArguments.tileIdxMap, newX: player.getPos().x, newY: player.getPos().y });
        var sentry = new Sentry({ col: 2, row: 1, vision: 200 });
        // in two moves, sentry should be next to the player
        aiSystem(systemArguments);
        while (sentry.isMoving()) {
            moveSystem(systemArguments);
        }
        aiSystem(systemArguments);
        while (sentry.isMoving()) {
            moveSystem(systemArguments);
        }
        var _a = player.getPos(), playerX = _a.x, playerY = _a.y;
        var _b = sentry.getPos(), x = _b.x, y = _b.y;
        // we expect to be a tile away from the player
        expect(x - playerX + y - playerY).toBe(bit);
        // now that the enemy stopped moving, lets run the system again to attack
        aiSystem(systemArguments);
        var currentHealth = player[HEALTH_COMP].current;
        var max = player[HEALTH_COMP].max;
        expect(currentHealth).toBe(max);
        // the attack system should now kick-in to attack the player
        attackSystem(systemArguments);
        currentHealth = player[HEALTH_COMP].current;
        expect(currentHealth).toBeLessThan(max);
    });
    it('Chase player right', function () {
        var player = new Player({ col: 2, row: 1 });
        updateMapTileIdx({ entity: player, tileIdxMap: systemArguments.tileIdxMap, newX: player.getPos().x, newY: player.getPos().y });
        var sentry = new Sentry({ col: 0, row: 1, vision: 200 });
        // in two moves, sentry should be next to the player
        aiSystem(systemArguments);
        while (sentry.isMoving()) {
            moveSystem(systemArguments);
        }
        aiSystem(systemArguments);
        while (sentry.isMoving()) {
            moveSystem(systemArguments);
        }
        var _a = player.getPos(), playerX = _a.x, playerY = _a.y;
        var _b = sentry.getPos(), x = _b.x, y = _b.y;
        // we expect to be a tile away from the player
        expect(Math.abs(x - playerX + y - playerY)).toBe(bit);
    });
    it('Chase player down', function () {
        var player = new Player({ col: 0, row: 2 });
        updateMapTileIdx({ entity: player, tileIdxMap: systemArguments.tileIdxMap, newX: player.getPos().x, newY: player.getPos().y });
        var sentry = new Sentry({ col: 0, row: 0, vision: 200 });
        // in two moves, sentry should be next to the player
        aiSystem(systemArguments);
        while (sentry.isMoving()) {
            moveSystem(systemArguments);
        }
        aiSystem(systemArguments);
        while (sentry.isMoving()) {
            moveSystem(systemArguments);
        }
        var _a = player.getPos(), playerX = _a.x, playerY = _a.y;
        var _b = sentry.getPos(), x = _b.x, y = _b.y;
        // we expect to be a tile away from the player
        expect(Math.abs(x - playerX + y - playerY)).toBe(bit);
    });
    it('Should only attack adjacent tile (Non aligned entities)', function () {
        /**
         * @type {BaseEntity}
         */
        var player = new Player({ col: 0, row: 0 });
        updateMapTileIdx({ entity: player, tileIdxMap: systemArguments.tileIdxMap, newX: player.getPos().x, newY: player.getPos().y });
        /**
         * @type {BaseEntity}
         */
        var sentry = new Sentry({
            col: 1,
            row: 1,
            vision: 200
        });
        // since both X and Y are different, no attack is possible
        aiSystem(systemArguments);
        var currentHealth = player[HEALTH_COMP].current;
        var max = player[HEALTH_COMP].max;
        expect(currentHealth).toBe(max);
        // the attack system should now kick in to attack the player
        attackSystem(systemArguments);
        currentHealth = player[HEALTH_COMP].current;
        expect(currentHealth).toBe(max);
    });
});
