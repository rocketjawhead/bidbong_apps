import actionTypes from './constant';

const initialState = {
  url: ''
};

const contact = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DEEPLINK_URL:
      return {
        ...state,
        url: action.value
      };
    case actionTypes.CLEAR_DEEPLINK_URL:
    case actionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default contact;
