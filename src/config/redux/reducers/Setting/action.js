import actionTypes from './constant';

export const setSkipVersion = value => ({
  type: actionTypes.SET_SKIP_VERSION,
  value,
});

export const setOnboardingState = value => ({
  type: actionTypes.SETTING_ONBOARDING_STATE,
  value,
});

export const setOfflineNoticeStatus = value => ({
  type: actionTypes.SET_OFFLINE_NOTICE_STATUS,
  value,
});

export const setIsConnected = value => ({
  type: actionTypes.SET_IS_CONNECTED,
  value,
});

export const setMaintenanceStatus = value => ({
  type: actionTypes.SET_MAINTENANCE_STATUS,
  value,
});

export const setForceUpdateStatus = value => ({
  type: actionTypes.SET_FORCE_UPDATE_STATUS,
  value,
});

export const setFeatureStatus = value => ({
  type: actionTypes.SET_FEATURE_STATUS,
  value,
});

export const setOptionalUpdate = value => ({
  type: actionTypes.SET_OPTIONAL_UPDATE_STATUS,
  value,
});

export const setMaintenanceMessage = value => ({
  type: actionTypes.SET_MAINTENANCE_MESSAGE,
  value,
});

export const setUpdateMessage = value => ({
  type: actionTypes.SET_UPDATE_MESSAGE,
  value,
});

export const setAppState = value => ({
  type: actionTypes.SET_APP_STATE,
  value,
});
