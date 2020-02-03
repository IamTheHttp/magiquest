import GAME_PLATFORM from 'game-platform/dist';
import placeLevelTerrainTiles from 'gameEngine/utils/placeLevelTerrainTiles';
import { CHARACTERS } from 'gameEngine/gameConstants';
var Entity = GAME_PLATFORM.Entity;
function createSystemArgs(_a) {
    var spyPan = _a.spyPan, spyClear = _a.spyClear, spyAddImage = _a.spyAddImage, spyDraw = _a.spyDraw, spyHandleAreaChange = _a.spyHandleAreaChange;
    var tileMap = [
        [1, 1, 1],
        [1, 1, 1],
        [0, 1, 1],
    ];
    var viewSize = {
        mapWidth: 32 * 3,
        mapHeight: 32 * 3
    };
    return {
        Entity: Entity,
        shouldRenderBackground: true,
        levelArea: {
            triggers: {
                move: {}
            }
        },
        mapAPI: {
            addImage: spyAddImage,
            draw: spyDraw,
            clear: spyClear,
            getPan: function () {
                return {
                    panX: 0,
                    panY: 0
                };
            },
            pan: spyPan
        },
        game: {
            requestBackgroundRender: function () {
            },
            notifyBackgroundWasRendered: function () {
            },
            handleAreaChange: spyHandleAreaChange
        },
        tileIdxMap: placeLevelTerrainTiles(tileMap, viewSize, [{
                chance: 1,
                enemy: CHARACTERS.SENTRY
            }]),
        viewSize: {
            mapWidth: 100,
            mapHeight: 100,
            viewWidth: 100,
            viewHeight: 100
        }
    };
}
export default createSystemArgs;
