import {METRICS, FONTS, Color} from 'utils';

const styles = {
  container: {
    padding: METRICS.gutter.s,
  },
  containerEmtpyState: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  content: {
    itemBidder: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: METRICS.gutter.xs,
    },
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: METRICS.gutter.s,
    borderBottomWidth: 1,
    borderBottomColor: Color.Manatee50,
    marginBottom: METRICS.gutter.s,
  },
  icon: {
    fontSize: FONTS.size.L,
  },
  title: {
    fontSize: FONTS.size.S,
  },
  product: {
    fontSize: FONTS.size.M,
    marginBottom: METRICS.gutter.s,
  },
  text: {
    empty: {
      textAlign: 'center',
    },
  },
  buttonReservation: {
    marginTop: 100,
    backgroundColor: '#000',
  },
};

export default styles;
