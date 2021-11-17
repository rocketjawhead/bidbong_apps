import {METRICS, scale, Color} from 'utils';

const styles = {
  container: {
    width: METRICS.screen.width,
  },
  content: {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Color.White,
    },
  },
  backgroundImage: {
    width: METRICS.screen.width,
    height: METRICS.screen.width,
    // height: METRICS.screen.height * 0.5,
  },
};

export default styles;
