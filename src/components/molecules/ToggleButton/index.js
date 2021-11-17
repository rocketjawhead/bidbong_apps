import {
  View,
  Text,
  React,
  Easing,
  Animated,
  PropTypes,
  TouchableWithoutFeedback,
} from 'libraries';

import { Image } from 'components/atoms';
import Styles from './styles';

class ToggleButton extends React.PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    label: PropTypes.string,
    color: PropTypes.string,
    isActive: PropTypes.bool,
    backgroundColor: PropTypes.string,
  };

  static defaultProps = {
    icon: '',
    label: '',
    color: '',
    isActive: false,
    backgroundColor: '',
  };

  constructor() {
    super();
    this.state = {
      animationValue: new Animated.Value(40),
      animatedValue: new Animated.Value(0),
      viewState: true,
    };
  }

  componentDidUpdate(prevProps) {
    const { isActive } = this.props;
    const { toggleAnimation } = this;
    if (isActive !== prevProps.isActive) {
      toggleAnimation();
    }
  }

  toggleAnimation = () => {
    const { animationValue, viewState } = this.state;
    if (viewState == true) {
      Animated.timing(animationValue, {
        toValue: 100,
        useNativeDriver: false,
      }).start(() => {
        this.setState({ viewState: false });
      });
    } else {
      Animated.timing(animationValue, {
        toValue: 40,
        useNativeDriver: false,
      }).start(this.setState({ viewState: true }));
    }
  };

  render() {
    const { animationValue, viewState } = this.state;
    const animatedStyle = {
      width: animationValue,
    };

    const { toggleAnimation } = this;

    const { icon, label } = this.props;
    return (
      <TouchableWithoutFeedback onPress={toggleAnimation}>
        <Animated.View style={[Styles.animatedBox, animatedStyle]}>
          <View style={Styles.container}>
            <Image source={icon} style={Styles.img} />
            {viewState ? null : <Text>{label}</Text>}
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ToggleButton;
