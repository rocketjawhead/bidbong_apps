/* eslint-disable import/no-cycle */
import API from 'config/API';
import { changeModalLoading } from '../modal/action';
import { setPopUp } from '../popup/action';
import actionTypes from './constant';

export const setCartKey = value => ({
  type: actionTypes.SET_CART_KEY,
  value,
});

export const setClearKey = () => ({
  type: actionTypes.CLEAR_CART_KEY,
});

export const setPaymentType = value => ({
  type: actionTypes.SET_PAYMENT_TYPE,
  value,
});

export const setCartRoom = value => ({
  type: actionTypes.SET_CART_ROOM,
  value,
});

export const setSehipping = value => ({
  type: actionTypes.SET_SELECTED_SHIPPING,
  value,
});

export const getCartRoom = p => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(changeModalLoading(true));
    API.getCart(p)
      .then(async res => {
        if (res.success) {
          dispatch(setCartRoom(res.data));
          dispatch(changeModalLoading(false));
          return resolve(res);
        }
        dispatch(changeModalLoading(false));
        return reject();
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

export const postPayment = p => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(changeModalLoading(true));
    API.payment(p)
      .then(async res => {
        console.log('responsenya adalah', res);
        if (res.success) {
          dispatch(changeModalLoading(false));
          return resolve(res);
        }
        dispatch(changeModalLoading(false));

        return reject(res);
      })
      .catch(err => {
        console.log(err);

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

export const updateStatusOrder = p => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(changeModalLoading(true));
    API.updateStatusOrder(p)
      .then(async res => {
        if (res.success) {
          dispatch(changeModalLoading(false));
          return resolve(res);
        }
        dispatch(changeModalLoading(false));
        return reject();
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
