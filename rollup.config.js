import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import json from '@rollup/plugin-json';
import scss from 'rollup-plugin-scss';
import commonjs from 'rollup-plugin-commonjs';
import replace from '@rollup/plugin-replace';
import url from '@rollup/plugin-url';
import html, {makeHtmlAttributes} from '@rollup/plugin-html';
import react from 'react';
import reactDom from 'react-dom';
import includePaths from 'rollup-plugin-includepaths';
import importGlob from '@jackfranklin/rollup-plugin-import-glob';

const template = async ({attributes, files, meta, publicPath, title}) => {
  const scripts = (files.js || [])
    .map(({fileName}) => {
      const attrs = makeHtmlAttributes(attributes.script);
      return `<script src="${publicPath}${fileName}"${attrs}></script>`;
    })
    .join('\n');

  const links = (files.css || [])
    .map(({fileName}) => {
      const attrs = makeHtmlAttributes(attributes.link);
      return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
    })
    .join('\n');
  const metas = meta
    .map((input) => {
      const attrs = makeHtmlAttributes(input);
      return `<meta${attrs}>`;
    })
    .join('\n');
  return `
<!doctype html>
<html${makeHtmlAttributes(attributes.html)}>
  <head>
    ${metas}
    <title>${title}</title>
    <link rel="stylesheet" href="./index.css" />
    ${links}
  </head>
  <body>
    <div id="progress"></div>
    <div id="app" class="loading">Initializing Game</div>
    ${scripts}
  </body>
</html>`;
};

export default [
  {
    watch: {
      exclude: './src/data/**/*'
    },
    input: 'src/index.tsx',
    output: [
      {
        file: 'dist/index.js',
        format: 'iife'
      }
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        preventAssignment: true
      }),
      includePaths({paths: ['./src', '.']}),
      json(),
      resolve(),
      scss({}), // will output compiled styles to output.css
      commonjs({
        namedExports: {
          react: Object.keys(react),
          'react-dom': Object.keys(reactDom)
        }
      }),
      url({
        limit: 0,
        publicPath: './',
        fileName: '[name][extname]',
        destDir: 'dist'
      }),
      typescript({target: 'es5'}),
      importGlob(),
      html({template, meta: [], title: 'Magic Quest'})
    ]
  }
];
