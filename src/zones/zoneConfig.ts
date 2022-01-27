import {IZone} from '../interfaces/zones.i';
import hasValue from '../gameEngine/utils/hasValue';
import {ZERO_ZERO} from './0-0/0-0';
import {ZERO_ONE} from './0-1/0-1';

// TODO this should be some interface
let zoneConfig = {} as {
  [numAct: number]: {
    chapters: {
      [numChapter: number]: IZone;
    };
  };
};

function processLevel(zone: IZone) {
  let [act, chapter] = zone.zoneID.split('-');
  if (hasValue(act) && hasValue(chapter)) {
    let numAct = +act;
    let numChapter = +chapter;

    zoneConfig[numAct] = zoneConfig[numAct] || {chapters: {}};
    zoneConfig[numAct].chapters[numChapter] = zone;
  }
}

// TOOD create a live object based on these levels
function requireAllMapLevels() {
  processLevel(ZERO_ZERO);
  processLevel(ZERO_ONE);

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

export {zoneConfig};
