import { Entity } from 'gameEngine/BaseEntity';
import { assetLoader } from 'cache/assetLoader';



describe('Tests the placeLevelEntities util', () => {
  beforeEach(() => {
    // setup the test
    Entity.reset();
    global.Image = class {
      constructor() {
        setTimeout(() => {
          this.onload();
        }, 100);
      }
    }
  });

  it ('Loads assets', (done) => {
    let requests;
    let onReady = () => {
      expect(assetLoader.getAsset('asset_name')).toBeDefined();
      expect(assetLoader.getAsset('asset_name').src).toBe('http://test.com/foobar');

      expect(requests.length).toBe(1);

      done();
    };
    requests = assetLoader.load([{
      type:'image',
      name: 'asset_name',
      url: 'http://test.com/foobar'
    }], onReady);

    expect(() => {
      // no cache yet
      assetLoader.getAsset('asset_name');
    }).toThrow(); 
  });

  it ('Do not load invalid asset types', () => {
    let requests = assetLoader.load([{
      type:'zzzz',
      name: 'asset_name',
      url: 'http://test.com/foobar'
    }], () => {});

    expect(requests.length).toBe(0);
  });
}); 