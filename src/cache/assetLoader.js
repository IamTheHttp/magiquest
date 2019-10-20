import assertType from 'utils/assertType';

class AssetLoader {
  constructor() {
    this.cache = {};
  }
  
  load(assets = [], onReady) {
    let requests = [];
    
    for (let i = 0; i < assets.length; i++) {
      requests.push(new Promise((resolve) => {
        let asset = assets[i];
        
        if (asset.type === 'image') {
          let img = new Image();
          img.src = asset.url;
          
          this.cache[asset.name] = img;
          
          img.onload = () => {
            resolve();
          };
        }
      }));
    }
    
    Promise.all(requests).then(() => {
      onReady();
    });
  }
  
  getAsset(name) {
    if (!this.cache[name]) {
      throw `Cannot get asset that was not loaded before hand, assetName attempted: ${name}`;
    }
    return this.cache[name];
  }
}

let assetLoader = new AssetLoader();
export default AssetLoader;
export {assetLoader};
