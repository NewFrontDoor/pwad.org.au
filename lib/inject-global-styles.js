import {injectGlobal} from 'emotion';
import {lato, latoBold, typography} from '../config/constants';

export default () => {
  injectGlobal(typography.toString());
  injectGlobal(lato);
  injectGlobal(latoBold);
};
