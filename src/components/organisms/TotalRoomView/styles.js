import {METRICS, Color} from 'utils';

const styles = {
  background: {
    backgroundColor: Color.WhiteLilac,
    flex: 1,
  },
  container: {
    padding: METRICS.gutter.s,
  },
  card: {
    backgroundColor: Color.White,
    padding: 10,
    borderRadius: 10,
    marginTop: METRICS.gutter.s,
  },
  text: {
    title: {
      marginTop: METRICS.gutter.xs,
    },
    subTitle: {
      color: Color.CornflowerBlue100,
      marginBottom: METRICS.gutter.s,
    },
    bidder: {
      marginBottom: METRICS.gutter.s,
    },
  },
};

export default styles;
