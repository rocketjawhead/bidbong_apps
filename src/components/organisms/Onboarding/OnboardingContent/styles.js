import {METRICS, Theme, FONTS, scale, Color} from 'utils';

const styles = {
  container: {
    backgroundColor: Color.White,
    flex: 1,
    position: 'absolute',
    top: METRICS.screen.height * 0.7,
  },
  content: {
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      // top: scale(-50)
    },
  },
  body: {
    container: {
      flex: -1,
    },
    content: {
      left: 0,
      right: 0,
      width: METRICS.window.width,
      bottom: 0,
      position: 'absolute',
      paddingHorizontal: scale(METRICS.gutter.m),
    },
  },
  text: {
    container: {
      flex: -1,
      // height: scale(56 * 1)
    },
    title: textOpacity => ({
      flex: -1,
      opacity: textOpacity,
      color: Color.EastBay100,
      fontSize: FONTS.size.XXXL,
      fontFamily: FONTS.type.bold,
      marginBottom: scale(METRICS.gutter.xs),
    }),
    desc: textOpacity => ({
      color: Color.Manatee100,
      opacity: textOpacity,
      fontSize: FONTS.size.L,
      lineHeight: scale(24),
      fontFamily: FONTS.type.regular,
    }),
  },
  button: {
    container: viewOpacity => ({
      flex: -1,
      height: scale(56 * 2.5),
      opacity: viewOpacity,
      justifyContent: 'center',
    }),
    top: {
      marginBottom: scale(METRICS.gutter.xs),
    },
  },
  footer: {
    container: {
      flex: -1,
      paddingVertical: scale(METRICS.gutter.s),
    },
  },
};

export default styles;
