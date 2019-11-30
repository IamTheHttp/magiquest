import assertType from 'utils/assertType';

class AssetLoader {
  constructor() {
    this.cache = {};
  }
  
  load(assets, onReady) {
    assertType(assets.length, 'assets length', 'number');
    let requests = [];
    
    for (let i = 0; i < assets.length; i++) {
      let asset = assets[i];
      if (asset.type === 'image') {
        requests.push(new Promise((resolve) => {
          let img = new Image();
          img.src = asset.url;
          
          img.onload = () => {
            this.cache[asset.name] = img;

            resolve();
          };
        }));
      }
    }
    
    Promise.all(requests).then(() => {
      onReady();
    });

    return requests;
  }
  
  getAsset(name) {
    if (!this.cache[name]) {
      throw Error(`Cannot get asset that was not loaded before hand, assetName attempted: ${name}`);
    }
    return this.cache[name];
  }
}

let assetLoader = new AssetLoader();
export default AssetLoader;
export {assetLoader};
