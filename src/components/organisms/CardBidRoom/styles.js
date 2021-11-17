import {Color, METRICS, FONTS} from 'utils';

const styles = {
  container: {
    main: {
      flex: 1,
    },
    card: {
      position: 'absolute',
      left: 0,
      right: 0,
      flex: 1,
      bottom: 0,
      top: -30,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
      backgroundColor: Color.White,
    },
    countdown: {
      borderWidth: 1,
      flexDirection: 'row',
      borderColor: Color.Manatee75,
      width: 225,
      borderRadius: 10,
      paddingHorizontal: METRICS.gutter.s,
      paddingVertical: METRICS.gutter.xs,
      marginRight: METRICS.gutter.m,
    },
    listBidder: {
      backgroundColor: Color.WhiteLilac,
      flex: 1,
      borderRadius: 15,
      padding: METRICS.gutter.s,
    },
    bidderRow: {
      backgroundColor: '#fff',
      width: 60,
      borderRadius: 10,
      justifyContent: 'center',
    },
    Button: {
      position: 'absolute',
      bottom: 12,
      left: 12,
      right: 12,
    },
    emptyState: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: METRICS.gutter.m,
    },
  },
  content: {
    header: {
      flexDirection: 'row',
      alignItem: 'center',
      padding: METRICS.gutter.s,
    },
    countdown: {
      justifyContent: 'space-between',
    },
    listBidder: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: METRICS.gutter.s,
    },
    itemBidder: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: METRICS.gutter.xs,
    },
  },
  icon: {
    time: {
      alignSelf: 'center',
      fontSize: FONTS.size.XL,
      marginRight: METRICS.gutter.s,
    },
  },
  text: {
    bidder: {
      fontSize: FONTS.size.M,
      textAlign: 'center',
    },
    time: {
      color: Color.BaliHai,
    },
    countdown: {
      fontSize: FONTS.size.M,
    },
    emptyState: {
      textAlign: 'center',
      marginTop: METRICS.gutter.s,
      color: Color.CornflowerBlue100,
    },
  },
};

export default styles;
