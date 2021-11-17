import routeConstant from 'config/routes/routeConstant';
import actionTypes from './constant';

export const changeModalLoading = value => ({
  type: actionTypes.SET_LOADING,
  value: {
    isShow: value,
    content: routeConstant.LOADING,
  },
});
