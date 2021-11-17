import { Theme, METRICS, FONTS, func } from 'utils';

const styles = {
  container: {
    flex: -1,
    top: METRICS.gutter.m + (METRICS.paddingStatusBar() * 0.4),
    right: METRICS.gutter.m,
    width: 56,
    height: 32,
    padding: 4,
    position: 'absolute',
    borderRadius: 32,
    justifyContent: 'center',
    backgroundColor: Theme.light
  },
  content: {
    container: {
      top: 0,
      flex: -1,
      width: 56,
      height: 32,
      position: 'absolute',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 4
    },
    button: {
      width: 24,
      height: 24,
      alignItems: 'center',
      borderRadius: 32,
      justifyContent: 'center'
    },
    text: {
      paddingTop: 4,
      paddingLeft: 1,
      fontSize: FONTS.size.XXS,
      ...METRICS.dynamicShadow(3),
    }
  },
  icon: {
    left: 4,
    color: Theme.light,
    position: 'absolute'
  },
  indicator: translateX => ({
    width: 24,
    height: 24,
    ...METRICS.dynamicShadow(2),
    transform: [{ translateX }],
    borderRadius: 32,
    backgroundColor: Theme.light
  })
};

export default styles;
