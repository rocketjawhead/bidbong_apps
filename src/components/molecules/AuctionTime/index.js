/* eslint-disable import/no-cycle */
import { React, View, PropTypes } from 'libraries';
import { Text } from 'components';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import styles from './styles';

const _renderTime = (days, hours, minutes, seconds, time, type) => {
  if (type === 'end') {
    const fixTime = moment(time).format('MMMM Do, YYYY-h:mm:ss');
    return (
      <Text bold style={styles.text.countdown} translate={false}>
        {fixTime}
      </Text>
    );
  }
  return (
    <Text bold style={styles.text.countdown} translate={false}>
      {`${days}d : ${hours}h : ${minutes}m : ${seconds}s`}
    </Text>
  );
};

const AuctionTime = ({ seconds, minutes, hours, days, type, time }) => {
  const isWaiting = type === 'waiting';
  return (
    <View style={styles.container.countdown}>
      <Feather name="clock" style={styles.icon.time} />
      <View style={styles.content.countdown}>
        {isWaiting ? (
          <Text bold style={styles.text.time}>
            component.auctionStartTime
          </Text>
        ) : (
          <Text bold style={styles.text.time}>
            component.auctionEndTime
          </Text>
        )}
        {_renderTime(days, hours, minutes, seconds, time, type)}
      </View>
    </View>
  );
};

AuctionTime.defaulltProps = {
  seconds: 0,
  minutes: 0,
  hours: 0,
  days: 0,
  type: 'start',
  time: '',
};

AuctionTime.propTypes = {
  seconds: PropTypes.number,
  minutes: PropTypes.number,
  hours: PropTypes.number,
  days: PropTypes.number,
  type: PropTypes.string,
  time: PropTypes.string,
};

export default React.memo(AuctionTime);
