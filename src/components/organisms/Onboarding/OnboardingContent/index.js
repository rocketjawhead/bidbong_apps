import { React, View, PropTypes, Animated } from 'libraries';
import {
  OnboardingFooter,
  OnboardingContentButton,
} from 'components/molecules';
import { METRICS, Color } from 'utils';
import { Text } from 'components/atoms';
import styles from './styles';

const BUTTON = 'button';
const TEXT_DESC = 'textDesc';
const TEXT_TITLE = 'textTitle';
const BUTTON_SKIP = 'buttonSkip';

export class OnboardingContent extends React.PureComponent {
  static propTypes = {
    onboarding: PropTypes.array,
    isLastIndex: PropTypes.bool,
    onPressLogin: PropTypes.func,
    onPressFooter: PropTypes.func,
    activeLanguage: PropTypes.string,
    onPressLanguage: PropTypes.func,
    applicationName: PropTypes.string,
    onPressSlideNext: PropTypes.func,
    onPressSlideSkip: PropTypes.func,
    onPressCreateBundle: PropTypes.func,
    isOnboardingEnabled: PropTypes.bool,
  };

  static defaultProps = {
    onboarding: [],
    isLastIndex: true,
    activeLanguage: 'en',
    applicationName: '',
    isOnboardingEnabled: false,
    onPressLogin: () => {},
    onPressFooter: () => {},
    onPressLanguage: () => {},
    onPressSlideNext: () => {},
    onPressSlideSkip: () => {},
    onPressCreateBundle: () => {},
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
   * handle when user press Terms of Condition or Privacy Policy at footer
   */
  onPressFooter = type => {
    const { isLastIndex, onPressFooter } = this.props;
    if (isLastIndex) onPressFooter(type);
  };

  /**
   * setup config for interpolation
   */
  interpolateConfig = (type, i = 0) => {
    const { onboarding } = this.props;
    function outputRange() {
      switch (type) {
        case TEXT_TITLE:
          return Array.from(Array(onboarding.length), (_, index) => {
            if (index === i) return 1;
            return 0;
          });
        case TEXT_DESC:
          return Array.from(Array(onboarding.length), (_, index) => {
            if (index === i) {
              return 1;
            }
            return 0;
          });
        case BUTTON_SKIP:
          return Array.from(Array(onboarding.length), (_, index) => {
            if (index === onboarding.length - 1) return 0;
            return 1;
          });
        case BUTTON:
          return Array.from(Array(onboarding.length), (_, index) => {
            if (index === onboarding.length - 1) return 1;
            return 0;
          });
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
   * render onboarding text section
   */
  _renderTextBody = (data, i) => {
    const { interpolateConfig } = this;
    const { onboarding, activeLanguage } = this.props;

    const textTitleOpacity =
      onboarding.length <= 1
        ? 1
        : this.pagePosition.interpolate(interpolateConfig(TEXT_TITLE, i));
    const textDescOpacity =
      onboarding.length <= 1
        ? 1
        : this.pagePosition.interpolate(interpolateConfig(TEXT_DESC, i));

    return (
      <View key={i} style={styles.body.content} pointerEvents="box-none">
        <Animated.Text style={styles.text.title(textTitleOpacity)}>
          {data.title[activeLanguage]}
        </Animated.Text>
        <View style={styles.text.container} pointerEvents="none">
          <Animated.Text style={styles.text.desc(textDescOpacity)}>
            {data.desc[activeLanguage]}
          </Animated.Text>
        </View>
      </View>
    );
  };

  render() {
    const { _renderTextBody } = this;

    const { onboarding } = this.props;

    if (onboarding.length > 0) {
      return (
        <View style={styles.container}>
          <View style={styles.body.container}>
            {onboarding.map((data, i) => _renderTextBody(data, i))}
          </View>
        </View>
      );
    }
    return null;
  }
}

export default OnboardingContent;
