import GAME_PLATFORM from 'game-platform/dist';
import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';
import Player from 'gameEngine/entities/Player';
import attackSystem from 'gameEngine/systems/attackSystem';
import IsAttackingComp from 'gameEngine/components/IsAttacking';
import { IS_ATTACKING_COMP, HEALTH_COMP, ATTACK_COMP } from 'gameEngine/components/ComponentNamesConfig';
import Sentry from 'gameEngine/entities/Sentry';
import updateMapTileIdx from 'gameEngine/utils/systemUtils/move/updateMapTileIdx';
var Entity = GAME_PLATFORM.Entity;
describe('attack system tests', function () {
    var systemArguments, spyPan;
    /**
     * @type {Player}
     * @extends Entity
     */
    var player;
    beforeEach(function () {
        Entity.reset();
        spyPan = jest.fn();
        systemArguments = createSystemArgs({ spyPan: spyPan });
        player = new Player({
            col: 0,
            row: 0,
            radius: 16
        });
        var _a = player.getPos(), x = _a.x, y = _a.y;
        updateMapTileIdx({ entity: player, tileIdxMap: systemArguments.tileIdxMap, newX: x, newY: y });
    });
    it('doesnt break without entities', function () {
        attackSystem(systemArguments);
    });
    it('attacks an empty tile without errors', function () {
        var targetTile = systemArguments.tileIdxMap['1-1'];
        player.addComponent(new IsAttackingComp(targetTile));
        attackSystem(systemArguments);
        // expect the player not to be attacking anymore
        expect(player.hasComponents(IS_ATTACKING_COMP)).toBe(false);
    });
    it('Cannot attack self', function () {
        var targetTile = systemArguments.tileIdxMap['0-0']; // 0-0 player position
        player.addComponent(new IsAttackingComp(targetTile));
        attackSystem(systemArguments);
        var maxHealth = player[HEALTH_COMP].max;
        var currentHealth = player[HEALTH_COMP].current;
        // expect no damage, as you can't attack yourself
        expect(maxHealth).toBeGreaterThan(0);
        expect(maxHealth).toBe(currentHealth);
    });
    it('Player cannot attack twice in a row, has to wait for cooldown', function () {
        var tileIdxMap = systemArguments.tileIdxMap;
        var targetTile = tileIdxMap['1-1'];
        var sentry = new Sentry({ col: 1, row: 1 });
        var _a = sentry.getPos(), x = _a.x, y = _a.y;
        updateMapTileIdx({ entity: sentry, tileIdxMap: tileIdxMap, newX: x, newY: y });
        var playerDmg = player[ATTACK_COMP].damage;
        var maxSentryHealth = sentry[HEALTH_COMP].max;
        var currentSentryHealth = sentry[HEALTH_COMP].current;
        // Sanity, expect health to be defined and set correctly
        expect(maxSentryHealth).toBe(currentSentryHealth);
        expect(maxSentryHealth).toBeGreaterThan(0);
        // start the attack
        player.addComponent(new IsAttackingComp(targetTile));
        attackSystem(systemArguments);
        // expect damage equal to the playerDmg
        expect(sentry[HEALTH_COMP].current).toBe(maxSentryHealth - playerDmg);
        // running the attack system again will not attack, as the cooldown is not done
        attackSystem(systemArguments);
        expect(sentry[HEALTH_COMP].current).toBe(maxSentryHealth - playerDmg);
    });
    it('Can kill an enemy', function () {
        var tileIdxMap = systemArguments.tileIdxMap;
        var targetTile = tileIdxMap['1-1'];
        var sentry = new Sentry({ col: 1, row: 1 });
        var _a = sentry.getPos(), x = _a.x, y = _a.y;
        updateMapTileIdx({ entity: sentry, tileIdxMap: tileIdxMap, newX: x, newY: y });
        // we add these new components to override the 'cooldown' inside them
        player.addComponent(new IsAttackingComp(targetTile));
        attackSystem(systemArguments);
        player.addComponent(new IsAttackingComp(targetTile));
        attackSystem(systemArguments);
        player.addComponent(new IsAttackingComp(targetTile));
        attackSystem(systemArguments);
        player.addComponent(new IsAttackingComp(targetTile));
        attackSystem(systemArguments);
        player.addComponent(new IsAttackingComp(targetTile));
        attackSystem(systemArguments);
        // expect the sentry to have no components (as it is destroyed)
        expect(sentry.components).toEqual({});
    });
    it('No longer attacks once the attack frames are done', function () {
        var tileIdxMap = systemArguments.tileIdxMap;
        var targetTile = tileIdxMap['1-1'];
        var sentry = new Sentry({ col: 1, row: 1 });
        var _a = sentry.getPos(), x = _a.x, y = _a.y;
        updateMapTileIdx({ entity: sentry, tileIdxMap: tileIdxMap, newX: x, newY: y });
        // we add these new components to override the 'cooldown' inside them
        player.addComponent(new IsAttackingComp(targetTile));
        var i = 0;
        while (i <= player[ATTACK_COMP].cooldownFrames) {
            attackSystem(systemArguments);
            i++;
        }
        ;
        // expect the sentry to have no components (as it is destroyed)
        expect(player.hasComponents(IS_ATTACKING_COMP)).toBe(false);
    });
});
