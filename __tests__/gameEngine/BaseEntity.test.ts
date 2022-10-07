import {BaseEntity} from '../../src/gameEngine/BaseEntity';

describe('Tests the Base Entity', () => {
  let entity: BaseEntity;
  beforeEach(() => {
    // set up the test
    entity = new BaseEntity();
  });

  it('can get pos even if no pos component exists', () => {
    entity.getPos();
  });
});
