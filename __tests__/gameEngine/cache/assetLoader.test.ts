import {assetLoader} from '../../../src/utils/assetLoader';

import {Entity} from 'game-platform';

let global2 = global as any; // TODO Should this be any?

describe('Tests for the assetLoader', () => {
  beforeEach(() => {
    // set up the test
    Entity.reset();
    global2.Image = class {
      onload: () => {};
      constructor() {
        setTimeout(() => {
          this.onload();
        }, 100);
      }
    };
  });

  it('Loads assets', (done) => {
    const requests = assetLoader.load(
      [
        {
          type: 'image',
          name: 'asset_name',
          url: 'http://test.com/foobar'
        }
      ],
      () => {
        expect(assetLoader.getAsset('asset_name')).toBeDefined();
        expect(assetLoader.getAsset('asset_name').src).toBe('http://test.com/foobar');

        expect(requests.length).toBe(1);

        done();
      }
    );

    /**
     *     Commenting this out since for now, in tests, assetLoader.getAsset will always return something
     *     See assetLoader.getAsset for more information
     */
    // expect(() => {
    //   // no cache yet
    //   assetLoader.getAsset('asset_name');
    // }).toThrow();
  });

  it('Do not load invalid asset types', () => {
    let requests = assetLoader.load(
      [
        {
          type: 'imazz' as any, // force incorrect type for the test
          name: 'asset_name',
          url: 'http://test.com/foobar'
        }
      ],
      () => {}
    );

    expect(requests.length).toBe(0);
  });
});
