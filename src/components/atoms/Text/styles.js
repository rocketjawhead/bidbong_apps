import { Color, FONTS, scale } from 'utils';
import { DeviceInfo } from 'libraries';

const isTablet = DeviceInfo.isTablet();

const styles = {
  default: color => ({
    flex: -1,
    fontSize: FONTS.size.S,
    fontFamily: FONTS.type.bold,
    color,
  }),
  defaultTheme: {
    color: Color.EastBay100,
    fontSize: FONTS.size.S,
  },
  h1: {
    fontSize: FONTS.size.XXXL,
    fontFamily: FONTS.type.bold,
  },
  h2: {
    fontSize: FONTS.size.XXL,
    fontFamily: FONTS.type.bold,
  },
  h3: {
    fontSize: FONTS.size.XL,
    fontFamily: FONTS.type.bold,
  },
  p: {
    fontSize: FONTS.size.M,
    fontFamily: FONTS.type.regular,
  },
  lg: {
    fontSize: FONTS.size.L,
  },
  md: {
    fontSize: FONTS.size.M,
  },
  sm: {
    fontSize: FONTS.size.S,
  },
  bold: {
    fontFamily: FONTS.type.bold,
  },
  light: {
    fontFamily: FONTS.type.light,
  },
  center: {
    textAlign: 'center',
  },
  inputLg: {
    fontSize: FONTS.size.XXL,
    fontFamily: FONTS.type.regular,
  },
  inputMd: {
    fontSize: FONTS.size.XL,
    fontFamily: FONTS.type.regular,
  },
  inputSm: {
    fontSize: FONTS.size.L,
    fontFamily: FONTS.type.regular,
  },
  captionLg: {
    fontSize: FONTS.size.XS,
    fontFamily: FONTS.type.regular,
  },
  captionMd: {
    fontSize: FONTS.size.XXS,
    fontFamily: FONTS.type.regular,
  },
  captionSm: {
    fontSize: FONTS.size.XXXS,
    fontFamily: FONTS.type.regular,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  lineHeight: {
    lineHeight: scale(26),
  },
};

export default styles;
