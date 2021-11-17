/* eslint-disable no-useless-escape */
/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
import {Platform, Dimensions, PixelRatio} from 'libraries';
import {store} from 'config/redux/store';
import CONST from 'config/const';

const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const {profile} = store.getState();

const iphone = {};

iphone.checkIphoneX = () => {
  const {height: D_HEIGHT, width: D_WIDTH} = Dimensions.get('window');

  return (
    Platform.OS === 'ios' &&
    ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
      (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT) ||
      (D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH) ||
      (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT))
  );
};

iphone.disableLog = () => {
  // eslint-disable-next-line no-undef
  if (!__DEV__ || CONST.logDisable) {
    console.log = () => {};
    console.group = () => {};
    console.warn = () => {};
    console.error = () => {};
    console.info = () => {};
    console.debug = () => {};
    console.exception = () => {};
    console.disableRedBox = true;
    console.disableYellowBox = true;
    console.reportErrorsAsExceptions = false;
  }

  return null;
};

// iphone.telegramSendError = async params => {
//   try {
//     if (CONST.logDisable && CONST.activeConfig === 'prod') {
//       const msg = `${JSON.stringify(params)}`;
//       Sentry.captureMessage(msg, {
//         level: 'info',
//       });
//     }
//   } catch (error) {
//     console.log(error, 'error');
//   }
// };

// iphone.sendError = async params => {
//   try {
//     if (CONST.logDisable && CONST.activeConfig === 'prod') {
//       const msg = `${JSON.stringify(params)}`;
//       Sentry.configureScope(function(scope) {
//         if (profile && profile.id) {
//           const username = profile.phone ? profile.phone.slice(-4) : '';
//           scope.setUser({id: profile.id, username});
//         }
//         Sentry.captureMessage(msg, Sentry.Severity.Info);
//       });
//     }
//   } catch (error) {
//     console.log(error, 'error');
//   }
// };

iphone.checkUpdateiOS = (versionA = '1.0.0', versionB = '1.0.0') => {
  const fixVersion = s => `.${s.toLowerCase().charCodeAt(0) - 2147483647}.`;
  // eslint-disable-next-line no-param-reassign
  versionA = versionA.replace(/[^0-9\.]/g, fixVersion).split('.');
  // eslint-disable-next-line no-param-reassign
  versionB = versionB.replace(/[^0-9\.]/g, fixVersion).split('.');
  const mostLength = Math.max(versionA.length, versionB.length);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < mostLength; i++) {
    // eslint-disable-next-line no-bitwise
    versionA[i] = ~~versionA[i];
    // eslint-disable-next-line no-bitwise
    versionB[i] = ~~versionB[i];
    if (versionA[i] > versionB[i]) {
      return true;
    }
    if (versionA[i] < versionB[i]) {
      return false;
    }
  }
  return false;
};

iphone.isTablet = () => {
  const {height: D_HEIGHT, width: D_WIDTH} = Dimensions.get('screen');
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = D_WIDTH * pixelDensity;
  const adjustedHeight = D_HEIGHT * pixelDensity;
  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return true;
  }
  return (
    pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920)
  );
};

export default iphone;
