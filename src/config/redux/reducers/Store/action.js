/* eslint-disable import/no-cycle */
import API from 'config/API';
import { setPopUp } from '../popup/action';
import actionTypes from './constant';
import { changeModalLoading } from '../modal/action';

const setListKey = value => ({
  type: actionTypes.SET_LIST_KEY,
  value,
});

export const getListKey = () => dispatch =>
  new Promise((resolve, reject) => {
    API.getListKey()
      .then(res => {
        if (res.success) {
          dispatch(setListKey(res.data));
          return resolve(res.data);
        }
        dispatch(
          setPopUp({
            translate: false,
            desc: res.error,
            isShow: true,
            leftButtonTitle: 'button.ok',
          }),
        );
        reject();
      })
      .catch(err => {
        dispatch(
          setPopUp({
            isShow: true,
            leftButtonTitle: 'button.ok',
          }),
        );
        reject();
      });
  });

export const postBuyKey = payload => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(changeModalLoading(true));
    API.buyKey(payload)
      .then(res => {
        dispatch(changeModalLoading(false));
        if (res.success) {
          return resolve(res);
        }
        dispatch(changeModalLoading(false));
        dispatch(
          setPopUp({
            translate: false,
            isShow: true,
            leftButtonTitle: 'button.ok',
          }),
        );
        reject();
      })
      .catch(err => {
        dispatch(changeModalLoading(false));
        dispatch(
          setPopUp({
            isShow: true,
            leftButtonTitle: 'button.ok',
          }),
        );
        reject();
      });
  });
