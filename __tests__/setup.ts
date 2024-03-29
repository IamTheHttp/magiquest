import * as util from 'util';

// ref: https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
// ref: https://github.com/jsdom/jsdom/issues/2524
Object.defineProperty(window, 'TextEncoder', {
  writable: true,
  value: util.TextEncoder
});
Object.defineProperty(window, 'TextDecoder', {
  writable: true,
  value: util.TextDecoder
});

// Based on this
// https://stackoverflow.com/questions/52612122/how-to-use-jest-to-test-functions-using-crypto-or-window-mscrypto
const nodeCrypto = require('crypto');
// @ts-ignore
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: (...args: any) => {
      return nodeCrypto.randomUUID.apply(nodeCrypto, args);
    }
  }
});
