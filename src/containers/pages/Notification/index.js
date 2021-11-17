import { React, PropTypes } from 'libraries';
import { NotificationView } from 'components';
import AppRoute, { AppRouteReset, AppRouteNavigate } from 'config/routes';
import { connect } from 'react-redux';
import { getNotificationInbox, readNotification } from 'config';
import { func } from 'utils';

class Notification extends React.Component {
  async componentDidMount() {
    const { reqGetNotificationInbox } = this.props;
    reqGetNotificationInbox();
  }

  /**
   * function for read notif
   * @param {} data
   */
  handlerReadNotif = async data => {
    const { reqSetReadNotification, reqGetNotificationInbox } = this.props;
    const payload = {
      body: {
        id: data.id,
      },
    };
    const res = await reqSetReadNotification(payload);
    if (res.success) {
      reqGetNotificationInbox();
      this.validateNotificationHandler(data.deeplink);
    }
  };

  /**
   * @name handleNavigation
   * @param {object} navigationPayload
   * @description handle navigation from top container
   */
  handleNavigation = (
    navigationPayload = {
      index: 0,
      routes: [],
    },
  ) => AppRouteNavigate(navigationPayload.routes[0]);

  /**
   * handler post read notification
   */
  validateNotificationHandler = url => {
    const { handleNavigation } = this;

    if (!url || url === null) return;

    const result = func.validateNotification({ url, isInbox: true });
    return handleNavigation(result.navigationPayload);
  };

  /**
   * @param {object} a
   * @param {object} b
   * @description for sorting notif
   */
  sorting = (a, b) => {
    const CategoryA = a.id;
    const CategoryB = b.id;

    let comparison = 0;
    if (CategoryA < CategoryB) {
      comparison = 1;
    } else if (CategoryA > CategoryB) {
      comparison = -1;
    }
    return comparison;
  };

  render() {
    const { notificationData } = this.props;
    const { handlerReadNotif, sorting } = this;
    const listNotif = notificationData.sort(sorting);
    return (
      <NotificationView
        notificationData={listNotif}
        handlerReadNotif={handlerReadNotif}
      />
    );
  }
}

Notification.defaultProps = {
  notificationData: [],
  reqSetReadNotification: () => {},
  reqGetNotificationInbox: () => {},
};

Notification.propTypes = {
  notificationData: PropTypes.array,
  reqSetReadNotification: PropTypes.func,
  reqGetNotificationInbox: PropTypes.func,
};

const mapStateToProps = state => ({
  notificationData: state.notification.notificationData,
});

const mapDispatchToProps = dispatch => ({
  reqSetReadNotification: p => dispatch(readNotification(p)),
  reqGetNotificationInbox: () => dispatch(getNotificationInbox()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
