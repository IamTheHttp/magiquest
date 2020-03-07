export type fn = jest.Mocked<any>;

class SpyFns {
  constructor(public spyPan:fn = null, public spyClear: fn = null, public spyAddImage:fn = null, public spyDraw:fn = null, public spyHandleAreaChange:fn = null) {
  }
}

export default SpyFns;