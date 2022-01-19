import {HAS_ACTION_SIGN_COMP} from './ComponentNamesConfig';

class HasActionSignComponent {
  name: string;
  constructor(public symbol: '?' | '!') {
    this.name = HAS_ACTION_SIGN_COMP;
    this.symbol = symbol;
  }
}

export default HasActionSignComponent;
