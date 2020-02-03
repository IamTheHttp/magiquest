import createSystemArgs from '__tests__/__TEST__UTILS__/createSystemArguments';
import placeLevelEntities from 'utils/placeLevelEntities';
import { CHARACTERS } from 'gameConstants';
import { Entity } from 'BaseEntity';
import { ANIMATION_COMP } from 'components/ComponentNamesConfig';
describe('Tests the placeLevelEntities util', function () {
    beforeEach(function () {
        // setup the test
        Entity.reset();
    });
    it('places some entities', function () {
        var tileIdxMap = createSystemArgs({}).tileIdxMap;
        placeLevelEntities({
            entitiesToPlace: [
                {
                    type: CHARACTERS.FAM_NPC,
                    name: 'NPC_1',
                    pos: {
                        col: 2,
                        row: 2
                    }
                },
                {
                    type: CHARACTERS.SENTRY,
                    name: 'SENTRY_1',
                    pos: {
                        col: 2,
                        row: 2
                    }
                },
                {
                    type: 'UNKNOWN_TYPE_OMG',
                    name: 'SENTRY_1',
                    pos: {
                        col: 2,
                        row: 2
                    }
                }
            ],
        }, tileIdxMap);
        var entsPlaced = Entity.getByComps(ANIMATION_COMP);
        expect(entsPlaced.length).toBe(2); // and not 3
    });
});
