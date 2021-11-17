import {FONTS, scale, METRICS, Color} from 'utils';

export const setBorderColor = (borderColor, isFocused, validation) => {
  if (isFocused) {
    if (borderColor) {
      return {
        borderBottomColor: borderColor,
      };
    }
    return {
      borderBottomColor: Color.CornflowerBlue50,
    };
  }
  if (validation === false) {
    return {
      borderBottomColor: Color.Froly,
    };
  }
  if (borderColor) {
    return {
      borderBottomColor: borderColor,
    };
  }
  return {
    borderBottomColor: Color.Manatee50,
  };
};

const styles = {
  container: {
    flex: -1,
  },
  input: {
    container: (borderColor, isFocused, validation) => ({
      flex: -1,
      alignItems: 'center',
      flexDirection: 'row',
      borderBottomWidth: 1,
      ...setBorderColor(borderColor, isFocused, validation),
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
    color: Color.EastBay100,
  },
  form: (fontColor, bold) => ({
    flex: -1,
    color: fontColor || Color.EastBay100,
    padding: 0,
    fontSize: FONTS.size.M,
    fontFamily: bold ? FONTS.type.bold : FONTS.type.regular,
  }),
  icon: {
    flex: -1,
    width: scale(25),
    height: scale(25),
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notes: validation => ({
    color: validation === false ? Color.Froly : Color.Manatee50,
    marginTop: METRICS.gutter.xs,
  }),
};

export default styles;
