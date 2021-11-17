import { Color, METRICS, FONTS } from 'utils';

const styles = {
  continer: read => ({
    backgroundColor: read ? Color.Manatee25 : Color.White,
    flex: -1,
    borderRadius: 12,
    padding: METRICS.gutter.s,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
    marginBottom: METRICS.gutter.s,
  }),
  title: {
    fontSize: FONTS.size.L,
    marginBottom: METRICS.gutter.xs,
  },
  body: {
    marginBottom: METRICS.gutter.m,
  },
  time: {
    color: Color.Manatee75,
  },
};

export default styles;
