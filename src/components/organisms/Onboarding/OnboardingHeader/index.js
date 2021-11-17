/* eslint-disable import/no-cycle */
import { React, View, PropTypes, Animated } from 'libraries';
import { OnboardingIndicator, Text, Button } from 'components';
import { METRICS, Color } from 'utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';

const INDICATOR = 'indicator';
const BACKGROUND_COLOR = 'BACKGROUND_COLOR';

export class OnboardingHeader extends React.PureComponent {
  static propTypes = {
    onboarding: PropTypes.array,
    activeIndex: PropTypes.number,
    activeLanguage: PropTypes.string,
    onPressToLogin: PropTypes.func,
    onPressLanguage: PropTypes.func,
    onPressSlideSkip: PropTypes.func,
  };

  static defaultProps = {
    onboarding: [],
    activeIndex: 0,
    activeLanguage: 'en',
    onPressToLogin: () => {},
    onPressLanguage: () => {},
    onPressSlideSkip: () => {},
  };

  /**
   * setup Animation Value for handling animation
   */
  pagePosition = new Animated.Value(0);

  /**
   * handle ScrollView onScroll events
   */
  onScroll = e => {
    const screenPosition = Math.round(e.nativeEvent.contentOffset.x);

    Animated.timing(this.pagePosition, {
      toValue: screenPosition,
      duration: 0,
      useNativeDriver: false,
    }).start();
  };

  /**
   * setup config for interpolation
   */
  interpolateConfig = (type, i = 0) => {
    const { getBg } = this;
    const { onboarding } = this.props;
    function outputRange() {
      switch (type) {
        case INDICATOR:
          return Array.from(Array(onboarding.length), (_, index) => index * 15);
        case BACKGROUND_COLOR:
          return Array.from(Array(onboarding.length), (_, index) =>
            getBg(index),
          );
        default:
          return Array.from(Array(onboarding.length), (_, index) => index * 15);
      }
    }
    return {
      inputRange: Array.from(
        Array(onboarding.length),
        (_, index) => index * METRICS.screen.width,
      ),
      outputRange: outputRange(),
    };
  };

  /**
   * render header section ( ToggleButtonLanguage and PageIndicator )
   */
  _renderHeader = onboarding => {
    const { interpolateConfig } = this;
    const {
      activeLanguage,
      onPressSlideSkip,
      activeIndex,
      onPressToLogin,
    } = this.props;

    const isActive = activeLanguage === 'en';
    const renderButton = activeIndex === 2;

    if (onboarding.length > 1) {
      const indicatorPosition = this.pagePosition.interpolate(
        interpolateConfig(INDICATOR),
      );

      return (
        <View style={styles.header.container}>
          <OnboardingIndicator
            onboarding={onboarding}
            indicatorPosition={indicatorPosition}
          />
          {renderButton ? (
            <View>
              <Button
                onPress={onPressToLogin}
                title="splashscreen.button"
                containerStyle={styles.buttonGetstarted}
              />
            </View>
          ) : (
            <TouchableOpacity onPress={onPressSlideSkip}>
              <Text translate={false} style={styles.textSkip}>
                SKIP
              </Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }
  };

  render() {
    const { _renderHeader } = this;

    const { onboarding } = this.props;

    if (onboarding.length > 0) {
      return <View style={styles.container}>{_renderHeader(onboarding)}</View>;
    }
    return null;
  }
}

export default OnboardingHeader;
