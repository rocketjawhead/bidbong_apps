import {METRICS, FONTS, Color, func} from 'utils';
import {StatusBar, Platform} from 'libraries';

const statusBarHight = Platform.select({
  ios: func.checkIphoneX() ? 44 : 20,
  android: StatusBar.currentHeight,
  default: 0,
});

const styles = {
  container: {
    flex: 1,
    left: 0,
    right: 0,
    bottom: statusBarHight,
    position: 'absolute',
    paddingTop: METRICS.paddingStatusBar(),
  },
  background: {
    container: backgroundColor => ({
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor,
    }),
  },
  header: {
    container: {
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'flex-end',
      margin: METRICS.gutter.m,
    },
  },
  buttonGetstarted: {
    height: 50,
    width: 150,
    alignSelf: 'flex-end',
    marginLeft: -150,
  },
  textSkip: {
    color: Color.CornflowerBlue100,
  },
};

export default styles;
