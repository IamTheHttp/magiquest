import oneMap from 'levels/data/0-0_home.json';
import { CHARACTERS } from 'gameEngine/gameConstants';
export default {
    tileMap: oneMap,
    triggers: {
        levelStart: [{
                oneOff: true,
                type: 'dialog',
                lines: [
                    {
                        text: 'I haven\'t heard from my aunt in a while\nI should go check on her\nMaybe John has seen her?',
                        speaker: 0
                    }
                ]
            }],
        actOnEntity: {},
        move: {
            '14-13': {
                oneOff: true,
                type: 'portal',
                level: 0,
                area: 1
            },
            '2-5': {
                oneOff: true,
                type: 'dialog',
                lines: [
                    {
                        text: 'I should collect my sword\n(hit space to open chests)',
                        speaker: 0
                    }
                ]
            }
        }
    },
    entitiesToPlace: [
        {
            pos: {
                col: 3,
                row: 5
            },
            type: CHARACTERS.CHEST
        }
    ],
    startPos: {
        col: 1,
        row: 2
    }
};
