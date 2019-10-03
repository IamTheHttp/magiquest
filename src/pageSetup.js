// Load RAF polyfill
import './polyfill/rAF.js';
import React from 'react';
import {render} from 'react-dom';
import App from './ui/App';
import './style.scss';

let appDiv = document.getElementById('app') || document.createElement('div');
appDiv.innerHTML = 'Loading game assets...';
appDiv.className = 'loaded';
document.body.removeChild(document.getElementById('progress'));


render(<App/>, document.getElementById('app'));