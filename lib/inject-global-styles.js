import {injectGlobal, css} from 'emotion';
import {normalize} from 'polished';
import {lato, latoBold, latoExtraBold} from '../config/constants';

export default () => {
  injectGlobal(normalize());
  injectGlobal(lato);
  injectGlobal(latoBold);
  injectGlobal(latoExtraBold);
  injectGlobal(css`
    body:before {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 1520px 1220px 0 0;
      border-color: rgba(0, 0, 0, 0.03) transparent transparent transparent;
      content: '';
      z-index: 20;
      pointer-events: none;
    }

    body:after {
      position: absolute;
      top: 0;
      right: 0;
      width: 0;
      height: 0;
      z-index: 20;
      border-style: solid;
      border-width: 1360px 0 0 1360px;
      border-color: rgba(0, 0, 0, 0.03) transparent transparent transparent;
      content: '';
      pointer-events: none;
    }
  `);
};
