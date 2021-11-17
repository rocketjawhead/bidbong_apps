import {METRICS, Color, FONTS} from 'utils';

const styles = {
  bg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  background: {
    height: '100%',
    width: '100%',
  },
  container: {
    main: {
      marginHorizontal: METRICS.gutter.s,
      marginTop: METRICS.gutter.s,
      flex: 1,
    },
    key: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      flex: 1,
      marginTop: METRICS.gutter.m,
    },
  },
  text: {
    titlePage: {
      color: Color.White,
      fontSize: FONTS.size.XXL,
    },
  },
};

export default styles;
