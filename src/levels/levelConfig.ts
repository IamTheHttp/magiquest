import {IZone} from "../interfaces/levels.i";
import hasValue from "../gameEngine/utils/hasValue";
import {ZERO_ZERO} from "./0-0/0-0";
import {ZERO_ONE} from "./0-1/0-1";

// TODO this should be some interface
let levelConfig = {} as {
  [numLevel: number]: {
    areas: {
      [numArea: number]: IZone;
    }
  };
};


function processLevel(zone: IZone) {
  let [level, area] = zone.zoneID.split('-');
  if (hasValue(level) && hasValue(area)) {
    let numLevel = +level;
    let numArea = +area;

    levelConfig[numLevel] = levelConfig[numLevel] || {areas: {}};
    levelConfig[numLevel].areas[numArea] = zone;
  }
}

// TOOD create a live object based on these levels
function requireAllMapLevels() {
  processLevel(ZERO_ZERO);
  processLevel(ZERO_ONE)

  //
  // // @ts-ignore
  // let ctx = require.context('levels', true, /\.ts$/);
  //
  // ctx.keys().forEach((path: string) => {
  //   let name = path.replace('./', '').replace('.ts', '');
  //
  //   let [dir, file] = name.split('/');
  //   if (file) {
  //     let [level, area] = file.split('-');
  //
  //     if (hasValue(level) && hasValue(area)) {
  //       let numLevel = +level;
  //       let numArea = +area;
  //       levelConfig[numLevel] = levelConfig[numLevel] || {areas: {}};
  //       levelConfig[numLevel].areas[numArea] = ctx(path).default;
  //     }
  //   }
  // });
}

requireAllMapLevels();

export default levelConfig;