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
  background: {
    backgroundColor: Color.WhiteLilac,
    flex: 1,
  },
  container: {
    // padding: METRICS.gutter.s,
    main: {
      flex: 1,
    },
    emptyState: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: METRICS.gutter.m,
    },
  },
  mainWrapper: {
    margin: 16,
  },
  content: {
    statusBid: {
      flexDirection: 'row',
      marginBottom: METRICS.gutter.s,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'center',
      marginBottom: METRICS.gutter.m,
    },
    image: {
      flexDirection: 'row',
      marginBottom: METRICS.gutter.s,
    },
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: METRICS.gutter.xs,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: METRICS.gutter.xxs,
    alignItems: 'center',
    marginBottom: METRICS.gutter.m,
  },
  wrapperTotalBidder: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: METRICS.gutter.s,
    paddingVertical: METRICS.gutter.xxs,
    borderRadius: 15,
  },
  wrapperBidder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  text: {
    status: p => ({
      backgroundColor: getBgColor(p),
      textAlignVertical: 'center',
      padding: 5,
      borderRadius: 5,
      overflow: 'hidden',
    }),
    bidder: {
      textAlign: 'center',
    },
    desc: {
      color: Color.Manatee75,
      marginBottom: METRICS.gutter.s,
    },
    totalBidder: {
      color: Color.CornflowerBlue100,
    },
    product: {
      marginBottom: 12,
    },
    cta: {
      color: Color.CornflowerBlue100,
    },
    emptyState: {
      textAlign: 'center',
      marginTop: METRICS.gutter.s,
      color: Color.CornflowerBlue100,
    },
  },
  price: {
    marginBottom: 5,
  },
  button: {
    cta: {
      marginVertical: METRICS.gutter.s,
      borderWidth: 1,
      borderColor: Color.Manatee50,
      borderRadius: 7,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: METRICS.gutter.s,
      backgroundColor: Color.White,
    },
  },
  icon: {
    next: {
      fontSize: FONTS.size.M,
    },
  },
  imgProduct: {
    width: 70,
    height: 70,
    borderRadius: 7,
    marginRight: METRICS.gutter.xs,
  },
  cardWinner: {
    backgroundColor: Color.White,
    borderRadius: 7,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: METRICS.gutter.m,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginBottom: METRICS.gutter.m,
  },
  textWinner: {
    color: Color.Manatee100,
    marginBottom: METRICS.gutter.s,
  },
  winnerName: {
    color: Color.EastBay100,
    fontSize: FONTS.size.M,
    marginBottom: METRICS.gutter.m,
  },
  textWiting: {
    textAlign: 'center',
  },
};

export default styles;
