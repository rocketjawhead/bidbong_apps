import {METRICS, Color, FONTS} from 'utils';

const styles = {
  bgColor: disabled =>
    disabled ? ['#bdc3c7', '#8e9eab'] : ['#464CE0', '#6877F4'],
  linearGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    borderRadius: 5,
    shadowColor: 'rgba(81, 90, 230, 0.3)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    height: 50,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    key: {
      backgroundColor: Color.White25,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // width: 75,
      borderTopRightRadius: 24,
      borderBottomRightRadius: 24,
      paddingRight: 4,
      paddingLeft: METRICS.gutter.xs,
      height: 50,
      width: 100,
    },
  },
  buttonText: {
    fontSize: 18,
    margin: 10,
    color: Color.White,
    backgroundColor: 'transparent',
    // marginLeft: METRICS.gutter.s
  },
  buttonTextBuy: {
    fontSize: FONTS.size.M,
    color: Color.White,
    textAlign: 'center',
    marginLeft: METRICS.gutter.xl,
  },
  image: {
    alignSelf: 'center',
  },
};

export default styles;
