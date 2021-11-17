import actionTypes from './constant';

const initialState = {
  listUsers: [],
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LIST_USERS:
      return {
        ...state,
        listUsers: action.value,
      };
    default:
      return state;
  }
};

export default user;
