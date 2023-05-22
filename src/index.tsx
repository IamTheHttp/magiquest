// Load RAF polyfill
import '../.polyfills/rAF.ts';

import * as React from 'react';
import tiles from './assets/tileSet.png';
import charSpriteURL from './assets/player.png';
import sentrySpriteURL from './assets/generic_enemy.png';
import miscURL from './assets/misc.png';
import {assetLoader} from 'utils/assetLoader';
import {App} from './UIComponents/App/App';
import {createRoot} from 'react-dom/client';

/**
 * Get and parse all JSON files from data/placeableEntity and create a memory object to be passed into App and Game
 */
import {parsePlaceableEntityJSON} from './utils/parsePlaceableEntitiyJSON';
import {getAllPlaceableEntityJSONFiles} from './utils/getAllPlaceableEntityJSONFiles';
const placeableEntityDataMap = parsePlaceableEntityJSON(getAllPlaceableEntityJSONFiles());

if (!document.getElementById('app')) {
  const div = document.createElement('div');
  div.id = 'app';
  document.body.appendChild(div);
}

if (!document.getElementById('progress')) {
  const div = document.createElement('div');
  div.id = 'progress';
  document.body.appendChild(div);
}

document.title = 'MAGIQUEST!';

const appDiv = document.getElementById('app');
appDiv.innerHTML = 'Loading game assets...';
appDiv.className = 'loaded';

assetLoader.load(
  [
    {
      type: 'image',
      url: tiles,
      name: tiles
    },
    {
      type: 'image',
      url: charSpriteURL,
      name: charSpriteURL
    },
    {
      type: 'image',
      url: sentrySpriteURL,
      name: sentrySpriteURL
    },
    {
      type: 'image',
      url: miscURL,
      name: miscURL
    }
  ],
  () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<App placeableEntityDataMap={placeableEntityDataMap} />);

    document.body.removeChild(document.getElementById('progress'));
  }
);
