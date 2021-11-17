/* eslint-disable import/no-cycle */
import API from 'config/API';
import actionTypes from './constant';
import { setDefaultPopup } from '../popup/action';

export const setNotificationToken = value => ({
  type: actionTypes.SET_NOTIFICATION_TOKEN,
  value,
});

export const setPushNotificationData = value => ({
  type: actionTypes.SET_PUSH_NOTIFICATION_DATA,
  value,
});

export const clearPushNotificationData = () => ({
  type: actionTypes.CLEAR_PUSH_NOTIFICATION_DATA,
});

export const setNotificationData = value => ({
  type: actionTypes.SET_NOTIFICATION_DATA,
  value,
});

export const setSubscribeNotification = p => dispatch =>
  new Promise((resolve, reject) =>
    API.notificationSubscribe(p)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      }),
  );

export const deleteSubscribeNotification = p => dispatch =>
  new Promise((resolve, reject) =>
    API.notificationDelete(p)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      }),
  );

/**
 * @name getNotificationInbox
 * @param {object} payload
 * @description get inbox V1 without pagination
 */
export const getNotificationInbox = payload => async dispatch => {
  try {
    const res = await API.getNotif(payload);
    if (res.data) {
      const notificationData = res.data;
      console.log('notificationData', notificationData);
      dispatch(setNotificationData(notificationData));
      return Promise.resolve();
    }
  } catch (err) {
    dispatch(setDefaultPopup(true));
    return Promise.resolve();
  }
};

/**
 * @name readNotification
 * @param {object} payload
 * @description read inbox notification
 */
export const readNotification = p => async dispatch => {
  try {
    const res = await API.setRead(p);
    return Promise.resolve(res);
  } catch (err) {
    console.log('Error readNotification: ', err);
    return Promise.reject(err);
  }
};
