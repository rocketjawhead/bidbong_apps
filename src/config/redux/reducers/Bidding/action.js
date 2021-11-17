/* eslint-disable import/no-cycle */
import API from 'config/API';
import { setPopUp } from '../popup/action';
import { changeModalLoading } from '../modal/action';
import actionTypes from './constant';
import { setDataChart } from './selector';

const handlerSetDataCahrt = value => ({
  type: actionTypes.SET_DATA_CHART,
  value,
});

const handleSetListBidder = value => ({
  type: actionTypes.SET_DATA_LIST_BIDDER,
  value,
});

const handleSetLastWinner = value => ({
  type: actionTypes.SET_DATA_LAST_WINNER,
  value,
});

export const postReservation = payload => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(changeModalLoading(true));
    API.reservation(payload)
      .then(res => {
        dispatch(changeModalLoading(false));
        if (res.success) {
          return resolve(res);
        }
        dispatch(
          setPopUp({
            isShow: true,
            translate: false,
            desc: res.error,
            leftButtonTitle: 'popup.button.ok',
          }),
        );
        return reject(res);
      })
      .catch(err =>
        dispatch(
          setPopUp({
            isShow: true,
            leftButtonTitle: 'popup.button.ok',
          }),
        ),
      );
  });

export const postBidding = p => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(changeModalLoading(true));
    API.bidding(p)
      .then(res => {
        dispatch(changeModalLoading(false));
        if (res.success) {
          return resolve(res);
        }
        setPopUp({
          isShow: true,
          leftButtonTitle: 'popup.button.ok',
        });
        return reject();
      })
      .catch(err => {
        dispatch(changeModalLoading(false));
        dispatch(
          setPopUp({
            isShow: true,
            leftButtonTitle: 'popup.button.ok',
          }),
        );
        return reject();
      });
  });

export const checkoutProduct = p => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(changeModalLoading(true));
    API.bidding(p)
      .then(res => {
        dispatch(changeModalLoading(false));
        if (res.success) {
          return resolve(res);
        }
        setPopUp({
          isShow: true,
          leftButtonTitle: 'popup.button.ok',
        });
        return reject();
      })
      .catch(err => {
        dispatch(changeModalLoading(false));
        dispatch(
          setPopUp({
            isShow: true,
            leftButtonTitle: 'popup.button.ok',
          }),
        );
        return reject();
      });
  });

export const getReportChart = () => dispatch =>
  new Promise((resolve, reject) => {
    API.getReportChart()
      .then(res => {
        if (res.success) {
          const datafix = setDataChart(res.data);
          dispatch(handlerSetDataCahrt(datafix));
          return resolve(res);
        }
        setPopUp({
          isShow: true,
          leftButtonTitle: 'popup.button.ok',
        });
        return reject();
      })
      .catch(err => {
        dispatch(
          setPopUp({
            isShow: true,
            leftButtonTitle: 'popup.button.ok',
          }),
        );
        return reject();
      });
  });

export const getListBidder = () => dispatch =>
  new Promise((resolve, reject) => {
    API.getListBidder()
      .then(res => {
        if (res.success) {
          dispatch(handleSetListBidder(res.data));
          return resolve(res);
        }
        setPopUp({
          isShow: true,
          leftButtonTitle: 'popup.button.ok',
        });
        return reject();
      })
      .catch(err => {
        dispatch(
          setPopUp({
            isShow: true,
            leftButtonTitle: 'popup.button.ok',
          }),
        );
        return reject();
      });
  });

export const getLastwinner = () => dispatch =>
  new Promise((resolve, reject) => {
    API.getLastwinner()
      .then(res => {
        if (res.success) {
          dispatch(handleSetLastWinner(res.data));
          return resolve(res);
        }
        setPopUp({
          isShow: true,
          leftButtonTitle: 'popup.button.ok',
        });
        return reject();
      })
      .catch(err => {
        dispatch(
          setPopUp({
            isShow: true,
            leftButtonTitle: 'popup.button.ok',
          }),
        );
        return reject();
      });
  });
