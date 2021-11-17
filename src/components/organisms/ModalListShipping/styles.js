import { METRICS, Color, FONTS } from 'utils';

const styles = {
  background: {
    flex: 1,
    backgroundColor: Color.Black50,
  },
  price: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSearch: {
    color: Color.CornflowerBlue100,
    fontSize: FONTS.size.M,
  },
  buttonCountry: isActive => ({
    marginBottom: METRICS.gutter.s,
    backgroundColor: isActive ? Color.CornflowerBlue50 : '#fff',
    paddingVertical: METRICS.gutter.s,
    justifyContent: 'center',
  }),
  textCountry: isActive => ({
    fontSize: FONTS.size.M,
    textAlign: 'center',
    color: isActive ? '#fff' : Color.EastBay100,
  }),
  inputSearch: {
    borderRadius: 10,
    borderColor: Color.Manatee75,
    borderWidth: 1,
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: METRICS.gutter.xs,
    marginHorizontal: METRICS.gutter.s,
  },
  container: {
    main: {
      backgroundColor: Color.White,
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: METRICS.gutter.m,
      marginHorizontal: METRICS.gutter.s,
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
    makeWinner: {
      textAlign: 'center',
      color: Color.CornflowerBlue100,
    },
    winner: {
      textAlign: 'center',
      marginBottom: METRICS.gutter.s,
    },
    blok: {
      color: Color.Froly,
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
    makeWin: {
      backgroundColor: Color.CornflowerBlue15,
      borderRadius: 10,
      justifyContent: 'center',
      padding: METRICS.gutter.xs,
      marginBottom: METRICS.gutter.m,
      alignItems: 'center',
      height: 50,
    },
    blok: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: METRICS.gutter.m,
    },
  },
};

export default styles;
