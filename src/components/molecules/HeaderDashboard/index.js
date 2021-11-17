import {React, View, PropTypes, TouchableOpacity} from 'libraries';
// eslint-disable-next-line import/no-cycle
import {Text} from 'components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

const HeaderDashboard = ({toLogout}) => (
  <View style={styles.container}>
    <View>
      <Text bold style={styles.title}>
        dashboard.title
      </Text>
      <Text>dashboard.subtitle</Text>
    </View>
    <TouchableOpacity style={styles.contentLogout} onPress={toLogout}>
      <Icon name="logout" style={styles.icon} />
      <Text style={styles.logout}>dashboard.button.logout</Text>
    </TouchableOpacity>
  </View>
);

HeaderDashboard.defaultProps = {
  toLogout: () => {},
};

HeaderDashboard.propTypes = {
  toLogout: PropTypes.func,
};

export default React.memo(HeaderDashboard);
