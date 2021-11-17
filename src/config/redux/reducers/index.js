/* eslint-disable import/no-cycle */
import { combineReducers } from 'redux';

import modal from './modal/reducer';
import popup from './popup/reducer';
import store from './Store/reducer';
import auth from './auth/reducer';
import profile from './Profile/reducer';
import room from './Room/reducer';
import keyRoom from './KeyRoom/reducer';
import shipping from './Shipping/reducer';
import user from './User/reducer';
import cart from './Checkout/reducer';
import bidding from './Bidding/reducer';
import deeplink from './deeplink/reducer';
import setting from './Setting/reducer';
import notification from './Notification/reducer';

export const reducer = combineReducers({
  cart,
  auth,
  user,
  room,
  store,
  modal,
  popup,
  keyRoom,
  profile,
  deeplink,
  shipping,
  bidding,
  setting,
  notification,
});

export * from './auth/action';
export * from './KeyRoom/action';
export * from './Room/action';
export * from './modal/action';
export * from './popup/action';
export * from './Store/action';
export * from './deeplink/action';
export * from './Profile/action';
export * from './Bidding/action';
export * from './Shipping/action';
export * from './User/action';
export * from './Checkout/action';
export * from './Setting/action';
export * from './Notification/action';
