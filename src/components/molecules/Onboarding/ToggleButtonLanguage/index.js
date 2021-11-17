import {
  View,
  React,
  Easing,
  Animated,
  PropTypes,
  TouchableOpacity,
} from 'libraries';
import { Text } from 'components/atoms';
import styles from './styles';

class ToggleButton extends React.PureComponent {
  static propTypes = {
    onPress: PropTypes.func,
    isActive: PropTypes.bool,
  };

  static defaultProps = {
    isActive: false,
    onPress: () => {},
  };

  animatedValue = new Animated.Value(0);

  componentDidMount() {
    const { isActive } = this.props;
    const { handleActivateStatus } = this;

    if (isActive) {
      handleActivateStatus(0, 1);
    } else {
      handleActivateStatus(1, 0);
    }
  }

  componentDidUpdate(prevProps) {
    const { isActive } = this.props;
    const { handleActivateStatus } = this;

    /**
     * compare props { isActive }
     * if there is any change between this.props and previous props
     * it will trigger func this.handleActivateStatus
     */
    if (prevProps.isActive !== isActive) {
      if (prevProps.isActive === true && isActive === false) {
        handleActivateStatus(1, 0);
      } else {
        handleActivateStatus(0, 1);
      }
    }
  }

  // handle event when user tap the button
  onPress = () => {
    const { onPress, isActive } = this.props;

    /**
     * event onPress will be triggered with a payload.
     * if this.props.isActive value === true, the payload will be id
     * else the payload will be en
     */
    onPress(isActive ? 'id' : 'en');
  };

  // handle animation event
  handleActivateStatus = (start, finish) => {
    // set initial value for this.animatedValue using params { start }
    this.animatedValue.setValue(start);

    /**
     * start animated using Animated.timing and Easing.ease
     * with duration 100 ms and
     * set toValue with params { finish }
     *
     * possible value for { start , finish } is 0 or 1
     */
    Animated.timing(this.animatedValue, {
      toValue: finish,
      easing: Easing.ease,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  render() {
    const { onPress, animatedValue } = this;
    const { isActive } = this.props;

    /**
     * initialize style controller that can change dynamically
     * according to the value of this.animatedValue
     */
    const translateX = animatedValue.interpolate({
      inputRange: [0, 1], // set inputRange value that will be used by this.handleActivateStatus
      outputRange: [0, 24], // set outputRange value indicates the value that will change
    });

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.container}
        onPress={onPress}>
        <Animated.View style={styles.indicator(translateX)} />
        <View style={styles.content.container}>
          <View style={styles.content.button}>
            <Text
              bold={!isActive}
              translate={false}
              style={styles.content.text}>
              ID
            </Text>
          </View>
          <View style={styles.content.button}>
            <Text bold={isActive} translate={false} style={styles.content.text}>
              EN
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ToggleButton;
