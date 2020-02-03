import GAME_PLATFORM from 'game-platform/dist';
import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';
import { DIRECTIONS } from 'gameConstants';
import Player from 'entities/Player';
import IsMoving from 'components/IsMoving';
import { POSITION_COMP } from 'components/ComponentNamesConfig';
import moveSystem from 'systems/moveSystem';
var Entity = GAME_PLATFORM.Entity;
describe('move system tests', function () {
    var systemArguments, spyPan, player;
    beforeEach(function () {
        Entity.reset();
        spyPan = jest.fn();
        systemArguments = createSystemArgs({ spyPan: spyPan });
        player = new Player({
            col: 0,
            row: 0,
            radius: 16
        });
    });
    it('doesnt break without entities', function () {
        moveSystem(systemArguments);
    });
    it('moves an entity', function () {
        player.addComponent(new IsMoving());
        player.setDestTo(DIRECTIONS.DOWN);
        moveSystem(systemArguments);
        // Dest + move = Check position was changed.
        expect(player.getPos().y).toBeGreaterThan(16);
        // expect originX to still be 16 (where we started)
        expect(player[POSITION_COMP].originX).toBe(16);
        while (player[POSITION_COMP].originY) {
            moveSystem(systemArguments);
        }
        // dest reached
        expect(player.getPos().y).toBe(48);
        expect(player[POSITION_COMP].originX).toBe(null);
    });
    it('Test trying to move out of screen', function () {
        player.addComponent(new IsMoving());
        player.setDestTo(DIRECTIONS.LEFT);
        moveSystem(systemArguments);
        // we can't move to the edge of screen, equal to edge of screen
        expect(spyPan.mock.calls.length).toBe(0);
        expect(player[POSITION_COMP].originX).toBe(null);
        expect(player[POSITION_COMP].originY).toBe(null);
        expect(player.getDest().y).toBe(null);
    });
    it('Test movement with a direction instead of X,Y', function () {
        player.setMoveDirection(DIRECTIONS.DOWN);
        expect(player.getDest().y).toBe(null);
        moveSystem(systemArguments);
        expect(player.getDest().y).toBe(48); // since we start at 16 16 and go one tile down
        while (player.getDest().y) {
            moveSystem(systemArguments);
        }
        expect(player.getDest().y).toBe(null); // dest reached
    });
    it('Nothing breaks if no direction, and no destination', function () {
        player.addComponent(new IsMoving());
        moveSystem(systemArguments);
        expect(player.isMoving()).toBeFalsy();
        expect(player.getDest().x).toBe(null);
    });
    it('Test moving over a mountain (two steps down in our mock data)', function () {
        player.addComponent(new IsMoving());
        player.setDestTo(DIRECTIONS.DOWN);
        // move one tile down
        while (player.getDest().y) {
            moveSystem(systemArguments);
        }
        player.addComponent(new IsMoving());
        player.setDestTo(DIRECTIONS.DOWN);
        // move two tiles down
        while (player.getDest().y) {
            moveSystem(systemArguments);
        }
        // try a third move down (we can't, there's a mountain there)
        player.addComponent(new IsMoving());
        player.setDestTo(DIRECTIONS.DOWN);
        var currY = player.getPos().y;
        // move two tiles down
        while (player.getDest().y) {
            moveSystem(systemArguments);
        }
        // no movement, as we can't go through a mountain
        expect(player.getPos().y).toBe(currY);
    });
});
