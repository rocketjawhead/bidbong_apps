import actionTypes from './constant';

const initialState = {
  key: [],
};

const store = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LIST_KEY:
      return {
        ...state,
        key: action.value,
      };
    default:
      return state;
  }
};

export default store;
