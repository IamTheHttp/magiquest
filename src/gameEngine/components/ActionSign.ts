import {ACTION_SIGN} from './_ComponentNames';

class ActionSign {
  name: string;
  constructor(public symbol: '?' | '!') {
    this.name = ACTION_SIGN;
    this.symbol = symbol;
  }
}

export default ActionSign;
