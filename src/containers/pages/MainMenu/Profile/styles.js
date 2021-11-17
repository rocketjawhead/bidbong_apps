import {METRICS, Color} from 'utils';

const styles = {
  bg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  container: {
    main: {
      marginHorizontal: METRICS.gutter.s,
      position: 'absolute',
      flex: 1,
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
    },
    header: {
      marginTop: METRICS.gutter.m,
    },
  },
};

export default styles;
