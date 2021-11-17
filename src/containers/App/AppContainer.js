/* eslint-disable import/no-unresolved */
import messaging from '@react-native-firebase/messaging';
import { Popup } from 'components';
import {
  setPopUp,
  clearPopUp,
  setAppState,
  setDeeplinkUrl,
  setIsConnected,
  setPushNotificationData,
} from 'config';
import { config } from 'config/API/url';
import AppRoute, { AppRouteReset, AppRouteNavigate } from 'config/routes';
import { PropTypes, React, StatusBar, View, Linking } from 'libraries';
import { Loading } from 'pages';
import { connect } from 'react-redux';
import moment from 'moment';
import SocketIOClient from 'socket.io-client';
import {
  Color,
  func,
  isIos,
  Analytic,
  isAndroid,
  NOTIF_APP_OPEN,
  NOTIF_APP_CLOSE,
  NOTIF_APP_MINIMIZE,
} from 'utils';

const styles = {
  container: {
    flex: 1,
    backgroundColor: Color.WhiteLilac,
  },
};

class Application extends React.Component {
  connectionListener = null;

  notificationListener = null;

  notificationOpenedListener = null;

  constructor(props) {
    super(props);
    this.socket = SocketIOClient(config.url.api); // replace 'environment.serverUrl' with your server url
  }

  componentDidMount() {
    const {
      initDeeplinkInitUrl,
      initAppStateListener,
      requestUserPermission,
      initConnectionListener,
      initDeepLinkingListener,
      initNotificationListeners,
      initNotificationListenersClose,
    } = this;
    requestUserPermission();
    initDeeplinkInitUrl();
    initAppStateListener();
    initConnectionListener();
    initDeepLinkingListener();
    initNotificationListeners();
    initNotificationListenersClose();
  }

  /**
   * ======================================================================
   * LISTENER FUNCTIONS
   * ======================================================================
   */
  /**
   * init notification listener
   */
  initNotificationListeners = async () => {
    const { handleNotification } = this;

    this.notificationListener = messaging().onMessage(remoteMessage => {
      const notification = {
        data: remoteMessage.data,
        ...remoteMessage.notification,
      };
      handleNotification(notification, NOTIF_APP_OPEN);
    });

    this.notificationOpenedListener = messaging().onNotificationOpenedApp(
      remoteMessage => {
        const notification = {
          data: remoteMessage.data,
          ...remoteMessage.notification,
        };
        handleNotification(notification, NOTIF_APP_MINIMIZE);
      },
    );
  };

  /**
   * @name initAppStateListener
   * @description handle event init app state listener
   */
  initAppStateListener = () => {
    func.addAppStateListener(this.appStateChangeHandler);
  };

  /**
   * @name initDeeplinkInitUrl
   * @description init deep link url
   */
  initDeeplinkInitUrl = async () => {
    const { deepLinkingHandler } = this;
    try {
      const urlString = await Linking.getInitialURL();

      if (urlString)
        return deepLinkingHandler(
          {
            url: urlString,
          },
          true,
        );
      return null;
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * @name initDeepLinkingListener
   * @description handle event init deep linking listener
   */
  initDeepLinkingListener = () =>
    func.addLinkingUrlListener(this.deepLinkingHandler);

  /**
   * @name removeDeepLinkingListener
   * @description handle event remove deep linking listener
   */
  removeDeepLinkingListener = () =>
    func.removeLinkingUrlListener(this.deepLinkingHandler);

  /**
   * init notification listener close
   */
  initNotificationListenersClose = async () => {
    const notificationOpen = await messaging().getInitialNotification();

    if (notificationOpen) {
      const notification = {
        data: notificationOpen.data,
        ...notificationOpen.notification,
      };
      this.handleNotification(notification, NOTIF_APP_CLOSE);
    }
  };

  /**
   * @name initConnectionListener
   * @description handle event init connection listener
   */
  initConnectionListener = () => {
    this.connectionListener = func.addConnectionListener(
      this.connectionStateHandler,
    );
  };

  /**
   * init notification listener
   */
  initNotificationListeners = async () => {
    const { handleNotification } = this;

    this.notificationListener = messaging().onMessage(remoteMessage => {
      const notification = {
        data: remoteMessage.data,
        ...remoteMessage.notification,
      };
      handleNotification(notification, NOTIF_APP_OPEN);
    });

    this.notificationOpenedListener = messaging().onNotificationOpenedApp(
      remoteMessage => {
        const notification = {
          data: remoteMessage.data,
          ...remoteMessage.notification,
        };
        handleNotification(notification, NOTIF_APP_MINIMIZE);
      },
    );
  };

  /**
   * @name deepLinkingHandler
   * @param {string} deeplink - params for deeplink url data
   * @param {bool} isClosedApp - params for detect app is closed (not minimized)
   * @description handle event deep linking
   */
  deepLinkingHandler = async (deeplink, isClosedApp = false) => {
    const { setDeeplink } = this;

    if (deeplink && deeplink.url) {
      /**
       * ======================================================================
       * handle params from linking
       * ======================================================================
       */

      const params = func.getParamsFromLinking(deeplink.url);

      if (params !== null) {
        const { type } = params;
        return setDeeplink(deeplink.url);
      }
    }
  };

  /**
   * @name appStateChangeHandler
   * @description handle event when there is app state change
   */
  appStateChangeHandler = appState => {
    const { reqSetAppState } = this.props;

    return reqSetAppState(appState);
  };

  /**
   * @name connectionStateHandler
   * @description handle event when there is connection state change
   */
  connectionStateHandler = connectionState => {
    const {
      popup,
      reqSetPopUp,
      reqClearPopUp,
      reqSetIsConnected,
      isOfflineNoticeAllowToShow,
    } = this.props;

    const { isConnected } = connectionState;

    reqSetIsConnected(isConnected);

    if (isOfflineNoticeAllowToShow && !isConnected) {
      return reqSetPopUp({
        type: 'default',
        desc: 'popup.desc.noInternet',
        title: 'popup.title.noInternet',
        isShow: true,
      });
    }

    if (popup.isShow === true && popup.type === 'nointernet') {
      return reqClearPopUp();
    }
  };

  /**
   * handle received notification
   */
  handleNotification = async (notification, type) => {
    const { setDeeplink, validateNotificationHandler } = this;
    const { reqSetPushNotificationData } = this.props;
    const payloadNotification = notification.payload
      ? notification.payload
      : notification;

    const notificationPayload = { ...payloadNotification.data, type };
    const params = func.getParamsFromLinking(notificationPayload.deepLink);
    const isVoucher = params && params.type === 'voucher';
    const deeplink = isVoucher
      ? `${notificationPayload?.deepLink}&title=${notification?.title}&desc=${notification?.body}`
      : notificationPayload?.deepLink;

    await reqSetPushNotificationData({ deepLink: deeplink, type });

    return validateNotificationHandler();
  };

  /**
   * validate action when user tap to notification
   */
  validateNotificationHandler = async () => {
    const { setDeeplink, initProductType, resetNavigationToDashboard } = this;
    const { pushNotificationData, reqSetPushNotificationData } = this.props;
    if (pushNotificationData.deepLink) {
      setDeeplink(pushNotificationData.deepLink);
    }
    const result = func.validatePushNotification(pushNotificationData);
    if (result === null) return;

    if (result.type === 'livechat') {
      await reqSetPushNotificationData(result.params);
    }

    if (result.type === 'productType') initProductType(true);
    return resetNavigationToDashboard(result.navigationPayload);
  };

  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const token = await messaging().getToken();
      console.log('AuthorizationStatus', token);
      console.log('Authorization status:', authStatus);
    }
  };

