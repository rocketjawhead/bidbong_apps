import { Platform } from 'libraries';
import { Color, func, METRICS } from 'utils';

const statusBarHight = Platform.select({
  ios: func.checkIphoneX() ? 20 : 10,
  android: 0,
  default: 0,
});

const styles = {
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,

    zIndex: 10,
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flex: 1,
    bottom: 0,
    width: '100%',
    paddingHorizontal: 25,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: METRICS.gutter.xs,
    borderColor: Color.Manatee50,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingBottom: statusBarHight,
  },
  animatedBox: type => ({
    width: METRICS.screen.width * 0.12,
    height: METRICS.screen.width * 0.12,
    borderRadius: METRICS.screen.width * 0.15,
    justifyContent: 'center',
    ...type,
  }),
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    marginLeft: METRICS.gutter.xs,
  },
  img: {
    alignSelf: 'center',
    resizeMode: 'contain',
  },
};

export default styles;
