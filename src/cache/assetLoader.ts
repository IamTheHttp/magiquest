import assertType from 'gameEngine/utils/assertType';
import tiles from "../assets/tileSet.png";

interface Asset {
  type: 'image',
  url: string,
  name: string
}

class AssetLoader {
  cache: {[key: string]: HTMLImageElement};

  constructor() {
    this.cache = {};
  }

  load(assets: Asset[], onReady: () => void) {

    assertType(assets.length, 'assets length', 'number');
    let requests = [];

    for (let i = 0; i < assets.length; i++) {
      let asset = assets[i];
      if (asset.type === 'image') {
        requests.push(new Promise((resolve) => {
          console.log('pushing new asset', asset.url);
          let img = new Image();
          img.src = asset.url;

          img.onload = (e) => {
            this.cache[asset.name.replace('./', '')] = img;
            console.log('current cache', this.cache);

            resolve(null);
          };
        }));
      }
    }

    Promise.all(requests).then(() => {
      onReady();
    });

    return requests;
  }

  getAsset(name: string) {
    const ASSET_NAME = name.replace('src/assets/', '').replace('./', '');
    if (!this.cache[ASSET_NAME]) {
      throw Error(`Cannot get asset that was not loaded before hand, assetName attempted: ${ASSET_NAME}`);
    }
    console.log(ASSET_NAME, this.cache[ASSET_NAME]);
    return this.cache[ASSET_NAME];
  }
}

let assetLoader = new AssetLoader();
export {assetLoader};
