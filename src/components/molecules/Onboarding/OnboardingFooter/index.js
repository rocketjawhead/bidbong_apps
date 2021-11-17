import { React, Animated, PropTypes, TouchableOpacity } from 'libraries';
import { Text } from 'components/atoms';
import styles from './styles';

class OnboardingFooter extends React.PureComponent {
  static propTypes = {
    isLastIndex: PropTypes.bool,
    policyOpacity: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    onPressFooter: PropTypes.func,
    applicationName: PropTypes.string,
    onPressSlideSkip: PropTypes.func,
    onPressSlideNext: PropTypes.func,
    buttonNextOpacity: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object
    ]),
    isOnboardingEnabled: PropTypes.bool
  };

  static defaultProps = {
    isLastIndex: false,
    policyOpacity: 1,
    applicationName: '',
    buttonNextOpacity: 0,
    isOnboardingEnabled: false,
    onPressFooter: () => {},
    onPressSlideSkip: () => {},
    onPressSlideNext: () => {}
  };

  render() {
    const {
      isLastIndex,
      policyOpacity,
      onPressFooter,
      applicationName,
      onPressSlideSkip,
      onPressSlideNext,
      buttonNextOpacity,
      isOnboardingEnabled
    } = this.props;

    if (isLastIndex || !isOnboardingEnabled) {
      return (
        <Animated.View style={styles.policy.container(policyOpacity)}>
          <Text translate={false}>
            <Text
              md
              caption
              style={styles.policy.text.desc}
              params={{
                product: applicationName
              }}
            >
              footer.onboarding.agreement1
            </Text>
            <Text
              md
              bold
              caption
              style={styles.policy.text.underline}
              onPress={() => onPressFooter('termsOfService')}
            >
              footer.onboarding.termsOfServices
            </Text>
            <Text md white caption style={styles.policy.text.desc}>
              footer.onboarding.agreement2
            </Text>
            <Text
              md
              bold
              caption
              style={styles.policy.text.underline}
              onPress={() => onPressFooter('privacyPolicy')}
            >
              footer.onboarding.privacyPolicy
            </Text>
            <Text md white caption style={styles.policy.text.desc}>
              productBeta
            </Text>
          </Text>
        </Animated.View>
      );
    }
    return (
      <Animated.View style={styles.button.container(buttonNextOpacity)}>
        <TouchableOpacity
          style={styles.button.button.skip}
          onPress={onPressSlideSkip}
        >
          <Text md style={styles.button.text.skip}>
            button.skip
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button.button.next}
          onPress={onPressSlideNext}
        >
          <Text md bold style={styles.button.text.next}>
            button.continue
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default OnboardingFooter;
