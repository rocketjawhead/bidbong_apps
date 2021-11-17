import {Color, FONTS, METRICS} from 'utils';

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: METRICS.gutter.s,
  },
  contentLogout: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.Froly15,
    paddingHorizontal: METRICS.gutter.s,
    paddingVertical: METRICS.gutter.xxs,
    borderRadius: 15,
  },
  title: {
    fontSize: FONTS.size.L,
  },
  icon: {
    fontSize: FONTS.size.L,
    color: Color.Froly,
  },
  logout: {
    fontSize: FONTS.size.S,
    color: Color.Froly,
  },
};

export default styles;
