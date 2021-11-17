import {METRICS, Theme, Color} from 'utils';

const styles = {
  container: {
    flexDirection: 'row',
    marginTop: METRICS.gutter.m,
    alignItems: 'center',
  },
  active: indicatorPosition => ({
    width: 10,
    height: 10,
    borderRadius: 10,
    position: 'absolute',
    left: indicatorPosition,
    backgroundColor: Color.EastBay100,
  }),
  inactive: {
    width: 10,
    height: 10,
    opacity: 0.5,
    marginRight: 5,
    borderRadius: 10,
    backgroundColor: Color.EastBay50,
  },
};

export default styles;
