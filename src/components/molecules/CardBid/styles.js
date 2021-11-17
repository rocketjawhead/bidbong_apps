import {Color, METRICS, FONTS} from 'utils';

const getBgColor = p => {
  switch (p) {
    case 'waiting':
      return Color.GoldenTainoi;
    case 'live':
      return Color.Malibu;
    default:
      return Color.Canary;
  }
};

const styles = {
  container: {
    main: {
      backgroundColor: Color.White,
      marginHorizontal: METRICS.gutter.s,
      marginBottom: METRICS.gutter.s,
      padding: METRICS.gutter.xs,
      borderRadius: 10,
      flexDirection: 'row',
    },
    image: {
      padding: 2,
      borderRadius: 10,
      backgroundColor: Color.BaliHai,
      alignItems: 'center',
      justifyContent: 'center',
      flex: -1,
      width: 63,
      height: 63,
    },
    detail: {
      flex: 1,
      marginHorizontal: METRICS.gutter.xs,
      width: METRICS.screen.width * 0.6,
    },
  },
  content: {
    status: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginBottom: METRICS.gutter.xxs,
    },
  },
  wrapperTime: {
    marginBottom: METRICS.gutter.xs,
  },
  text: {
    key: {
      color: Color.Manatee100,
      fontSize: FONTS.size.s,
    },
    price: {
      color: Color.CornflowerBlue100,
    },
    product: {
      marginVertical: METRICS.gutter.xxs,
    },
    status: p => ({
      backgroundColor: getBgColor(p),
      textAlignVertical: 'center',
      padding: 5,
      borderRadius: 5,
      overflow: 'hidden',
    }),
  },
  buttonMore: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    flex: 1,
  },
};

export default styles;
