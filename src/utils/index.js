import { Platform, DeviceInfo } from 'libraries';
import languageHelper, { languages } from './languages';
import func from './functions';
import Validator from './Validator';

const isIos = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';
const hasNotch = DeviceInfo.hasNotch();

export {
  isAndroid,
  isIos,
  languageHelper,
  languages,
  hasNotch,
  Validator,
  func,
};
export * from './globalVariables';
export * from './styles';
