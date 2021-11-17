import actionTypes from './constant';

const initialState = {
  desc: 'popup.desc.default',
  type: 'default',
  title: 'popup.title.default',
  isShow: false,
  translate: true,
  customImage: '',
  onPressLeft: null,
  onPressRight: null,
  titleTranslate: true,
  leftButtonTitle: 'popup.button.ok',
  rightButtonTitle: 'popup.button.cancel',
};

const popup = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_POPUP:
      return {
        ...state,
        ...action.value,
      };
    case actionTypes.SET_DEFAULT_POPUP:
      return {
        ...state,
        ...initialState,
        isShow: action.value,
      };
    case actionTypes.CLEAR_POPUP:
      return initialState;
    case actionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default popup;
