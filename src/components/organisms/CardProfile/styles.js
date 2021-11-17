import { Color, METRICS, FONTS } from 'utils';

const styles = {
  container: {
    main: {
      top: 0,
      left: 0,
      flex: 1,
      right: 0,
      bottom: 0,
      padding: METRICS.gutter.s,
      position: 'absolute',
      marginTop: METRICS.gutter.m,
      backgroundColor: Color.White,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
  },
  card: {
    flex: 1,
    backgroundColor: Color.PinkLady,
  },
  img: {
    paddingVertical: METRICS.gutter.s,
    justifyContent: 'center',
  },
  text: {
    totalWin: {
      textAlign: 'center',
      fontSize: FONTS.size.M,
    },
    amount: {
      textAlign: 'center',
      fontSize: FONTS.size.L,
    },
    title: {
      fontSize: FONTS.size.M,
      textAlign: 'center',
    },
    logout: {
      fontSize: FONTS.size.M,
      color: '#F46881',
    },
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: METRICS.gutter.m,
  },
  icon: {
    fontSize: FONTS.size.XL,
    textAlign: 'center',
  },
};

export default styles;
