import actionTypes from './constant';

// V1
const initialState = {
  token: '',
  notificationData: [],
  pushNotificationData: null,
  isUnreadNotification: false,
};

const notification = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NOTIFICATION_TOKEN:
      return {
        ...state,
        token: action.value,
      };
    case actionTypes.SET_NOTIFICATION_DATA:
      return {
        ...state,
        notificationData: action.value,
      };
    case actionTypes.SET_PUSH_NOTIFICATION_DATA:
      return {
        ...state,
        pushNotificationData: action.value,
      };
    case actionTypes.CLEAR_PUSH_NOTIFICATION_DATA:
      return {
        ...state,
        pushNotificationData: null,
      };
    case actionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default notification;
