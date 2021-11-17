import { StyleSheet } from 'libraries';
import { METRICS, Color } from 'utils';

const getBg = (BackgroundColorConfig, isActive) => {
  if (isActive)
    return {
      backgroundColor: BackgroundColorConfig,
      zIndex: 10,
    };
  return {
    zIndex: 1,
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    alignItems: 'flex-end',
    // height: METRICS.screen.height * 0.9,
    // width: METRICS.screen.width,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    alignContent: 'center',
    bottom: 0,
  },
  contentItem: (firstY, opacity) => ({
    position: 'absolute',
    right: 15,
    bottom: firstY,
    opacity,
  }),
  square: {
    backgroundColor: Color.White,
    marginRight: 12,
    borderRadius: 10,
    height: 35,
    paddingHorizontal: 12,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Color.Manatee25,
  },
  itemCircle: {
    backgroundColor: Color.White,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17.5,
    borderWidth: 1,
    borderColor: Color.Manatee25,
  },
  itemIcon: {
    fontSize: 24,
    color: '#464CE0',
  },
  mainCircle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#000',
    alignItems: 'center',
    margin: 8,
    justifyContent: 'center',
  },
  mainButton: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPlus: colorIcon => ({
    fontSize: 18,
    color: colorIcon,
    textAlign: 'center',
  }),
});

export default styles;
