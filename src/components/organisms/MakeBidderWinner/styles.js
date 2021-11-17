import {METRICS, Color, FONTS} from 'utils';

const styles = {
  background: {
    flex: 1,
    backgroundColor: Color.Black50,
  },
  price: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    main: {
      flex: -1,
      left: 0,
      right: 0,
      bottom: 0,
      padding: 10,
      position: 'absolute',
      backgroundColor: Color.White,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: METRICS.gutter.s,
    },
  },
  content: {
    main: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    price: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 15,
    },
  },
  text: {
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
    makeWinner: {
      textAlign: 'center',
      color: Color.Manatee100,
      marginBottom: METRICS.gutter.s,
    },
    winner: {
      textAlign: 'center',
      marginBottom: METRICS.gutter.s,
    },
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
  button: {
    plusMinus: {
      backgroundColor: Color.Selago,
      padding: METRICS.gutter.s,
      borderRadius: 10,
      marginBottom: METRICS.gutter.xs,
    },
  },
};

export default styles;
