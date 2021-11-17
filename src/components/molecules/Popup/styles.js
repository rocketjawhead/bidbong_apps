import { Platform } from 'libraries';
import { Color, FONTS, func, METRICS } from 'utils';

const statusBarHight = Platform.select({
  ios: func.checkIphoneX() ? 20 : 10,
  android: 0,
  default: 0,
});

const styles = {
  background: {
    flex: 1,
    backgroundColor: Color.Manatee50,
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
  desc: {
    marginVertical: METRICS.gutter.m,
    fontSize: FONTS.size.S,
    textAlign: 'center',
  },
  containerButton: {
    height: 75,
    marginBottom: statusBarHight,
  },
};

export default styles;
