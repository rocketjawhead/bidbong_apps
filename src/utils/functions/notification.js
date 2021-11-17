/* eslint-disable import/no-cycle */
/* eslint-disable prefer-promise-reject-errors */
import { NOTIF_APP_CLOSE, NOTIF_APP_MINIMIZE } from 'utils';
import { getParamsFromLinking } from './fn';

const basicNavigationHandler = (
  navigationPayload = {
    index: 0,
    routes: [],
  },
) => navigationPayload;

const defaultNotificationHandler = () => ({
  type: null,
  navigationPayload: basicNavigationHandler(),
});

const notificationReservationRoom = payload => ({
  type: null,
  navigationPayload: {
    index: 1,
    routes: [
      {
        name: 'RESERVATION',
        params: {
          payload,
        },
      },
    ],
  },
});

const notificationWinner = payload => ({
  type: null,
  navigationPayload: {
    index: 1,
    routes: [
      { name: 'CART' },
      {
        name: 'RESERVATION',
        params: {
          payload,
        },
      },
    ],
  },
});

const validateNotification = ({ url, isInbox, state = {} }) => {
  const params = getParamsFromLinking(url);

  if (params && params.type) {
    switch (params.type) {
      case 'dashboard':
      case 'reminder_bidding':
      case 'user_lose':
        return defaultNotificationHandler();
      case 'reservation':
        return notificationReservationRoom(params);
      case 'winner':
      case 'reminder_checkout':
      case 'detail_transaction':
        return notificationWinner(params);
      default:
        return defaultNotificationHandler();
    }
  }

  return defaultNotificationHandler();
};

const validatePushNotification = p => {
  if (
    typeof p === 'object' &&
    (p.type === NOTIF_APP_CLOSE || p.type === NOTIF_APP_MINIMIZE) &&
    (p.deepLink || p.url)
  ) {
    const url = p.deepLink ? p.deepLink : p.url;
    return validateNotification({
      url,
      isInbox: false,
      state: p,
    });
  }

  return defaultNotificationHandler();
};

export default {
  validateNotification,
  validatePushNotification,
};
