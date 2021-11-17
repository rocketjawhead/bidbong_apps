import { METRICS, FONTS, Color } from 'utils';

const styles = {
  container: {
    main: {
      position: 'absolute',
      left: METRICS.gutter.m,
      right: METRICS.window.width * 0.08,
    },
    key: {
      flexDirection: 'row',
      marginTop: METRICS.gutter.s,
    },
  },
  content: {
    welcome: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flex: 1,
      marginTop: METRICS.gutter.xl,
    },
    key: {
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: -12,
    },
  },
  textHeader: {
    color: 'white',
    fontSize: FONTS.size.L,
  },
  icon: {
    key: {},
  },
  image: {
    alignSelf: 'center',
    marginLeft: -16,
  },
  text: {
    typeKey: {
      marginTop: -20,
      color: Color.White,
      textAlign: 'center',
      fontSize: FONTS.size.s,
    },
    totalKey: {
      color: Color.White50,
      textAlign: 'center',
      fontSize: FONTS.size.s,
    },
  },
};

export default styles;
