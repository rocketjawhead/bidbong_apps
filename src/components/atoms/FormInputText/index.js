import {
  View,
  React,
  Animated,
  PropTypes,
  TextInput,
  TouchableOpacity,
} from 'libraries';
import { connect } from 'react-redux';
import { FONTS, ThemeFormLabel, scale, languageHelper } from 'utils';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Text from '../Text';
import Image from '../image';
import styles from './styles';

class FormInputText extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isFocused: false,
      isTouched: false,
    };

    this.animatedIsFocused = new Animated.Value(0);
  }

  componentDidMount() {
    const { label } = this.props;

    if (label) this.animateLabel();
  }

  componentDidUpdate() {
    const { label } = this.props;

    if (label) this.animateLabel();
  }

  onChangeText = value => {
    const { type, onChangeText } = this.props;

    this.setState({ isTouched: true }, () => {
      if (type) return onChangeText(value, type);
      return onChangeText(value);
    });
  };

  onFocus = () => {
    const { onFocus } = this.props;
    this.setState({ isFocused: true, isTouched: true });
    onFocus();
  };

  onBlur = () => {
    const { onBlur } = this.props;
    this.setState({ isFocused: false });
    onBlur();
  };

  handleLabelState = () => {
    const { isFocused } = this.state;
    const { value } = this.props;
    if (value || isFocused) {
      return 1;
    }
    return 0;
  };

  animateLabel = () => {
    Animated.timing(this.animatedIsFocused, {
      toValue: this.handleLabelState(),
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  focus = () => {
    this.TextInput.focus();
  };

  blur = () => {
    this.TextInput.blur();
  };

  _renderIcon = () => {
    const { typeIcon, rightIcon, iconRightStyle } = this.props;
    switch (typeIcon) {
      case 'Feather':
        return <Feather name={rightIcon} style={iconRightStyle} />;
      case 'Fontisto':
        return <Fontisto name={rightIcon} style={iconRightStyle} />;
      default:
        return <Icon name={rightIcon} style={iconRightStyle} />;
    }
  };

  _renderIconLeft = () => {
    const { typeIcon, leftIcon, iconLeftStyle } = this.props;

    switch (typeIcon) {
      case 'Feather':
        return <Feather name={leftIcon} style={styles.iconLeft} />;
      case 'Fontisto':
        return <Fontisto name={leftIcon} style={styles.iconLeft} />;
      default:
        return <Icon name={leftIcon} style={styles.iconLeft} />;
    }
  };

  _renderLeftIcon = () => {
    const { leftIcon, onPressIcon, iconLeftStyle, isIcon } = this.props;
    const { _renderIconLeft } = this;
    if (leftIcon) {
      if (isIcon) {
        return (
          <TouchableOpacity onPress={onPressIcon} style={styles.icon}>
            {_renderIconLeft()}
          </TouchableOpacity>
        );
      }
      return (
        <TouchableOpacity onPress={onPressIcon} style={styles.icon}>
          <Image
            contentIcon
            source={leftIcon}
            style={{ ...styles.icon, ...iconLeftStyle }}
          />
        </TouchableOpacity>
      );
    }
    return null;
  };

  _renderLabel = () => {
    const { label, labelStyle } = this.props;

    if (label) {
      const animatedStyle = {
        bottom: this.animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [5, scale(32)],
        }),
        fontSize: this.animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [FONTS.size.M, FONTS.size.XXS],
        }),
        color: this.animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [ThemeFormLabel.default, ThemeFormLabel.active],
        }),
      };

      return (
        <Text
          animated
          style={{ ...styles.label, ...animatedStyle, ...labelStyle }}>
          {label}
        </Text>
      );
    }
    return null;
  };

  _renderTextInput = () => {
    const {
      bold,
      value,
      params,
      language,
      fontColor,
      autoFocus,
      inputStyle,
      isPassword,
      placeholder,
      translatePlaceholder,
    } = this.props;
    const { onBlur, onFocus, onChangeText } = this;

    const outputText = !translatePlaceholder
      ? placeholder
      : languageHelper.transformText(placeholder, language, '');

    return (
      <TextInput
        ref={c => {
          this.TextInput = c;
        }}
        {...this.props}
        blurOnSubmit
        style={[styles.form(fontColor, bold), inputStyle]}
        value={value}
        onBlur={onBlur}
        onFocus={onFocus}
        autoFocus={autoFocus}
        placeholder={outputText}
        onChangeText={onChangeText}
        onSubmitEditing={onBlur}
        secureTextEntry={isPassword}
      />
    );
  };

  _renderRightIcon = () => {
    const { rightIcon, onPressIcon, iconRightStyle, isIcon } = this.props;
    const { _renderIcon } = this;
    if (rightIcon) {
      if (isIcon) {
        return (
          <TouchableOpacity onPress={onPressIcon} style={styles.icon}>
            {_renderIcon()}
          </TouchableOpacity>
        );
      }
      return (
        <TouchableOpacity onPress={onPressIcon} style={styles.icon}>
          <Image
            contentIcon
            source={rightIcon}
            style={{ ...styles.icon, ...iconRightStyle }}
          />
        </TouchableOpacity>
      );
    }
    return null;
  };

  _renderNotes = () => {
    const { validate, forceValidation } = this.props;
    const { isTouched } = this.state;

    const errorList = validate && validate().error;
    if (forceValidation) {
      return errorList.map((e, i) => (
        <Text sm caption style={styles.errorString} key={i}>
          {e}
        </Text>
      ));
    }

    if (isTouched && errorList && errorList.length) {
      return errorList.map((e, i) => (
        <Text sm caption style={styles.errorString} key={i}>
          {e}
        </Text>
      ));
    }

    return null;
  };

  render() {
    const { isFocused } = this.state;
    const { validate, borderColor, containerStyle } = this.props;
    const {
      _renderNotes,
      _renderLabel,
      _renderLeftIcon,
      _renderTextInput,
      _renderRightIcon,
    } = this;

    const errorList = validate && validate().error;
    const errColor = !(errorList && errorList.length <= 1);

    return (
      <View style={{ ...styles.container, ...containerStyle }}>
        <View style={styles.input.container(borderColor, isFocused, errColor)}>
          {_renderLeftIcon()}
          <View style={styles.input.content}>
            {_renderLabel()}
            {_renderTextInput()}
          </View>
          {_renderRightIcon()}
        </View>
        {_renderNotes()}
      </View>
    );
  }
}

