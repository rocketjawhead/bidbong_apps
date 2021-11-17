import {
  View,
  React,
  Easing,
  Animated,
  PropTypes,
  TouchableWithoutFeedback,
} from 'libraries';

import { Image, Text } from 'components/atoms';
import { Color, METRICS } from 'utils';
import styles from './styles';

class Navbar extends React.PureComponent {
  static propTypes = {
    isActive: PropTypes.bool,
    onChangePage: PropTypes.func,
  };

  static defaultProps = {
    isActive: false,
    onChangePage: () => {},
  };

  state = {
    animationValueHome: new Animated.Value(METRICS.screen.width * 0.12),
    animationValueProfile: new Animated.Value(METRICS.screen.width * 0.12),
    animationValueStore: new Animated.Value(METRICS.screen.width * 0.12),
    viewState: 1,
    activePage: 1,
  };

  componentDidMount() {
    const { toggleAnimation } = this;
    toggleAnimation(1);
  }

  componentDidUpdate(prevProps) {
    const { isActive } = this.props;
    const { toggleAnimation } = this;
    if (isActive !== prevProps.isActive) {
      toggleAnimation();
    }
  }

  toggleAnimation = type => {
    const {
      animationValueHome,
      animationValueStore,
      animationValueProfile,
      activePage,
    } = this.state;
    const { onChangePage } = this.props;
    this.setState({ viewState: 0 });

    if (activePage === 1) {
      Animated.timing(animationValueHome, {
        toValue: METRICS.screen.width * 0.12,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }

    if (activePage === 2) {
      Animated.timing(animationValueStore, {
        toValue: METRICS.screen.width * 0.12,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }

    if (activePage === 3) {
      Animated.timing(animationValueProfile, {
        toValue: METRICS.screen.width * 0.12,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }

    if (type === 1) {
      Animated.timing(animationValueHome, {
        toValue: METRICS.screen.width * 0.25,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        onChangePage(1);
        this.setState({ viewState: 1, activePage: 1 });
      });
    }

    if (type === 2) {
      Animated.timing(animationValueStore, {
        toValue: METRICS.screen.width * 0.25,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        onChangePage(2);
        this.setState({ viewState: 2, activePage: 2 });
      });
    }

    if (type === 3) {
      Animated.timing(animationValueProfile, {
        toValue: METRICS.screen.width * 0.25,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        onChangePage(3);
        this.setState({ viewState: 3, activePage: 3 });
      });
    }
  };

  render() {
    const {
      animationValueHome,
      viewState,
      animationValueProfile,
      animationValueStore,
    } = this.state;
    const { activePage } = this.state;
    const animatedStyleHome = {
      width: animationValueHome,
    };

    const animatedStyleStore = {
      width: animationValueStore,
    };

    const animatedStyleProfile = {
      width: animationValueProfile,
    };

    const { toggleAnimation } = this;
    const colorHome = {
      backgroundColor:
        activePage === 1 ? Color.CornflowerBlue15 : Color.AthensGray,
    };
    const colorStore = {
      backgroundColor: activePage === 2 ? Color.DeYork15 : Color.AthensGray,
    };
    const colorProfile = {
      backgroundColor: activePage === 3 ? Color.BlueSea15 : Color.AthensGray,
    };
    const txtColorHome = {
      color: activePage === 1 ? Color.CornflowerBlue100 : Color.Lynch,
    };
    const txtColorStore = {
      color: activePage === 2 ? Color.DeYork : Color.Lynch,
    };
    const txtColorProfile = {
      color: activePage === 3 ? Color.BlueSea : Color.Lynch,
    };
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => toggleAnimation(1)}>
          <Animated.View
            style={[styles.animatedBox(colorHome), animatedStyleHome]}>
            <View style={styles.content}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <Image
                  source="ic-home"
                  style={styles.img}
                  contentIcon
                  imgWidth={25}
                />
              </View>
              {viewState === 1 ? (
                <Text bold style={{ ...styles.text, ...txtColorHome }}>
                  navbar.home
                </Text>
              ) : null}
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => toggleAnimation(2)}>
          <Animated.View
            style={[styles.animatedBox(colorStore), animatedStyleStore]}>
            <View style={styles.content}>
              <Image
                source="ic-store"
                style={styles.img}
                contentIcon
                imgWidth={25}
              />
              {viewState === 2 ? (
                <Text bold style={{ ...styles.text, ...txtColorStore }}>
                  navbar.store
                </Text>
              ) : null}
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => toggleAnimation(3)}>
          <Animated.View
            style={[styles.animatedBox(colorProfile), animatedStyleProfile]}>
            <View style={styles.content}>
              <Image
                source="ic-profile"
                style={styles.img}
                contentIcon
                imgWidth={25}
              />
              {viewState === 3 ? (
                <Text bold style={{ ...styles.text, ...txtColorProfile }}>
                  navbar.profile
                </Text>
              ) : null}
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default Navbar;
