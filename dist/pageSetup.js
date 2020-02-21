// Load RAF polyfill
import './polyfill/rAF.ts';
import * as React from 'react';
import { render } from 'react-dom';
import App from './ui/App';
import './style.scss';
import tiles from 'assets/tileSet.png';
import charSpriteURL from 'assets/characters.png';
import sentrySpriteURL from 'assets/sentry.png';
import miscURL from 'assets/misc.png';
import { assetLoader } from 'cache/assetLoader';
if (!document.getElementById('app')) {
    var div = document.createElement('div');
    div.id = 'app';
    document.body.appendChild(div);
}
if (!document.getElementById('progress')) {
    var div = document.createElement('div');
    div.id = 'progress';
    document.body.appendChild(div);
}
var appDiv = document.getElementById('app');
appDiv.innerHTML = 'Loading game assets...';
appDiv.className = 'loaded';
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
    },
    {
        type: 'image',
        url: miscURL,
        name: miscURL
    }
], function () {
    document.body.removeChild(document.getElementById('progress'));
    render(React.createElement(App, null), document.getElementById('app'));
});
