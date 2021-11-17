import { Color, METRICS, FONTS } from 'utils';

const styles = {
  container: {
    main: {
      backgroundColor: Color.White,
      flex: 1,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
      padding: METRICS.gutter.s,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  content: {
    main: {
      backgroundColor: Color.Shades,
      borderRadius: 10,
      flexDirection: 'row',
      padding: METRICS.gutter.xs,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: METRICS.gutter.s,
    },
  },
  img: {
    alignSelf: 'center',
    marginRight: METRICS.gutter.xxs,
  },
  button: {
    backgroundColor: Color.Selago,
    width: 65,
    // paddingHorizontal: METRICS.gutter.s,
    height: 36,
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonSquare: {
    backgroundColor: Color.Selago,
    width: 36,
    height: 36,
    justifyContent: 'center',
    borderRadius: 10,
  },
  text: {
    typeKey: {
      color: Color.EastBay100,
    },
    amountKey: {
      color: Color.EastBay100,
      marginTop: METRICS.gutter.xxs,
    },
    buy: {
      color: Color.CornflowerBlue100,
      textAlign: 'center',
    },
    toPayment: {
      color: Color.White,
    },
  },
  bgColor: disabled =>
    disabled ? ['#bdc3c7', '#8e9eab'] : ['#464CE0', '#6877F4'],
  linearGradient: {
    marginVertical: METRICS.gutter.m,
    height: METRICS.gutter.xxl,
    justifyContent: 'center',
    // flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 7,
    shadowColor: 'rgba(81, 90, 230, 0.3)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    marginBottom: METRICS.window.height * 0.07,

    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  btnCheckout: {
    position: 'absolute',
    flex: 1,
    bottom: 50,
    right: 0,
    left: 0,
    marginHorizontal: METRICS.gutter.s,
  },
  wrapperButtonText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapperTotAmount: {
    borderStartWidth: 1,
    paddingLeft: 12,
    borderStartColor: Color.White,
    flexDirection: 'row',
  },
  plus: {
    color: Color.CornflowerBlue100,
    textAlign: 'center',
    fontSize: FONTS.size.L,
  },
  count: {
    color: Color.CornflowerBlue100,
    textAlign: 'center',
    marginHorizontal: METRICS.gutter.s,
  },
};

export default styles;
