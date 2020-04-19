import {EXPERIENCE_COMP} from './ComponentNamesConfig';
import {XP_TO_FIRST_LEVEL} from "gameConstants";

// TODO add memoization
function getXPToLevel(level: number): number {
  if (level <= 1) {
    return 0;
  }
  if (level === 2) {
    return XP_TO_FIRST_LEVEL;
  }

  return 2 * getXPToLevel(level - 1);
}

class ExperienceComp {
  name: string;
  XP: number;
  level: number;
  XPtoNextLevel: number;

  constructor(level: number = 1, XP = 0) {
    this.name = EXPERIENCE_COMP;
    this.XP = XP;
    this.level = level;
    // this.XPtoNextLevel = getXPToLevel(level + 1) - this.XP; // to level 2
  }

  getLevelProgress() {
    // next level requirements e.g 5000
    // current level requirements e.g 2500
    // current XP = e.g 3000
    let XPtoNextLevel = getXPToLevel(this.level + 1);
    let XPtoCurrentLevel = getXPToLevel(this.level);
    let currentXP = this.XP; // 3000

    // xp over current level = 3000 - 2500 = 500
    let XPOverLastLevel = Math.max(currentXP - XPtoCurrentLevel, 0);

    // net xp between levels = 5000 - 2500 =  2500
    let netXPNeededToNextLevel = XPtoNextLevel - XPtoCurrentLevel;

    if (netXPNeededToNextLevel === 0) {
      return 0;
    } else {
      return XPOverLastLevel / netXPNeededToNextLevel;
    }
  }
}

export {getXPToLevel}
export default ExperienceComp;