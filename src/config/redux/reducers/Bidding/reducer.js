import actionTypes from './constant';

const initialState = {
  waitingRoom: [],
  listRoom: [],
  dataChart: {
    labels: [],
    data: [],
  },
  listBidder: [],
  lastWinner: [],
};

const bidding = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DATA_CHART:
      return {
        ...state,
        dataChart: action.value,
      };
    case actionTypes.SET_DATA_LIST_BIDDER:
      return {
        ...state,
        listBidder: action.value,
      };
    case actionTypes.SET_DATA_LAST_WINNER:
      return {
        ...state,
        lastWinner: action.value,
      };
    default:
      return state;
  }
};

export default bidding;
