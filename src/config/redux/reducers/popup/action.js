import actionTypes from './constant';

export const setPopUp = value => ({
  type: actionTypes.SET_POPUP,
  value,
});

export const clearPopUp = () => ({
  type: actionTypes.CLEAR_POPUP,
});

export const setDefaultPopup = value => ({
  type: actionTypes.SET_DEFAULT_POPUP,
  value,
});
