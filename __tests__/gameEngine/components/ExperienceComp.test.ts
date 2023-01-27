import Experience, {getXPToLevel} from '../../../src/gameEngine/components/Experience';
import {XP_TO_FIRST_LEVEL} from '../../../src/gameEngine/gameConstants';

describe('XP Component Tests', function () {
  it('Test XP to next level', () => {
    let xpRequired = getXPToLevel(-5);

    expect(getXPToLevel(-5)).toBe(0);
    expect(getXPToLevel(1)).toBe(0);
    expect(getXPToLevel(2)).toBe(XP_TO_FIRST_LEVEL);
    expect(getXPToLevel(3)).toBe(XP_TO_FIRST_LEVEL * 2);
    expect(getXPToLevel(5)).toBe(XP_TO_FIRST_LEVEL * 2 * 2 * 2);
  });

  it('it calcs net XP needed to next level correctly', () => {
    let xpComp: Experience;

    xpComp = new Experience(1, 0);
    expect(xpComp.getLevelProgress()).toBe(0);

    xpComp = new Experience(1, XP_TO_FIRST_LEVEL / 2);
    expect(xpComp.getLevelProgress()).toBe(0.5);

    xpComp = new Experience(2, XP_TO_FIRST_LEVEL + XP_TO_FIRST_LEVEL / 2);
    expect(xpComp.getLevelProgress()).toBe(0.5);

    xpComp = new Experience(3, XP_TO_FIRST_LEVEL + XP_TO_FIRST_LEVEL / 2);
    expect(xpComp.getLevelProgress()).toBe(0);

    let xpToLevel4 = getXPToLevel(4);
    let xpToLevel5 = getXPToLevel(5);

    xpComp = new Experience(4, xpToLevel5 - xpToLevel4 + (xpToLevel5 - xpToLevel4) / 5);
    expect(xpComp.getLevelProgress()).toBe(0.2);
  });
});
