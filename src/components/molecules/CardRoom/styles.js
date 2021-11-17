import {METRICS, Color, FONTS} from 'utils';

const styles = {
  wrapper: {
    width: METRICS.screen.width * 0.6,
    height: METRICS.screen.height * 0.4,
  },
  bgImage: {
    width: METRICS.screen.width * 0.6,
    height: METRICS.screen.height * 0.4,
    justifyContent: 'space-between',
    padding: METRICS.gutter.s,
    resizeMode: 'stretch',
    alignSelf: 'flex-start',
  },
  bgEmpty: {
    width: METRICS.screen.width * 0.6,
    height: METRICS.screen.height * 0.4,
    padding: METRICS.gutter.s,
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blur: {
    backgroundColor: Color.Black50,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  containerDisabled: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    padding: METRICS.gutter.s,
  },
  container: {
    main: {},
    countdown: {
      backgroundColor: Color.White,
      height: 30,
      alignSelf: 'center',
      paddingHorizontal: METRICS.gutter.m,
      borderRadius: 15,
      justifyContent: 'center',
    },
    key: {
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
      alignSelf: 'center',
      backgroundColor: Color.White25,
    },
    imageProduct: {
      backgroundColor: Color.White50,
      borderRadius: 5,
      marginRight: METRICS.gutter.s,
    },
  },
  content: {
    amount: {
      backgroundColor: Color.White50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: METRICS.gutter.xs,
    },
  },
  text: {
    empty: {
      color: Color.White,
      textAlign: 'center',
      marginTop: METRICS.gutter.s,
    },
    typeDoor: {
      alignSelf: 'center',
      color: Color.White,
    },
    startBid: {
      color: Color.White,
      marginBottom: METRICS.gutter.xs,
      fontSize: FONTS.size.XXS,
    },
    amount: {
      color: Color.White,
      textAlign: 'center',
      fontSize: FONTS.size.M,
    },
    desc: {
      fontSize: FONTS.size.M,
      marginTop: METRICS.gutter.s,
      color: Color.White,
    },
    bidder: {
      fontSize: FONTS.size.S,
      marginTop: METRICS.gutter.xs,
      color: Color.White,
    },
    roomongame: {
      color: Color.White,
      textAlign: 'center',
      marginTop: METRICS.gutter.xs,
    },
    lockRoom: {
      color: Color.White,
      textAlign: 'center',
    },
  },
  image: {
    key: {
      margin: 3,
    },
    product: {
      width: 80,
      height: 80,
      borderRadius: 5,
    },
  },
};

export default styles;
