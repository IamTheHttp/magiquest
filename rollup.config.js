import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import json from '@rollup/plugin-json';
import scss from 'rollup-plugin-scss';
import commonjs from 'rollup-plugin-commonjs';
import replace from '@rollup/plugin-replace';
import url from '@rollup/plugin-url';
import copy from 'rollup-plugin-copy'
import react from 'react';
import reactDom from 'react-dom';
import includePaths from 'rollup-plugin-includepaths';
import requireContext from 'rollup-plugin-require-context';

export default [{
  input: 'src/index.tsx',
  output: [{
    file: "dist/index.js",
    format: 'iife'
  }],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    includePaths({ paths: ["./src", "."] }),
    json(),
    resolve(),
    scss(), // will output compiled styles to output.css
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
    copy({
      targets: [
        { src: 'html/index.html', dest: 'dist' },
      ]
    }),
    typescript({target: "es5"}),
    requireContext(),

  ]
}];

