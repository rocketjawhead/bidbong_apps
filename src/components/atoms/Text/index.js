import {
  React,
  Text as RNText,
  PropTypes,
  StyleSheet,
  Animated,
} from 'libraries';
import { languageHelper } from 'utils';
import styles from './styles';

const Text = ({
  p,
  h1,
  h2,
  h3,
  lg,
  md,
  sm,
  bold,
  style,
  input,
  color,
  light,
  params,
  center,
  caption,
  children,
  animated,
  language,
  translate,
  underline,
  lineHeight,
  ...props
}) => {
  const basicStyle = StyleSheet.flatten([
    p && styles.p,
    h1 && styles.h1,
    h2 && styles.h2,
    h3 && styles.h3,
    lg && styles.lg,
    md && styles.md,
    sm && styles.sm,
    input && lg && styles.inputLg,
    input && md && styles.inputMd,
    input && sm && styles.inputSm,
    caption && lg && styles.captionLg,
    caption && md && styles.captionMd,
    caption && sm && styles.captionSm,
    bold && styles.bold,
    light && styles.light,
    center && styles.center,
    underline && styles.underline,
    lineHeight && styles.lineHeight,
  ]);

  const outputText = !translate
    ? children
    : languageHelper.transformText(children, language, params);

  const defaultTheme = color ? null : styles.defaultTheme;

  if (animated) {
    return (
      <Animated.Text
        allowFontScaling={false}
        style={[defaultTheme, basicStyle, style]}>
        {outputText}
      </Animated.Text>
    );
  }
  return (
    <RNText
      allowFontScaling={false}
      style={[defaultTheme, basicStyle, style]}
      {...props}>
      {outputText}
    </RNText>
  );
};

Text.propTypes = {
  p: PropTypes.bool,
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  lg: PropTypes.bool,
  md: PropTypes.bool,
  sm: PropTypes.bool,
  bold: PropTypes.bool,
  input: PropTypes.bool,
  light: PropTypes.bool,
  style: PropTypes.object,
  color: PropTypes.string,
  center: PropTypes.bool,
  params: PropTypes.object,
  caption: PropTypes.bool,
  children: PropTypes.node,
  animated: PropTypes.bool,
  language: PropTypes.string,
  translate: PropTypes.bool,
  underline: PropTypes.bool,
  lineHeight: PropTypes.bool,
};

Text.defaultProps = {
  p: false,
  h1: false,
  h2: false,
  h3: false,
  lg: false,
  md: false,
  sm: false,
  bold: false,
  style: {},
  light: false,
  color: '',
  params: {},
  center: false,
  caption: false,
  language: 'en',
  animated: false,
  children: '',
  translate: true,
  underline: false,
  lineHeight: false,
};

export default React.memo(Text);
