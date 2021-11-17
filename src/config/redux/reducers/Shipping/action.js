/* eslint-disable import/no-cycle */
import API from 'config/API';
import { func } from 'utils';
import { setPopUp } from '../popup/action';
import { changeModalLoading } from '../modal/action';
import actionTypes from './constant';

export const setShipping = value => ({
  type: actionTypes.SET_SHIPPING,
  value,
});

export const getShipping = p => dispatch =>
  new Promise((resolve, reject) => {
    API.getShipping(p)
      .then(res => {
        if (res.success) {
          dispatch(setShipping(res.data.list));
          return resolve(res);
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

export const getShippingUser = () => dispatch =>
  new Promise((resolve, reject) => {
    API.getShippingUser()
      .then(res => {
        if (res.success) {
          dispatch(setShipping(res.data));
          return resolve(res);
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

export const updateShipping = payload => dispatch =>
  new Promise((resolve, reject) => {
    API.updaetShipping(payload)
      .then(res => {
        if (res.success) {
          return resolve(res);
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

export const getSearchCountry = payload => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(changeModalLoading(true));
    API.searchCountry(payload)
      .then(res => {
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
            leftButtonTitle: 'popup.button.ok',
          }),
        );
      });
  });

export const getCountries = () => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(changeModalLoading(true));
    API.getCountries()
      .then(res => {
        dispatch(changeModalLoading(false));
        res.map((x, i) => {
          const payload = {
            body: {
              country: x.name,
              shippingCode: x.alpha2Code,
            },
          };
          return API.createShipping(payload);
        });
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
