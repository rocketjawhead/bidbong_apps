import {Theme, FONTS, scale, METRICS, Color} from 'utils';

export const setBorderColor = (borderColor, isFocused, errColor) => {
  if (errColor === true) return Color.Froly;
  if (isFocused) {
    if (borderColor) return borderColor;
    return Color.CornflowerBlue100;
  }
  if (borderColor) return borderColor;
  return Color.Manatee50;
};

const styles = {
  container: {
    flex: -1,
  },
  input: {
    container: (borderColor, isFocused, errColor) => ({
      flex: -1,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: setBorderColor(borderColor, isFocused, errColor),
    }),
    content: {
      flex: 1,
    },
    icon: {
      flex: -1,
    },
  },
  label: {
    left: 0,
    position: 'absolute',
    fontFamily: FONTS.type.regular,
  },
  form: (fontColor, bold) => ({
    flex: -1,
    padding: 0,
    fontSize: FONTS.size.M,
    color: fontColor || Color.EastBay100,
    fontFamily: bold ? FONTS.type.bold : FONTS.type.regular,
  }),
  icon: {
    flex: -1,
    width: scale(25),
    height: scale(25),
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    color: Color.EastBay100,
  },
  notes: validation => ({
    color: validation === false ? Color.Froly : Color.Manatee75,
    marginTop: METRICS.gutter.xs,
  }),
  errorString: {
    color: Color.Froly,
    marginTop: METRICS.gutter.xs,
  },
  iconLeft: {
    flex: -1,
    fontSize: FONTS.size.M,
    alignItems: 'center',
    justifyContent: 'center',
    color: Color.EastBay100,
  },
};

export default styles;
