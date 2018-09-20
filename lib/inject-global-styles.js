import {injectGlobal} from 'emotion';
import {normalize} from 'polished';
import {cabin, cabinBold, cabinExtraBold} from '../config/constants';

export default () => {
  injectGlobal(normalize());
  injectGlobal(cabin);
  injectGlobal(cabinBold);
  injectGlobal(cabinExtraBold);
};
