import { React, View, PropTypes, TouchableOpacity } from 'libraries';
import { Text } from 'components/atoms';
import moment from 'moment';
import styles from './styles';

const CardNotification = ({ data, onPress }) => {
  const time = moment(data.createdAt).format('llll');
  return (
    <TouchableOpacity
      style={styles.continer(data.read)}
      onPress={() => onPress(data)}>
      <Text bold style={styles.title} translate={false}>
        {data.title}
      </Text>
      <Text style={styles.body} translate={false}>
        {data.body}
      </Text>
      <Text style={styles.time} translate={false}>
        {time}
      </Text>
    </TouchableOpacity>
  );
};

CardNotification.defaultProps = {
  data: {},
  onPress: () => {},
};

CardNotification.propTypes = {
  data: PropTypes.object,
  onPress: PropTypes.func,
};

export default React.memo(CardNotification);
