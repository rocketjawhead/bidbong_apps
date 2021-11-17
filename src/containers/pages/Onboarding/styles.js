import {METRICS, scale, Theme, Color} from 'utils';

const styles = {
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
  overlay: {
    container: {
      flex: 1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: METRICS.screen.width,
      position: 'absolute',
    },
  },
  loading: {
    container: {
      flex: 1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: Theme.grey('25'),
    },
    image: {
      width: scale(75),
      height: scale(75),
    },
  },
};

export default styles;
