/* eslint-disable import/no-cycle */
import API from 'config/API';
import { func } from 'utils';
import { changeModalLoading } from '../modal/action';
import { setPopUp } from '../popup/action';
import actionTypes from './constant';
import {
  setDataGetProfile,
  setDataProfile,
  setUpdateProfile,
} from './selector';

export const setProfile = value => ({
  type: actionTypes.SET_PROFILE,
  value,
});

export const setToken = value => ({
  type: actionTypes.SET_TOKEN,
  value,
});

export const postRegister = payload => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(changeModalLoading(true));
    API.signup(payload).then(res => {
      dispatch(changeModalLoading(false));
      if (res.success) {
        dispatch(
          setPopUp({
            desc: 'popup.desc.successJoin',
            title: 'popup.title.successJoin',
            isShow: true,
            leftButtonTitle: 'popup.button.ok',
          }),
        );
        return resolve(res);
      }
      dispatch(
        setPopUp({
          desc: res.error,
          translate: false,
          isShow: true,
          leftButtonTitle: 'button.ok',
        }),
      );
      return reject();
    });
  });

export const postLogin = payload => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(changeModalLoading(true));
    API.login(payload)
      .then(res => {
        if (res.success) {
          dispatch(setToken(res.token));
          const response = setDataProfile(res);
          dispatch(setProfile(response));
          func.setProfileToLocalStorage(response);
          dispatch(changeModalLoading(false));
          return resolve(res);
        }
        dispatch(changeModalLoading(false));
        dispatch(
          setPopUp({
            translate: false,
            desc: res.error,
            isShow: true,
            leftButtonTitle: 'button.ok',
          }),
        );

        reject(res);
      })
      .catch(async err => {
        await dispatch(changeModalLoading(false));
        dispatch(
          setPopUp({
            isShow: true,
            leftButtonTitle: 'button.ok',
          }),
        );
        return reject(err);
      });
  });

export const getProfile = () => dispatch =>
  new Promise((resolve, reject) => {
    API.getProfile()
      .then(res => {
        if (res.success) {
          const response = setDataGetProfile(res.data);
          dispatch(setProfile(response));
          return resolve(res);
        }
        return reject(res);
      })
      .catch(err => reject(err));
  });

export const postUpdateProfile = payload => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(changeModalLoading(true));
    API.updateProfile(payload)
      .then(res => {
        if (res.success) {
          const response = setUpdateProfile(res.data);
          dispatch(setProfile(response));
          dispatch(changeModalLoading(false));
          dispatch(
            setPopUp({
              title: 'popup.title.successUpdateProdile',
              desc: 'popup.desc.successUpdateProdile',
              isShow: true,
              leftButtonTitle: 'button.ok',
            }),
          );
          return resolve(res);
        }
        dispatch(changeModalLoading(false));
        dispatch(
          setPopUp({
            isShow: true,
            leftButtonTitle: 'button.ok',
          }),
        );
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
        return reject();
      });
  });
