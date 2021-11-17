import {isCanParseJson} from 'utils/functions/fn';
// eslint-disable-next-line import/no-cycle
import LocalStorage from '../storage';

const helper = {};

/**
 * ============================================================================================================================================================
 * @description ALL SET METHOD
 * ============================================================================================================================================================
 */

// set profile to localstorage
helper.setProfileToLocalStorage = payload =>
  new Promise(resolve => {
    LocalStorage.Set('profile', JSON.stringify(payload));
    resolve(payload);
  });

/**
 * ============================================================================================================================================================
 * @description ALL GET METHOD
 * ============================================================================================================================================================
 */

// get userId from LocalStorage
helper.getProfileFromLocalStorage = async () => {
  try {
    const data = await LocalStorage.Get('profile');
    const fixData = isCanParseJson(data) ? JSON.parse(data) : data;
    return Promise.resolve(fixData);
  } catch (e) {
    Promise.reject(new Error('Error getProfileFromLocalStorage'));
  }
};

/**
 * ============================================================================================================================================================
 * @description ALL CLEAR METHOD
 * ============================================================================================================================================================
 */

// clear all data from LocalStorage
helper.clearAllDataFromLocalStorage = async () => {
  await LocalStorage.ClearAll();
  return Promise.resolve();
};

export default helper;
