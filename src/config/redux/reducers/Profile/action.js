/* eslint-disable import/no-cycle */
import API from 'config/API';
import { setPopUp } from '../popup/action';
import { setDataKey } from './selector';
import actionTypes from './constant';

const setUserKey = value => ({
  type: actionTypes.SET_USER_KEY,
  value,
});

export const setUserBid = value => ({
  type: actionTypes.SET_USER_BID,
  value,
});

export const getUserKey = () => dispatch =>
  new Promise((resolve, reject) => {
    API.getUserKey()
      .then(res => {
        if (res.success) {
          const data = setDataKey(res.data);
          dispatch(setUserKey(data));
          return resolve();
        }
        setPopUp({
          isShow: true,
          leftButtonTitle: 'popup.button.ok',
        });
        return reject();
      })
      .catch(err =>
        dispatch(
          setPopUp({
            isShow: true,
            leftButtonTitle: 'popup.button.ok',
          }),
        ),
      );
  });

export const getUserBid = () => dispatch =>
  new Promise((resolve, reject) => {
    API.getUserBid()
      .then(res => {
        if (res.success) {
          dispatch(setUserBid(res.data));
          return resolve();
        }
        setPopUp({
          isShow: true,
          leftButtonTitle: 'popup.button.ok',
        });
        return reject();
      })
      .catch(err =>
        dispatch(
          setPopUp({
            isShow: true,
            leftButtonTitle: 'popup.button.ok',
          }),
        ),
      );
  });
