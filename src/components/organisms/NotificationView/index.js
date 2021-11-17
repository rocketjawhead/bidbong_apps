import { React, View, SafeAreaView, PropTypes, ScrollView } from 'libraries';
// eslint-disable-next-line import/no-cycle
import { NavigationHeader, Text, CardNotification } from 'components';
import _ from 'lodash';
import styles from './styles';

class NotificationView extends React.Component {
  _renderListNotification = () => {
    const { notificationData, handlerReadNotif } = this.props;
    return notificationData.map((data, i) => (
      <CardNotification data={data} key={i} onPress={handlerReadNotif} />
    ));
  };

  _renderEmptyState = () => {
    const a = '';
    return (
      <View style={styles.container.empty}>
        <Text>notification.empty.title</Text>
      </View>
    );
  };

  render() {
    const { _renderListNotification, _renderEmptyState } = this;
    const { notificationData } = this.props;
    const isEmpty = _.isEmpty(notificationData);
    const content = isEmpty ? _renderEmptyState() : _renderListNotification();
    return (
      <ScrollView style={styles.bg}>
        <SafeAreaView>
          <View style={styles.container.main}>
            <NavigationHeader />
            <Text h2 style={styles.title}>
              notification.title
            </Text>
            <View style={styles.content}>{content}</View>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

NotificationView.defaultProps = {
  notificationData: [],
  handlerReadNotif: () => {},
};

NotificationView.propTypes = {
  handlerReadNotif: PropTypes.func,
  notificationData: PropTypes.array,
};

export default NotificationView;
