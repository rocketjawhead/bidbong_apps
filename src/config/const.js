/* eslint-disable import/no-cycle */
// !VERY IMPORTANT, DONT CHANGE THIS FILE
// BECAUSE IS GENERATED
import { Platform } from 'react-native';

// START
const App = {
  logDisable: false,
  activeConfig: 'prod',
  sentryDsn: 'https://10738dcd5cf94015b189c666403ef032@sentry.io/1806396',
  ios: {
    // eslint-disable-next-line prettier/prettier
    // urlStore:
    //   'itms-apps://itunes.apple.com/us/app/apple-store/id1483475992?mt=8',
    appVersion: '1.0.0',
    appVersionCode: '1',
  },
  android: {
    // urlStore: 'https://play.google.com/store/apps/details?id=com.byu.id&hl=id',
    appVersion: '1.0.0(1)',
    appVersionCode: '1',
  },
};

const { appVersion, appVersionCode, urlStore } =
  Platform.OS === 'ios' ? App.ios : App.android;
const { activeConfig, logDisable, sentryDsn } = App;

// END
const prod = {
  
  // https://api.bidbong.com/
  // http://34.101.196.168:3033
  // http://rocketserver.trees-code.com/
  url: {
    api: `https://backendjs.heyio.my.id/`,
    type: 'production',
  },
  appVersion: `${appVersion} - PROD`,
  activeConfig,
  appVersionCode,
  applicationName: 'Auction',
};

const dev = {
  url: {
    api: `https://backendjs.heyio.my.id/`,
    type: 'development',
  },
  appVersion: `${appVersion} - DEVELOPMENT`,
  activeConfig,
  appVersionCode,
  applicationName: 'Auction',
};

const defaultConfig = App.activeConfig === 'dev' ? dev : prod;

export default defaultConfig;
