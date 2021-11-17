import {React, Animated, PropTypes, View} from 'libraries';
import {Button} from 'components/molecules';
import styles from './styles';

class OnboardingContentButton extends React.PureComponent {
  static propTypes = {
    viewOpacity: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    onPressLogin: PropTypes.func,
    pointerEvents: PropTypes.string,
    onPressCreateBundle: PropTypes.func,
  };

  static defaultProps = {
    viewOpacity: 1,
    onPressLogin: () => {},
    pointerEvents: 'auto',
    onPressCreateBundle: () => {},
  };

  render() {
    const {
      viewOpacity,
      onPressLogin,
      pointerEvents,
      onPressCreateBundle,
    } = this.props;

    return (
      <Animated.View
        style={styles.container(viewOpacity)}
        pointerEvents={pointerEvents}>
        <Button
          white
          title="button.createBundle"
          style={styles.top}
          onPress={onPressCreateBundle}
        />
      </Animated.View>
    );
  }
}

export default OnboardingContentButton;
