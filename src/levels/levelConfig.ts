import {ILevelArea} from "../interfaces/levels.i";

// TODO move to some util
function hasValue(x: any) {
  return typeof x !== 'undefined' && typeof x !== null;
}

// TODO this should be some interface
let levelConfig = {} as {
  [numLevel: number]: {
    areas: {
      [numArea: number]: ILevelArea;
    }
  };
};


// TOOD create a live object based on these levels
function requireAllMapLevels() {
  let ctx = require.context('levels', true, /\.ts$/);

  ctx.keys().forEach((path) => {
    let name = path.replace('./', '').replace('.ts', '');

    let [dir, file] = name.split('/');
    if (file) {
      let [level, area] = file.split('-');

      if (hasValue(level) && hasValue(area)) {
        let numLevel = +level;
        let numArea = +area;
        levelConfig[numLevel] = levelConfig[numLevel] || {areas: {}};
        levelConfig[numLevel].areas[numArea] = ctx(path).default;
      }
    }
  });
}

requireAllMapLevels();

export default levelConfig;