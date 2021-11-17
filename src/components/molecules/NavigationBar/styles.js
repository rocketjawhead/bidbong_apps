import { METRICS, FONTS, Color, func } from 'utils';
import { StatusBar, Platform } from 'libraries';

const statusBarHight = Platform.select({
  ios: func.checkIphoneX() ? 44 : 20,
  android: 0,
  default: 0,
});

const styles = {
  container: {
    top: statusBarHight,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: METRICS.screen.width,
    alignItems: 'center',
    paddingHorizontal: METRICS.gutter.s,
    backgroundColor: Color.White,
    borderBottomWidth: 3,
    borderBottomColor: '#f1f2f5',
  },
  text: {
    textAlign: 'center',
    fontSize: FONTS.size.M,
  },
  icon: {
    textAlign: 'center',
    fontSize: FONTS.size.L,
  },
};

export default styles;
