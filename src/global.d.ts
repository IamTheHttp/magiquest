declare module '*.png';
declare module '*.json';

// declare module 'game-platform/dist' {
//   class Entity {
//     getByComps: (comp: Array<any> | string) => Array<any> | string;
//     reset: () => void;
//     entities: object;
//     constructor(str: any)
//   }
//
//   interface GamePlatform {
//     Entity: Entity;
//     entityLoop: any;
//     GameCanvas: any;
//     Engine: any;
//   }
//
//   const GamePlatform: GamePlatform;
//
//   export = GamePlatform;
// }

interface Window {
  game: any;
  API: any;
}

// window.foo = 'bar';