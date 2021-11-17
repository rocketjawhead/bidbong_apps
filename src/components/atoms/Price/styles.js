import {Color, METRICS, FONTS} from 'utils';

const getBgColor = theme => {
  switch (theme) {
    case 'green':
      return Color.Riptide;
    case 'light':
      return Color.White50;
    default:
      return Color.White;
  }
};

const getFontSize = type => {
  switch (type) {
    case 'sm':
      return FONTS.size.XXS;
    case 'md':
      return FONTS.size.L;
    default:
      return FONTS.size.XL;
  }
};

const getFontColor = theme => {
  switch (theme) {
    case 'green':
      return Color.EastBay100;
    case 'light':
      return Color.White;
    default:
      return Color.Manatee100;
  }
};

const getTitleColor = theme => {
  switch (theme) {
    case 'green':
      return Color.BaliHai;
    case 'light':
      return Color.White;
    default:
      return Color.EastBay100;
  }
};

const styles = {
  title: (theme, type) => ({
    color: getTitleColor(theme),
  }),
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: (theme, type) => ({
    flex: -1,
    color: getFontColor(theme),
    fontSize: getFontSize(type),
    overflow: 'hidden',
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: getBgColor(theme),
    paddingVertical: 2,
    paddingHorizontal: 8,
  }),
};

export default styles;
