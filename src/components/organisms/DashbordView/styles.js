import {Color, METRICS, FONTS} from 'utils';

const styles = {
  bgColorChart: 'rgba(255,255,255,0)',
  background: headerBackgroundColor => ({
    backgroundColor: headerBackgroundColor,
    flex: 1,
    paddingTop: METRICS.gutter.s,
  }),
  container: {
    header: {
      alignItems: 'center',
      paddingTop: METRICS.gutter.s,
    },
    totalDownload: {
      flexDirection: 'row',
      marginHorizontal: METRICS.gutter.s,
      justifyContent: 'space-between',
      marginBottom: METRICS.gutter.s,
    },
    emptyState: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: METRICS.gutter.m,
    },
  },
  content: {
    title: {
      alignSelf: 'center',
    },
    amount: {
      backgroundColor: Color.CornflowerBlue15,
      flex: 1,
      padding: METRICS.gutter.xs,
      borderRadius: 10,
    },
  },
  cardHeader: {
    backgroundColor: Color.White,
    borderRadius: 10,
    marginHorizontal: METRICS.gutter.s,
    marginVertical: METRICS.gutter.m,
  },
  chart: {
    marginTop: METRICS.gutter.s,
    borderRadius: 16,
  },
  text: {
    titleHeader: {
      fontSize: FONTS.size.S,
      textAlign: 'center',
    },
    totalBid: {
      fontSize: FONTS.size.M,
      textAlign: 'center',
    },
    titleTotal: {
      marginBottom: METRICS.gutter.xs,
    },
    amount: {
      fontSize: METRICS.gutter.m,
      color: Color.CornflowerBlue100,
    },
    manageKey: {
      textAlign: 'center',
    },
    emptyState: {
      textAlign: 'center',
      marginVertical: METRICS.gutter.m,
      color: Color.CornflowerBlue100,
      paddingHorizontal: METRICS.gutter.xl,
    },
  },
  icon: {
    back: {
      fontSize: FONTS.size.XXL,
      position: 'absolute',
      right: METRICS.gutter.s,
      top: METRICS.gutter.s,
      color: Color.CornflowerBlue100,
    },
    next: {
      fontSize: FONTS.size.XXL,
      color: Color.CornflowerBlue100,
    },
  },
  chartWidth: METRICS.screen.width - 16,
  line: {
    borderBottomWidth: 0.51,
    marginHorizontal: METRICS.gutter.s,
    borderBottomColor: Color.EastBay25,
    marginBottom: METRICS.gutter.s,
  },
  wrapperTotalRoom: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    manageKey: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: METRICS.gutter.s,
      backgroundColor: Color.White,
      marginHorizontal: METRICS.gutter.s,
      marginBottom: METRICS.gutter.s,
      borderRadius: 10,
      alignItems: 'center',
    },
  },
  circle: {
    width: 40,
    height: 40,
    backgroundColor: Color.CornflowerBlue25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
};

export default styles;
