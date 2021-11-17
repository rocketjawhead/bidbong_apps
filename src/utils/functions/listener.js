import { AppState, NetInfo, BackHandler, Linking } from 'libraries';

const URL = 'url';
const APPSTATE_CHANGE = 'change';
const HARDWARE_BACK_PRESS = 'hardwareBackPress';

const addLinkingUrlListener = callback =>
  Linking.addEventListener(URL, callback);

const removeLinkingUrlListener = callback =>
  Linking.removeEventListener(URL, callback);

const addAppStateListener = callback =>
  AppState.addEventListener(APPSTATE_CHANGE, callback);

const removeAppStateListener = callback =>
  AppState.addEventListener(APPSTATE_CHANGE, callback);

const addBackHandlerListener = callback =>
  BackHandler.addEventListener(HARDWARE_BACK_PRESS, callback);

const removeBackHandlerListener = callback =>
  BackHandler.removeEventListener(HARDWARE_BACK_PRESS, callback);

const addConnectionListener = callback =>
  NetInfo.addEventListener(state => callback(state));

export default {
  addAppStateListener,
  addConnectionListener,
  addLinkingUrlListener,
  addBackHandlerListener,
  removeAppStateListener,
  removeLinkingUrlListener,
  removeBackHandlerListener,
};
