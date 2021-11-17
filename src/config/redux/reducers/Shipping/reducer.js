import actionTypes from './constant';

const initialState = {
  shippingList: [],
};

const shipping = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SHIPPING:
      return {
        ...state,
        shippingList: action.value,
      };
    default:
      return state;
  }
};

export default shipping;
