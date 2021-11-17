import {METRICS, FONTS, Color} from 'utils';

const styles = {
  container: {
    padding: METRICS.gutter.s,
  },

  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: METRICS.gutter.s,
    borderBottomWidth: 1,
    borderBottomColor: Color.Manatee50,
    marginBottom: METRICS.gutter.s,
  },
  icon: {
    fontSize: FONTS.size.L,
  },
  title: {
    fontSize: FONTS.size.S,
  },
  product: {
    fontSize: FONTS.size.M,
    marginBottom: METRICS.gutter.s,
  },
  desc: {},
};

export default styles;
