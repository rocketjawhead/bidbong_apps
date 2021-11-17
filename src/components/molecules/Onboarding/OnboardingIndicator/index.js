import {React, View, Animated, PropTypes} from 'libraries';
import styles from './styles';

class OnboardingIndicator extends React.PureComponent {
  static propTypes = {
    onboarding: PropTypes.array,
    indicatorPosition: PropTypes.object,
  };

  static defaultProps = {
    onboarding: [],
  };

  render() {
    const {onboarding, indicatorPosition} = this.props;

    return (
      <View style={styles.container}>
        <Animated.View style={styles.active(indicatorPosition)} />
        {onboarding.map((_, i) => (
          <View key={i} style={styles.inactive} />
        ))}
      </View>
    );
  }
}

export default OnboardingIndicator;
