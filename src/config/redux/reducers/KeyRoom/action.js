/* eslint-disable import/no-cycle */
import API from 'config/API';
import { setPopUp } from '../popup/action';
import { changeModalLoading } from '../modal/action';
import actionTypes from './constant';

const setDataKey = value => ({
  type: actionTypes.SET_LIST_KEY,
  value,
});

export const getKey = () => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(changeModalLoading(true));
    API.getKey()
      .then(res => {
        dispatch(changeModalLoading(false));
        if (res.success) {
          dispatch(setDataKey(res.data));
          return resolve(res);
        }
        return reject();
      })
      .catch(err => {
        dispatch(changeModalLoading(false));
        dispatch(
          setPopUp({
            isShow: true,
            leftButtonTitle: 'popup.button.ok',
          }),
        );
        return reject();
      });
  });

export const createKey = payload => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(changeModalLoading(true));
    API.createKey(payload)
      .then(res => {
        dispatch(changeModalLoading(false));
        if (res.success) {
          return resolve(res);
        }
        return reject();
      })
      .catch(err => {
        dispatch(changeModalLoading(false));
        dispatch(
          setPopUp({
            isShow: true,
            leftButtonTitle: 'popup.button.ok',
          }),
        );
        return reject();
      });
  });

export const updateKey = payload => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(changeModalLoading(true));
    API.updateKey(payload)
      .then(res => {
        dispatch(changeModalLoading(false));
        if (res.success) {
          return resolve(res);
        }
        return reject(res);
      })
      .catch(err => {
        dispatch(changeModalLoading(false));
        dispatch(
          setPopUp({
            isShow: true,
            leftButtonTitle: 'popup.button.ok',
          }),
        );
        return reject();
      });
  });

export const paymentKey = payload => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(changeModalLoading(true));
    //new
    console.log(payload);
    //new
    API.payKey(payload)
      .then(res => {
        dispatch(changeModalLoading(false));
        if (res.success) {
          console.log("sukses");
          return resolve(res);

        }
        return resolve(res);
      })
      .catch(err => {
        dispatch(changeModalLoading(false));
        dispatch(
          setPopUp({
            isShow: true,
            leftButtonTitle: 'popup.button.ok',
          }),
        );
        return reject();
      });
  });
