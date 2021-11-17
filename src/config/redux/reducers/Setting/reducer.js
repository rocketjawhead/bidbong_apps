/* eslint-disable import/no-unresolved */
import CONST from 'config/const';
import actionTypes from './constant';

const initialState = {
  appState: 'active',
  skipVersion: '',
  nextVersion: '',
  featureStatus: {},
  isConnected: true,
  updateMessage: null,
  isMaintenance: false,
  isForceUpdate: false,
  isSkipVersion: false,
  appVersionCode: `${CONST.appVersionCode}`,
  applicationName: CONST.applicationName,
  isOptionalUpdate: false,
  maintenanceMessage: null,
  isOnboardingEnabled: true,
  isOfflineNoticeAllowToShow: true,
};

const setting = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_FEATURE_STATUS:
      return {
        ...state,
        featureStatus: action.value,
      };
    case actionTypes.SET_IS_CONNECTED:
      return {
        ...state,
        isConnected: action.value,
      };
    case actionTypes.SETTING_ONBOARDING_STATE:
      return {
        ...state,
        isOnboardingEnabled: action.value,
      };
    case actionTypes.SET_MAINTENANCE_STATUS:
      return {
        ...state,
        isMaintenance: action.value,
      };
    case actionTypes.SET_FORCE_UPDATE_STATUS:
      return {
        ...state,
        isForceUpdate: action.value,
        isOptionalUpdate: false,
      };
    case actionTypes.SET_OPTIONAL_UPDATE_STATUS:
      return {
        ...state,
        isForceUpdate: false,
        isOptionalUpdate: action.value,
      };
    case actionTypes.SET_UPDATE_MESSAGE:
      return {
        ...state,
        updateMessage: action.value,
      };
    case actionTypes.SET_MAINTENANCE_MESSAGE:
      return {
        ...state,
        maintenanceMessage: action.value,
      };
    case actionTypes.SET_OFFLINE_NOTICE_STATUS:
      return {
        ...state,
        isOfflineNoticeAllowToShow: action.value,
      };
    case actionTypes.SET_NEXT_VERSION:
      return {
        ...state,
        nextVersion: action.value,
      };
    case actionTypes.SET_SKIP_VERSION:
      return {
        ...state,
        skipVersion: action.value,
      };
    case actionTypes.SET_APP_STATE:
      return {
        ...state,
        appState: action.value,
      };
    case actionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default setting;
