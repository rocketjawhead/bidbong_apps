import actionTypes from './constant';

const initialState = {
  isShow: false,
  content: ''
};

const modal = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MODAL:
      return {
        ...state,
        ...action.value
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        ...action.value
      };
    default:
      return state;
  }
};

export default modal;
