import {React, TouchableOpacity, PropTypes, View} from 'libraries';
import {Text, Image} from 'components/atoms';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

class ButtonReservation extends React.PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    onPress: () => {},
    icon: 'ic-wood-key',
    disabled: false,
  };

  render() {
    const {onPress, disabled, icon} = this.props;
    return (
      <LinearGradient
        colors={styles.bgColor(disabled)}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.linearGradient}>
        <TouchableOpacity onPress={onPress} style={styles.container}>
          <View style={styles.content.key}>
            <Text style={styles.buttonText} bold translate={false}>
              1x
            </Text>
            <Image
              contentIcon
              source={icon}
              imgWidth={40}
              style={styles.image}
            />
          </View>
          <Text style={styles.buttonTextBuy}>
            reservation.button.reservation
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

export default ButtonReservation;
