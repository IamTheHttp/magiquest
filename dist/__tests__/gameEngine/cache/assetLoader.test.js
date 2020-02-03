import { Entity } from 'gameEngine/BaseEntity';
import { assetLoader } from 'cache/assetLoader';
describe('Tests the placeLevelEntities util', function () {
    beforeEach(function () {
        // setup the test
        Entity.reset();
        global.Image = /** @class */ (function () {
            function Image() {
                var _this = this;
                setTimeout(function () {
                    _this.onload();
                }, 100);
            }
            return Image;
        }());
    });
    it('Loads assets', function (done) {
        var requests;
        var onReady = function () {
            expect(assetLoader.getAsset('asset_name')).toBeDefined();
            expect(assetLoader.getAsset('asset_name').src).toBe('http://test.com/foobar');
            expect(requests.length).toBe(1);
            done();
        };
        requests = assetLoader.load([{
                type: 'image',
                name: 'asset_name',
                url: 'http://test.com/foobar'
            }], onReady);
        expect(function () {
            // no cache yet
            assetLoader.getAsset('asset_name');
        }).toThrow();
    });
    it('Do not load invalid asset types', function () {
        var requests = assetLoader.load([{
                type: 'zzzz',
                name: 'asset_name',
                url: 'http://test.com/foobar'
            }], function () { });
        expect(requests.length).toBe(0);
    });
});
