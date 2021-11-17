import {METRICS, Color, FONTS} from 'utils';

const styles = {
  imgWidth: METRICS.screen.width,
  bgImage: {
    alignSelf: 'center',
  },
  imgProfle: {
    marginBottom: METRICS.gutter.m,
  },
  price: {
    alignSelf: 'center',
    marginBottom: METRICS.gutter.m,
    alignItems: 'center',
  },
  container: {
    main: {
      padding: METRICS.gutter.s,
      backgroundColor: Color.White,
      flex: 1,
    },
    button: {
      position: 'absolute',
      bottom: 10,
      left: 0,
      right: 0,
      marginHorizontal: METRICS.gutter.s,
    },
  },
  content: {
    main: {
      top: 0,
      flex: 1,
      left: 0,
      right: 0,
      bottom: 0,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  wrapper: {
    winner: {
      marginBottom: METRICS.gutter.xl,
    },
  },
  text: {
    title: {
      textAlign: 'center',
      color: Color.BaliHai,
      fontSize: FONTS.size.M,
      marginBottom: METRICS.gutter.l,
    },
    congratulation: {
      color: Color.White,
      marginBottom: METRICS.gutter.s,
    },
    won: {
      color: Color.White,
      fontSize: FONTS.size.M,
      marginBottom: METRICS.gutter.s,
    },
    product: {
      color: Color.White,
      fontSize: FONTS.size.S,
    },
    titlePrice: {
      marginBottom: METRICS.gutter.s,
      fontWeight: 'bold',
    },
    footer: {
      textAlign: 'center',
    },
  },
  button: {
    marginBottom: METRICS.gutter.s,
  },
};

export default styles;
