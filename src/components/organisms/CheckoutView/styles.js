import {METRICS, Color, FONTS} from 'utils';

const styles = {
  container: {
    main: {
      flex: 1,
    },
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: METRICS.gutter.s,
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
    headerShipping: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: METRICS.gutter.m,
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
      fontSize: FONTS.size.L,
    },
    productName: {
      width: 200,
      marginBottom: METRICS.gutter.xxs,
    },
  },
  input: {
    container: {
      marginTop: METRICS.gutter.s,
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
  btnSelectCountry: {
    borderBottomWidth: 1,
    borderColor: Color.Manatee50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: METRICS.gutter.s,
    paddingBottom: 3,
  },
  placeholder: {
    color: Color.Manatee100,
    fontSize: FONTS.size.M,
  },
  iconDown: {
    fontSize: FONTS.size.L,
  },
  wrapperDetailProduct: {},
  wrapperIcon: {
    borderWidth: 2,
    borderColor: Color.Manatee25,
    borderRadius: 10,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: METRICS.gutter.s,
  },
  iconShipping: {
    tintColor: Color.EastBay75,
    height: 45,
    width: 45,
    alignSelf: 'center',
  },
};
export default styles;
