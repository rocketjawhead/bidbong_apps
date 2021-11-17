import actionTypes from './constant';

const initialState = {
  token: '',
  profile: {
    id: '',
    email: '',
    first: '',
    last: '',
    phone: '',
    roleId: '',
  },
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PROFILE:
      return {
        ...state,
        profile: action.value,
      };
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.value,
      };
    default:
      return state;
  }
};

export default auth;
