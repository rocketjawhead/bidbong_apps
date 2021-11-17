import {
  View,
  React,
  Animated,
  PropTypes,
  TextInput,
  NumberFormat,
  TouchableOpacity,
} from 'libraries';
import { FONTS, ThemeFormLabel, scale, languageHelper } from 'utils';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/AntDesign';
import Text from '../Text';
import Image from '../image';
import styles from './styles';

class Input extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isFocused: false,
    };

    this.animatedIsFocused = new Animated.Value(0);
  }

  componentDidMount() {
    this.animateLabel();
  }

  componentDidUpdate() {
    this.animateLabel();
  }

  onChangeText = value => {
    const { type, onChangeText } = this.props;
    if (type) return onChangeText(value, type);
    return onChangeText(value);
  };

  onFocus = () => {
    const { onFocus } = this.props;
    this.setState({ isFocused: true });
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

  clear = () => {
    this.TextInput.clear();
  };

  blur = () => {
    this.TextInput.blur();
  };

  _renderIcon = () => {
    const { typeIcon, rightIcon, iconRightStyle } = this.props;
    switch (typeIcon) {
      case 'Fontisto':
        return <Fontisto name={rightIcon} style={iconRightStyle} />;
      default:
        return <Icon name={rightIcon} style={iconRightStyle} />;
    }
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

  _renderNumericInput = () => {
    const {
      bold,
      editable,
      value,
      fontColor,
      autoFocus,
      inputStyle,
      isPassword,
      onValueChange,
    } = this.props;
    const { onBlur, onFocus } = this;
    return (
      <NumberFormat
        value={value}
        displayType="text"
        decimalSeparator=","
        thousandSeparator="."
        onValueChange={onValueChange}
        renderText={textValue => (
          <TextInput
            ref={c => {
              this.TextInput = c;
            }}
            {...this.props}
            blurOnSubmit
            style={[styles.form(fontColor, bold), inputStyle]}
            onBlur={onBlur}
            value={textValue}
            onFocus={onFocus}
            editable={editable}
            autoFocus={autoFocus}
            autoCorrect={false}
            keyboardType="numeric"
            autoCapitalize="none"
            onSubmitEditing={onBlur}
            secureTextEntry={isPassword}
            allowFontScaling={false}
          />
        )}
      />
    );
  };

  _renderTextInput = () => {
    const {
      bold,
      editable,
      value,
      go,
      onSubmit,
      language,
      fontColor,
      autoFocus,
      inputStyle,
      isPassword,
      placeholder,
      translatePlaceholder,
    } = this.props;
    const outputText = !translatePlaceholder
      ? placeholder
      : languageHelper.transformText(placeholder, language, '');

    const { onBlur, onFocus, onChangeText } = this;
    const onSubmitEditing = go ? onSubmit : onBlur;
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
        editable={editable}
        autoFocus={autoFocus}
        autoCorrect={false}
        onSubmitEditing={onSubmitEditing}
        placeholder={outputText}
        onChangeText={onChangeText}
        autoCapitalize="none"
        secureTextEntry={isPassword}
      />
    );
  };

  _renderIconLeft = () => {
    const { typeIcon, leftIcon, iconRightStyle } = this.props;
    switch (typeIcon) {
      case 'Fontisto':
        return <Fontisto name={leftIcon} style={iconRightStyle} />;
      default:
        return <Icon name={leftIcon} style={iconRightStyle} />;
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

  render() {
    const { isFocused } = this.state;
    const {
      label,
      notes,
      numeric,
      leftIcon,
      noBorder,
      labelStyle,
      validation,
      borderColor,
      containerStyle,
      notesTranslate,
    } = this.props;

    const {
      _renderTextInput,
      _renderNumericInput,
      _renderRightIcon,
      _renderLeftIcon,
    } = this;

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
      <View style={{ ...styles.container, ...containerStyle }}>
        <View
          style={[
            styles.input.container(borderColor, isFocused, validation),
            noBorder ? { borderBottomWidth: 0 } : {},
          ]}>
          {leftIcon ? (
            <View style={styles.input.icon}>{_renderLeftIcon()}</View>
          ) : null}
          <View style={styles.input.content}>
            {label.length > 0 ? (
              <Text
                animated
                style={{ ...styles.label, ...animatedStyle, ...labelStyle }}>
                {label}
              </Text>
            ) : null}
            {numeric ? _renderNumericInput() : _renderTextInput()}
          </View>
          {_renderRightIcon()}
        </View>
        {notes ? (
          <Text
            translate={notesTranslate}
            caption
            sm
            style={styles.notes(validation)}>
            {notes}
          </Text>
        ) : null}
      </View>
    );
  }
}

Input.propTypes = {
  go: PropTypes.bool,
  type: PropTypes.string,
  bold: PropTypes.bool,
  value: PropTypes.string,
  notes: PropTypes.string,
  label: PropTypes.string,
  isIcon: PropTypes.bool,
  onBlur: PropTypes.func,
  numeric: PropTypes.bool,
  onFocus: PropTypes.func,
  language: PropTypes.string,
  onSubmit: PropTypes.func,
  typeIcon: PropTypes.string,
  leftIcon: PropTypes.string,
  noBorder: PropTypes.bool,
  editable: PropTypes.bool,
  autoFocus: PropTypes.bool,
  rightIcon: PropTypes.string,
  fontColor: PropTypes.object,
  validation: PropTypes.bool,
  isPassword: PropTypes.bool,
  labelStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  onPressIcon: PropTypes.func,
  borderColor: PropTypes.string,
  placeholder: PropTypes.node,
  onChangeText: PropTypes.func,
  onValueChange: PropTypes.func,
  notesTranslate: PropTypes.bool,
  containerStyle: PropTypes.object,
  iconLeftStyle: PropTypes.object,
  iconRightStyle: PropTypes.object,
  translatePlaceholder: PropTypes.bool,
};

Input.defaultProps = {
  go: false,
  label: '',
  bold: false,
  isIcon: false,
  typeIcon: '',
  language: 'en',
  onSubmit: () => {},
  editable: true,
  autoFocus: false,
  onBlur: () => {},
  onFocus: () => {},
  isPassword: false,
  placeholder: '',
  onPressIcon: () => {},
  onChangeText: () => {},
  iconLeftStyle: {},
  notesTranslate: true,
  translatePlaceholder: true,
};

export default Input;
