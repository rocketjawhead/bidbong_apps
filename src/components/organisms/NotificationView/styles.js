import { METRICS, Color } from 'utils';

const styles = {
  bg: {
    flex: 1,
    backgroundColor: Color.WhiteLilac,
  },
  container: {
    main: {
      margin: METRICS.gutter.s,
      marginTop: METRICS.gutter.l,
      backgroundColor: Color.WhiteLilac,
    },
    empty: {
      jusifyContent: 'center',
      alignItems: 'center',
      marginTop: 100,
    },
  },
  title: {
    marginTop: METRICS.gutter.s,
  },
  content: {
    marginTop: METRICS.gutter.s,
    // flex: 1,
  },
};

export default styles;
