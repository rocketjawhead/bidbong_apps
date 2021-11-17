import actionTypes from './constant';

const initialState = {
  key: [],
  room: [],
  shipping: {},
  paymentType: '',
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CART_KEY:
      return {
        ...state,
        key: action.value,
      };
    case actionTypes.SET_PAYMENT_TYPE:
      return {
        ...state,
        paymentType: action.value,
      };
    case actionTypes.SET_SELECTED_SHIPPING:
      return {
        ...state,
        shipping: action.value,
      };
    case actionTypes.SET_CART_ROOM:
      return {
        ...state,
        room: action.value,
      };
    case actionTypes.CLEAR_CART_KEY:
      return state;
    default:
      return state;
  }
};

export default cart;
