import actionTypes from './constant';

const initialState = {
  listRoom: [],
  detailRoom: {},
};

const room = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LIST_ROOM:
      return {
        ...state,
        listRoom: state.listRoom.concat(action.value),
      };
    case actionTypes.SET_ALL_ROOM:
      return {
        ...state,
        listRoom: action.value,
      };
    case actionTypes.CLEAR_LIST_ROOM:
      return {
        ...state,
        listRoom: [],
      };
    case actionTypes.SET_DETAIL_ROOM:
      return {
        ...state,
        detailRoom: action.value,
      };
    default:
      return state;
  }
};

export default room;
