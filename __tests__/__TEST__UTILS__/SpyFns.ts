export type fn = jest.Mocked<any>;

/**
 * TODO Refactor a function that just returns new Jest Mocks every time
 */
class SpyFns {
  constructor(
    public spyPan: fn = null,
    public spyClear: fn = null,
    public spyAddImage: fn = null,
    public spyDraw: fn = null,
    public spyHandleAreaChange: fn = null,
    public spyDrawRect: fn = null
  ) {}
}

export default SpyFns;
