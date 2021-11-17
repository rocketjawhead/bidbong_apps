import {METRICS, Color, FONTS} from 'utils';

const styles = {
  background: {
    flex: 1,
    backgroundColor: Color.Manatee50,
    padding: METRICS.gutter.s,
  },
  price: {
    marginTop: METRICS.gutter.xs,
  },
  container: {
    main: {
      flex: -1,
      left: 0,
      right: 0,
      bottom: 0,
      padding: METRICS.gutter.s,
      position: 'absolute',
      backgroundColor: Color.White,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    button: {
      marginTop: 70,
    },
  },
  content: {
    main: {
      flexDirection: 'row',
      marginTop: METRICS.gutter.s,
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: METRICS.gutter.m,
    },
    price: {
      borderColor: Color.BaliHai,
      borderWidth: 0.5,
      borderRadius: 7,
      flex: 1,
      height: 40,
      justifyContent: 'center',
      paddingHorizontal: METRICS.gutter.s,
    },
    currentBid: {
      marginRight: METRICS.gutter.m,
    },
  },
  text: {
    title: {
      marginBottom: METRICS.gutter.s,
    },
    header: {
      marginLeft: METRICS.gutter.xs,
      fontSize: FONTS.size.M,
      textAlign: 'center',
    },
    plusMinus: {
      textAlign: 'center',
      color: Color.BaliHai,
      fontSize: FONTS.size.M,
    },
    totalAmount: {
      textAlign: 'center',
    },
    price: {
      fontSize: FONTS.size.M,
    },
    addPrice: isActive => ({
      color: isActive ? Color.White : Color.CornflowerBlue100,
    }),
  },
  icon: {
    close: {
      fontSize: FONTS.size.L,
    },
    plusMinus: {
      fontSize: FONTS.size.L,
      color: Color.CornflowerBlue100,
    },
  },
  button: isActive => ({
    backgroundColor: isActive ? Color.CornflowerBlue100 : Color.Selago,
    height: 35,
    width: 75,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  euro: {
    fontSize: FONTS.size.M,
    textAlign: 'center',
  },
};

export default styles;
