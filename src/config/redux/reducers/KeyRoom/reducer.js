import actionTypes from './constant';

const initialState = {
  keyList: null,
};

const keyRoom = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LIST_KEY:
      return {
        ...state,
        keyList: action.value,
      };
    default:
      return state;
  }
};

export default keyRoom;