FormInputText.propTypes = {
  type: PropTypes.string,
  bold: PropTypes.bool,
  value: PropTypes.string,
  notes: PropTypes.string,
  label: PropTypes.string,
  isIcon: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  typeIcon: PropTypes.string,
  leftIcon: PropTypes.string,
  notesBold: PropTypes.bool,
  autoFocus: PropTypes.bool,
  language: PropTypes.string,
  rightIcon: PropTypes.string,
  fontColor: PropTypes.object,
  validation: PropTypes.bool,
  isPassword: PropTypes.bool,
  labelStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  onPressIcon: PropTypes.func,
  borderColor: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  iconLeftStyle: PropTypes.object,
  onValueChange: PropTypes.func,
  notesTranslate: PropTypes.bool,
  containerStyle: PropTypes.object,
  iconRightStyle: PropTypes.object,
  notesAlwaysShow: PropTypes.bool,
  validate: PropTypes.func,
  forceValidation: PropTypes.bool,
  translatePlaceholder: PropTypes.bool,
};

FormInputText.defaultProps = {
  bold: false,
  isIcon: false,
  typeIcon: '',
  autoFocus: false,
  notesBold: false,
  isPassword: false,
  validation: false,
  placeholder: '',
  iconLeftStyle: {},
  notesTranslate: true,
  notesAlwaysShow: false,
  onBlur: () => {},
  onFocus: () => {},
  onPressIcon: () => {},
  onChangeText: () => {},
  translatePlaceholder: true,
};

const reduxState = state => ({
  language: 'en',
});

export default connect(reduxState, null)(React.memo(FormInputText));
