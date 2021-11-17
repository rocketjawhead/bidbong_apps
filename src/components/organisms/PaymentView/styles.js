import { Color, FONTS, METRICS } from 'utils';

const styles = {
  background: {
    backgroundColor: Color.White,
    flex: 1,
  },
  container: {
    main: {
      marginTop: METRICS.gutter.xxl,
      margin: METRICS.gutter.s,
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
    visa: {
      padding: METRICS.gutter.s,
      alignItems: 'center',
      borderRadius: 10,
      flexDirection: 'row',
      borderColor: Color.Manatee50,
      marginBottom: METRICS.gutter.xs,
      borderWidth: 1,
    },
    imgBank: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: METRICS.gutter.s,
      marginTop: METRICS.gutter.xs,
    },
  },
  text: {
    title: {
      marginBottom: METRICS.gutter.m,
      marginTop: METRICS.gutter.s,
    },
    typePayment: {},
  },
  icon: {
    circle: {
      fontSize: FONTS.size.XL,
      marginRight: METRICS.gutter.s,
      color: Color.Manatee75,
    },
    circleActive: {
      fontSize: FONTS.size.XL,
      marginRight: METRICS.gutter.s,
      color: Color.CornflowerBlue100,
    },
  },
};

export default styles;
