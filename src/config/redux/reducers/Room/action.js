/* eslint-disable import/no-cycle */
import API from 'config/API';
import { func } from 'utils';
import { setPopUp } from '../popup/action';
import { changeModalLoading } from '../modal/action';
import actionTypes from './constant';
import { transformListRoom } from './selector';

export const setListRoom = value => ({
  type: actionTypes.SET_LIST_ROOM,
  value,
});

export const setAllRoom = value => ({
  type: actionTypes.SET_ALL_ROOM,
  value,
});

const setDetailRoom = value => ({
  type: actionTypes.SET_DETAIL_ROOM,
  value,
});

export const clearListRoom = () => ({
  type: actionTypes.CLEAR_LIST_ROOM,
});

export const getWaitingRoom = () => dispatch =>
  new Promise((resolve, reject) => {
    API.getWaitingRoom()
      .then(res => {
        const data = res.data.map(x => transformListRoom(x, 'waiting'));
        if (res.success) {
          dispatch(setListRoom(data));
          return resolve();
        }
        setPopUp({
          isShow: true,
          leftButtonTitle: 'popup.button.ok',
        });
        return reject();
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

export const getEndRoom = () => dispatch =>
  new Promise((resolve, reject) => {
    API.getEndRoom()
      .then(res => {
        const data = res.data.map(x => transformListRoom(x, 'end'));
        if (res.success) {
          dispatch(setListRoom(data));
          return resolve();
        }
        setPopUp({
          isShow: true,
          leftButtonTitle: 'popup.button.ok',
        });
        return reject();
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

export const getListRoom = () => dispatch =>
  new Promise((resolve, reject) => {
    API.getListRoom()
      .then(res => {
        const data = res.data.map(x => transformListRoom(x, 'list'));
        if (res.success) {
          dispatch(setListRoom(data));
          return resolve();
        }
        setPopUp({
          isShow: true,
          leftButtonTitle: 'popup.button.ok',
        });
        return reject();
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

export const getLiveRoom = () => dispatch =>
  new Promise((resolve, reject) => {
    API.getLiveRoom()
      .then(res => {
        const data = res.data.map(x => transformListRoom(x, 'live'));
        if (res.success) {
          dispatch(setListRoom(data));
          return resolve();
        }
        setPopUp({
          isShow: true,
          leftButtonTitle: 'popup.button.ok',
        });
        return reject();
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

export const getDetailAdminRoom = p => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(changeModalLoading(true));
    API.adminDetailRoom(p)
      .then(res => {
        dispatch(changeModalLoading(false));
        if (res.success) {
          dispatch(setDetailRoom(res.data[0]));
          return resolve();
        }
        setPopUp({
          isShow: true,
          leftButtonTitle: 'popup.button.ok',
        });
        return reject();
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

export const getDetailRoom = p => dispatch =>
  new Promise((resolve, reject) => {
    API.getDetailRoom(p)
      .then(res => {
        if (res.success) {
          dispatch(setDetailRoom(res.data[0]));
          return resolve();
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

export const getAdminLiveRoom = () => dispatch =>
  new Promise((resolve, reject) => {
    API.getAdminLiveRoom()
      .then(res => {
        const data = res.data.map(x => transformListRoom(x, 'live'));
        if (res.success) {
          dispatch(setListRoom(data));
          return resolve();
        }
        setPopUp({
          isShow: true,
          leftButtonTitle: 'popup.button.ok',
        });
        return reject();
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

export const getAdminWaitingRoom = () => dispatch =>
  new Promise((resolve, reject) => {
    API.getAdminWaitingRoom()
      .then(res => {
        const data = res.data.map(x => transformListRoom(x, 'waiting'));
        if (res.success) {
          dispatch(setListRoom(data));
          return resolve();
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

export const getAdminEndRoom = () => dispatch =>
  new Promise((resolve, reject) => {
    API.getAdminEndRoom()
      .then(res => {
        const data = res.data.map(x => transformListRoom(x, 'end'));
        if (res.success) {
          dispatch(setListRoom(data));
          return resolve();
        }
        setPopUp({
          isShow: true,
          leftButtonTitle: 'popup.button.ok',
        });
        return reject();
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

export const createProduct = payload => dispatch =>
  new Promise((resolve, reject) => {
    API.createProduct(payload)
      .then(res => {
        if (res.success) {
          return resolve(res);
        }
        return reject(res);
      })
      .catch(err => reject(err));
  });

export const createRoom = payload => dispatch =>
  new Promise((resolve, reject) => {
    API.createRoom(payload)
      .then(res => {
        if (res.success) {
          return resolve(res);
        }
        return reject(res);
      })
      .catch(err => reject(err));
  });

export const deleteProduct = payload => dispatch =>
  new Promise((resolve, reject) => {
    API.deleteProduct(payload)
      .then(res => {
        if (res.success) {
          return resolve(res);
        }
        setPopUp({
          isShow: true,
          leftButtonTitle: 'popup.button.ok',
        });
        return reject();
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

export const deleteRoom = payload => dispatch =>
  new Promise((resolve, reject) => {
    API.deleteRoom(payload)
      .then(res => {
        if (res.success) {
          getAdminLiveRoom();
          getAdminWaitingRoom();
          getAdminEndRoom();
          dispatch(
            setPopUp({
              desc: 'popup.desc.successDeleteRoom',
              title: 'popup.title.successDelete',
              isShow: true,
              leftButtonTitle: 'popup.button.ok',
            }),
          );
          return resolve();
        }
        dispatch(
          setPopUp({
            isShow: true,
            translate: false,
            leftButtonTitle: 'popup.button.ok',
            desc: res.error,
          }),
        );
        return reject();
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

export const editProduct = payload => dispatch =>
  new Promise((resolve, reject) => {
    API.editProduct(payload)
      .then(res => {
        if (res.success) {
          return resolve(res);
        }
        setPopUp({
          isShow: true,
          leftButtonTitle: 'popup.button.ok',
        });
        return reject();
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

export const editRoom = payload => dispatch =>
  new Promise((resolve, reject) => {
    API.editRoom(payload)
      .then(res => {
        if (res.success) {
          dispatch(
            setPopUp({
              desc: 'popup.desc.successUpdateRoom',
              title: 'popup.title.success',
              isShow: true,
              leftButtonTitle: 'popup.button.ok',
            }),
          );
          return resolve(res);
        }
        setPopUp({
          isShow: true,
          leftButtonTitle: 'popup.button.ok',
        });
        return reject();
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

export const setLeaveRoom = payload => dispatch =>
  new Promise((resolve, reject) => {
    API.leaveRoom(payload)
      .then(res => {
        if (res.success) {
          return resolve(res);
        }
        setPopUp({
          isShow: true,
          leftButtonTitle: 'popup.button.ok',
        });
        return reject();
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
