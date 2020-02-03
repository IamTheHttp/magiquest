import assertType from 'gameEngine/utils/assertType';
var AssetLoader = /** @class */ (function () {
    function AssetLoader() {
        this.cache = {};
    }
    AssetLoader.prototype.load = function (assets, onReady) {
        var _this = this;
        assertType(assets.length, 'assets length', 'number');
        var requests = [];
        var _loop_1 = function (i) {
            var asset = assets[i];
            if (asset.type === 'image') {
                requests.push(new Promise(function (resolve) {
                    var img = new Image();
                    img.src = asset.url;
                    img.onload = function () {
                        _this.cache[asset.name] = img;
                        resolve();
                    };
                }));
            }
        };
        for (var i = 0; i < assets.length; i++) {
            _loop_1(i);
        }
        Promise.all(requests).then(function () {
            onReady();
        });
        return requests;
    };
    AssetLoader.prototype.getAsset = function (name) {
        if (!this.cache[name]) {
            throw Error("Cannot get asset that was not loaded before hand, assetName attempted: " + name);
        }
        return this.cache[name];
    };
    return AssetLoader;
}());
var assetLoader = new AssetLoader();
export default AssetLoader;
export { assetLoader };
