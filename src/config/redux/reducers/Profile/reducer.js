import actionTypes from './constant';

const initialState = {
  userKey: [
    {
      keyId: 1,
      count: 0,
    },
    {
      keyId: 2,
      count: 0,
    },
    {
      keyId: 3,
      count: 0,
    },
    {
      keyId: 4,
      count: 0,
    },
  ],
  userBid: [],
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_KEY:
      return {
        ...state,
        userKey: action.value,
      };
    case actionTypes.SET_USER_BID:
      return {
        ...state,
        userBid: action.value[0],
      };
    default:
      return state;
  }
};

export default profile;