  /**
   * @name setDeeplink
   * @param {string} deeplinkUrl - deeplink url
   * @description set deeplink url to local state
   */
  setDeeplink = deeplinkUrl => {
    const { reqSetDeeplinkUrl } = this.props;

    return reqSetDeeplinkUrl(deeplinkUrl);
  };

  /**
   * reset navigation to dashboard
   */
  resetNavigationToDashboard = (
    navigationPayload = {
      index: 0,
      routes: [],
    },
  ) => {
    const navRoutes =
      navigationPayload.routes.length > 0
        ? [{ name: 'DASHBOARD' }, ...navigationPayload.routes]
        : [{ name: 'DASHBOARD' }];

    const resetRoute = {
      index: navigationPayload.index,
      routes: navRoutes,
    };

    return AppRouteReset(resetRoute);
  };

  /**
   * continue navigation
   */
  handleNavigation = (
    navigationPayload = {
      index: 0,
      routes: [],
    },
  ) => AppRouteNavigate(navigationPayload.routes[0]);

  _renderContent = () => (
    <AppRoute
      ref={nav => {
        this.AppNavigator = nav;
      }}
    />
  );

  render() {
    const { _renderContent } = this;
    const { popup, reqClearPopUp } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        {_renderContent()}
        <Loading />
        <Popup popup={popup} onPressDefault={reqClearPopUp} />
      </View>
    );
  }
}

Application.defaultProps = {
  pushNotificationData: {},
  isOfflineNoticeAllowToShow: true,
  reqSetPopUp: () => {},
  reqClearPopUp: () => {},
  reqSetAppState: () => {},
  reqSetDeeplinkUrl: () => {},
  reqSetIsConnected: () => {},
  reqSetPushNotificationData: () => {},
};

Application.propTypes = {
  popup: PropTypes.object.isRequired,
  reqSetPopUp: PropTypes.func,
  reqClearPopUp: PropTypes.func,
  reqSetAppState: PropTypes.func,
  reqSetDeeplinkUrl: PropTypes.func,
  reqSetIsConnected: PropTypes.func,
  pushNotificationData: PropTypes.object,
  isOfflineNoticeAllowToShow: PropTypes.bool,
  reqSetPushNotificationData: PropTypes.func,
};

const reduxState = state => ({
  popup: state.popup,
  pushNotificationData: state.notification.pushNotificationData,
  isOfflineNoticeAllowToShow: state.setting.isOfflineNoticeAllowToShow,
});

const reduxDispatch = dispatch => ({
  reqSetPopUp: p => dispatch(setPopUp(p)),
  reqClearPopUp: () => dispatch(clearPopUp()),
  reqSetAppState: p => dispatch(setAppState(p)),
  reqSetDeeplinkUrl: p => dispatch(setDeeplinkUrl(p)),
  reqSetIsConnected: p => dispatch(setIsConnected(p)),
  reqSetPushNotificationData: async p => dispatch(setPushNotificationData(p)),
});

export default connect(reduxState, reduxDispatch)(Application);
