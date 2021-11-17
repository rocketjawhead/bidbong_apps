/* eslint-disable no-nested-ternary */
/**
 * @name Metrics
 */

import {Dimensions, Platform} from 'libraries';
import {func, isIos, scale} from 'utils';
import {Theme} from './color';

const shadow5 = () =>
  Platform.OS === 'ios'
    ? {
        shadowColor: Theme.grey('75'),
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
          height: 3,
          width: 0,
        },
      }
    : {
        elevation: 5,
      };

const shadow1 = () =>
  Platform.OS === 'ios'
    ? {
        shadowColor: Theme.grey('75'),
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
          height: 3,
          width: 0,
        },
      }
    : {
        elevation: 1,
      };

export const METRICS = {
  window: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  screen: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  gutter: {
    xxs: 4,
    xs: 8,
    s: 16,
    m: 24,
    l: 32,
    xl: 40,
    xxl: 48,
  },
  paddingStatusBar: () =>
    isIos ? (func.checkIphoneX() ? scale(47) : scale(23)) : 0,
  shadow:
    Platform.OS === 'ios'
      ? {
          shadowColor: Theme.grey('75'),
          shadowOpacity: 0.5,
          shadowRadius: 3,
          shadowOffset: {
            height: 3,
            width: 0,
          },
        }
      : {
          elevation: 5,
        },
  dynamicShadow: (elevation, height = 3, width = 0) =>
    elevation
      ? Platform.OS === 'ios'
        ? {
            shadowColor: Theme.grey('75'),
            shadowOpacity: 0.5,
            shadowRadius: 3,
            shadowOffset: {
              height,
              width,
            },
          }
        : {elevation}
      : {},
};
