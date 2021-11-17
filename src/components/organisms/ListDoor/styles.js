import { METRICS, scale, Color, FONTS } from 'utils';

const styles = {
  containerCarousel: {
    paddingLeft: METRICS.gutter.s,
  },
  container: {
    position: 'absolute',
    bottom: METRICS.screen.height * 0.1,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: METRICS.gutter.s,
  },
  carousel: {
    item: {
      width: METRICS.window.width * 0.6,
    },
    slider: {
      width: METRICS.window.width,
    },
  },
  item: {},
  text: {
    pick: {
      fontSize: FONTS.size.M,
      color: Color.BaliHai,
      marginLeft: METRICS.gutter.s,
    },
  },
  indicator: {
    container: {
      flex: -1,
      alignSelf: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    active: indicatorPosition => ({
      width: 10,
      height: 10,
      borderRadius: 10,
      position: 'absolute',
      left: indicatorPosition,
      backgroundColor: Color.EastBay100,
    }),
    activeWithOutPos: {
      width: 20,
      height: 10,
      borderRadius: 5,
      // marginHorizontal: 2.5,
      backgroundColor: Color.EastBay100,
    },
    inactive: {
      width: 10,
      height: 10,
      opacity: 0.5,
      // marginHorizontal: 2.5,
      borderRadius: 10,
      backgroundColor: Color.EastBay25,
    },
    void: {
      flex: -1,
      height: METRICS.gutter.xl,
    },
  },
};

export default styles;
