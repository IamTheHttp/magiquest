import {BaseEntity} from "../../src/gameEngine/BaseEntity";

describe('Tests the Base Entity', () => {
  let entity: BaseEntity;
  beforeEach(() => {
    // setup the test
    entity = new BaseEntity('foo');
  });

  it('can get pos even if no pos component exists', () => {
    entity.getPos();
  });
});