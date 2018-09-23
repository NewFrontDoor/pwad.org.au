import {injectGlobal} from 'emotion';
import {normalize} from 'polished';
import {cabin, cabinBold, cabinExtraBold} from './constants';

export default () => {
  injectGlobal(normalize());
  injectGlobal(cabin);
  injectGlobal(cabinBold);
  injectGlobal(cabinExtraBold);
};
