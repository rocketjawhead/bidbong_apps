import { Color, METRICS, FONTS } from 'utils';

const styles = {
  container: {
    main: {
      flex: 1,
      backgroundColor: Color.White,
    },
    card: {
      flex: 1,
      top: -20,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
      backgroundColor: Color.White,
      padding: METRICS.gutter.s,
    },
    listImage: {
      justifyContent: 'space-between',
    },
  },
  content: {
    image: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: METRICS.gutter.xs,
    },
  },
  wrapperImage: isActive => ({
    backgroundColor: isActive ? Color.Froly : Color.Manatee50,
    borderRadius: 10,
    margin: isActive ? 3 : 5,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  wrapperImageBig: {
    backgroundColor: Color.Manatee50,
    borderRadius: 10,
  },
  image: {
    big: {
      width: METRICS.screen.width * 0.7,
      height: METRICS.screen.width * 0.7,
      borderRadius: 10,
      margin: 2.5,
    },
    small: {
      width: 57,
      height: 55,
      borderRadius: 5,
    },
  },
  text: {
    itemOnSale: {
      color: Color.BaliHai,
    },
    product: {
      fontSize: FONTS.size.M,
    },
    price: {
      marginTop: METRICS.gutter.xs,
      marginBottom: METRICS.gutter.xxs,
    },
    leave: {
      color: Color.Froly,
    },
  },
  button: {
    cta: {
      marginTop: METRICS.gutter.s,
      borderWidth: 1,
      borderColor: Color.Manatee50,
      borderRadius: 7,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: METRICS.gutter.s,
    },
    reservation: {
      marginTop: 70,
    },
    leave: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // backgroundColor: Color.White
      borderColor: Color.Manatee50,
      borderWidth: 1,
      marginTop: METRICS.gutter.s,
      marginBottom: -METRICS.gutter.s,
      padding: METRICS.gutter.xs,
      alignItems: 'center',
      borderRadius: 10,
    },
  },
  icon: {
    next: {
      fontSize: FONTS.size.M,
    },
    out: {
      color: Color.Froly,
      fontSize: FONTS.size.L,
    },
  },
  banner: {
    flexDirection: 'row',
    shadowOffset: {
      width: 5,
      height: 0,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    backgroundColor: Color.White,
    padding: METRICS.gutter.xs,
    borderTopWidth: 0.5,
    borderTopColor: Color.Manatee50,
  },
  circleRed: {
    backgroundColor: Color.Froly15,
    flex: -1,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleBlue: {
    backgroundColor: Color.BlueSea,
    flex: -1,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerContent: {
    marginLeft: METRICS.gutter.s,
  },
  titleLock: {
    color: Color.Froly,
    fontSize: FONTS.size.S,
  },
  titleBooked: {
    color: Color.BlueSea,
    fontSize: FONTS.size.S,
  },
  iconInfo: {
    color: Color.White,
    fontSize: FONTS.size.XXL,
  },
};

export default styles;
