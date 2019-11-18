// Load RAF polyfill
import './polyfill/rAF.js';
import React from 'react';
import {render} from 'react-dom';
import App from './ui/App';
import './style.scss';
import tiles from './assets/tileSet.png';
import charSpriteURL from 'assets/characters.png';
import sentrySpriteURL from 'assets/sentry.png';
import {assetLoader} from 'cache/assetLoader';



let appDiv = document.getElementById('app') || document.createElement('div');
appDiv.innerHTML = 'Loading game assets...';
appDiv.className = 'loaded';
document.body.removeChild(document.getElementById('progress'));

assetLoader.load([
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
  }
], () => {
  render(<App/>, document.getElementById('app'));
});