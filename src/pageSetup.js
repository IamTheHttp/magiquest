// Load RAF polyfill
import './polyfill/rAF.js';
import React from 'react';
import {render} from 'react-dom';
import App from './ui/App';
import './style.scss';
import tiles from './assets/tileSet.png';
import charSpriteURL from 'assets/characters.png';
import {loader} from 'cache/loader';



let appDiv = document.getElementById('app') || document.createElement('div');
appDiv.innerHTML = 'Loading game assets...';
appDiv.className = 'loaded';
document.body.removeChild(document.getElementById('progress'));

loader.load([
  {
    type: 'image',
    url: tiles,
    name: tiles
  },
  {
    type: 'image',
    url: charSpriteURL,
    name: charSpriteURL
  }
], () => {
  render(<App/>, document.getElementById('app'));
});



