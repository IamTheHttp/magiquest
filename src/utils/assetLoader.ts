import assertType from 'gameEngine/utils/assertType';

interface Asset {
  type: 'image';
  url: string;
  name: string;
}

class AssetLoader {
  cache: {[key: string]: HTMLImageElement};

  constructor() {
    this.cache = {};
  }

  load(assets: Asset[], onReady: () => void) {
    assertType(assets.length, 'assets length', 'number');
    const requests = [];

    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i];
      if (asset.type === 'image') {
        requests.push(
          new Promise((resolve) => {
            const img = new Image();
            img.src = asset.url;

            img.onload = (e) => {
              this.cache[asset.name.replace('./', '')] = img;
              resolve(null);
            };
          })
        );
      }
    }

    Promise.all(requests).then(() => {
      onReady();
    });

    return requests;
  }

  getAsset(name: string) {
    /**
     * This is a hacky fix to address that any test running assetLoader.getAsset() will fail, we're not loading
     * the assets first in tests, and the URLs coming from the import statements are empty
     * (Since webpack is responsible for filling those)
     *
     * When running the actual app, Loading the assets happens in the index file
     * Tests skip this file, causing a cache miss that results in an exception.
     *
     * The real fix here is to somehow pass getAssets as a dependency
     * and not letting any underlying system or util access
     * this function directly (only through the dependency injection)
     */
    if (global.process && global.process?.env?.NODE_ENV === 'test' && typeof name !== 'string') {
      return new Image();
    }

    // TODO can we optimize this? it seems like we're calling this a lot...
    const ASSET_NAME = name.replace('src/assets/', '').replace('./', '');
    if (!this.cache[ASSET_NAME]) {
      throw Error(`Cannot get asset that was not loaded before hand, assetName attempted: ${ASSET_NAME}`);
    }
    return this.cache[ASSET_NAME];
  }
}

const assetLoader = new AssetLoader();
export {assetLoader};
