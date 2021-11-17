/* eslint-disable import/no-cycle */
import API from 'config/API';
import { setPopUp } from '../popup/action';
import actionTypes from './constant';
import { changeModalLoading } from '../modal/action';

const setListUsers = value => ({
  type: actionTypes.SET_LIST_USERS,
  value,
});

export const getListUsers = () => dispatch =>
  new Promise((resolve, reject) => {
    changeModalLoading(true);
    API.getUsers()
      .then(res => {
        if (res.success) {
          changeModalLoading(false);
          dispatch(setListUsers(res.data));
          return resolve(res.data);
        }
        changeModalLoading(false);
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
        changeModalLoading(false);
        dispatch(
          setPopUp({
            isShow: true,
            leftButtonTitle: 'button.ok',
          }),
        );
        reject();
      });
  });

export const deleteUser = p => dispatch =>
  new Promise((resolve, reject) => {
    changeModalLoading(true);
    API.deleteUser(p)
      .then(async res => {
        if (res.success) {
          const response = await getListUsers();
          changeModalLoading(false);
          dispatch(setListUsers(response.data));
          dispatch(
            setPopUp({
              isShow: true,
              desc: 'popup.desc.successDelete',
              title: 'popup.title.successDelete',
            }),
          );
          return resolve(res);
        }
        changeModalLoading(false);
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
        changeModalLoading(false);
        dispatch(
          setPopUp({
            isShow: true,
            leftButtonTitle: 'button.ok',
          }),
        );
        reject();
      });
  });

export const updateUser = p => dispatch =>
  new Promise((resolve, reject) => {
    changeModalLoading(true);
    API.updateUser(p)
      .then(async res => {
        if (res.success) {
          const response = await getListUsers();
          changeModalLoading(false);
          dispatch(setListUsers(response.data));
          dispatch(
            setPopUp({
              isShow: true,
              desc: 'popup.desc.successUpdated',
              title: 'popup.title.successUpdated',
            }),
          );
          return resolve(res);
        }
        changeModalLoading(false);
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
        console.log('err', err);
        changeModalLoading(false);
        dispatch(
          setPopUp({
            isShow: true,
            leftButtonTitle: 'button.ok',
          }),
        );
        reject();
      });
  });

export const setWinnerBidder = p => dispatch =>
  new Promise((resolve, reject) => {
    API.setWinner(p)
      .then(async res => {
        if (res.success) {
          return resolve(res);
        }
        return reject();
      })
      .catch(err => {
        changeModalLoading(false);
        dispatch(
          setPopUp({
            isShow: true,
            leftButtonTitle: 'button.ok',
          }),
        );
        reject();
      });
  });

export const reqResetPassword = p => dispatch =>
  new Promise((resolve, reject) => {
    API.reqResetPassword(p)
      .then(res => {
        if (res.success) {
          return resolve(res);
        }
        return reject(res);
      })
      .catch(err => {
        changeModalLoading(false);
        dispatch(
          setPopUp({
            isShow: true,
            leftButtonTitle: 'button.ok',
          }),
        );
        reject(console.log(err));
      });
  });

export const reqCheckOTP = p => dispatch =>
  new Promise((resolve, reject) => {
    API.reqCheckOTP(p)
      .then(res => {
        if (res.success) {
          return resolve(res);
        }
        return reject(res);
      })
      .catch(err => {
        changeModalLoading(false);
        dispatch(
          setPopUp({
            isShow: true,
            leftButtonTitle: 'button.ok',
          }),
        );
        reject(console.log(err));
      });
  });

export const reqSetNewPassword = p => dispatch =>
  new Promise((resolve, reject) => {
    API.reqSetPass(p)
      .then(res => {
        if (res.success) {
          return resolve(res);
        }
      })
      .catch(err => {
        changeModalLoading(false);
        dispatch(
          setPopUp({
            isShow: true,
            leftButtonTitle: 'button.ok',
          }),
        );
        reject(console.log(err));
      });
  });
