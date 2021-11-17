/* eslint-disable react/prop-types */
import { React, TouchableOpacity, PropTypes } from 'libraries';
import { Text } from 'components/atoms';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

class Button extends React.PureComponent {
  render() {
    const {
      onPress,
      disabled,
      title,
      textStyles,
      containerStyle,
      translate,
    } = this.props;
    return (
      <LinearGradient
        colors={styles.bgColor(disabled)}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.linearGradient, containerStyle]}>
        <TouchableOpacity onPress={onPress} disabled={disabled}>
          <Text
            style={{ ...styles.buttonText, ...textStyles }}
            translate={translate}>
            {title}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

Button.defaultProps = {
  title: '',
  disabled: false,
  translate: true,
  textStyles: {},
  containerStyle: {},
  onPress: () => {},
};

Button.propType = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  translate: PropTypes.bool,
  textStyles: PropTypes.object,
  containerStyle: PropTypes.object,
};

export default Button;
