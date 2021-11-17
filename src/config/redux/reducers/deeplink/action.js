import actionTypes from './constant';

export const setDeeplinkUrl = value => ({
  type: actionTypes.SET_DEEPLINK_URL,
  value
});

export const clearDeeplinkUrl = () => ({
  type: actionTypes.CLEAR_DEEPLINK_URL
});
