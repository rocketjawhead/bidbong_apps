import {METRICS, Color, FONTS} from 'utils';

const styles = {
  container: {
    main: {
      flex: 1,
    },
  },
  inner: {
    flex: 1,
    margin: METRICS.gutter.s,
  },
  scroll: {
    margin: METRICS.gutter.s,
  },
  content: {
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  card: {
    padding: METRICS.gutter.s,
    borderRadius: 10,
    backgroundColor: Color.White,
    marginTop: METRICS.gutter.s,
  },
  square: {
    backgroundColor: Color.Shades,
    flex: -1,
    padding: 10,
    borderRadius: 10,
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: METRICS.gutter.s,
  },
  button: {
    iconBack: {
      marginTop: METRICS.gutter.l,
      marginLeft: METRICS.gutter.s,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    selectPayment: {
      marginTop: METRICS.gutter.s,
      borderRadius: 7,
      borderWidth: 1,
      borderColor: Color.Manatee50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 50,
      alignItems: 'center',
      paddingHorizontal: METRICS.gutter.s,
    },
  },
  title: {
    marginTop: METRICS.gutter.s,
  },
  text: {
    number: {
      fontSize: FONTS.size.M,
    },
    subtitle: {
      fontSize: FONTS.size.M,
    },
    key: {
      fontSize: FONTS.size.M,
    },
  },
  input: {
    container: {
      marginTop: METRICS.gutter.xxl,
    },
    label: {
      color: Color.Manatee100,
    },
  },
  icon: {
    next: {
      fontSize: FONTS.size.M,
    },
  },
  containerProductItem: {
    flexDirection: 'row',
    marginBottom: METRICS.gutter.s,
  },
  contentProduct: {
    marginTop: METRICS.gutter.s,
  },
  wrapperItem: {
    justifyContent: 'space-between',
    marginLeft: METRICS.gutter.xs,
    paddingBottom: METRICS.gutter.xs,
  },
  wrapperPrice: {
    flexDirection: 'row',
  },
  wrapperTotalCost: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginTop: METRICS.gutter.l,
  },
  price: {
    color: Color.DeYork,
    fontSize: FONTS.size.M,
    marginLeft: METRICS.gutter.s,
  },
  textPrice: {
    marginRight: METRICS.gutter.s,
  },
};
export default styles;
