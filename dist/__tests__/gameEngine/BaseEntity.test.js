import BaseEntity from 'BaseEntity';
describe('Tests the Base Entity', function () {
    var entity;
    beforeEach(function () {
        // setup the test
        entity = new BaseEntity('foo');
    });
    it('can get pos even if no pos component exists', function () {
        entity.getPos();
    });
});
