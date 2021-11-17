import {METRICS, Color, hasNotch} from 'utils';

const styles = {
  mainContainer: {
    height: METRICS.screen.height,
  },
  imgWidth: METRICS.screen.width,
  header: {
    top: hasNotch ? 15 : 0,
    height: 40,
  },
  container: {
    header: {
      position: 'absolute',
      top: hasNotch ? 35 : 15,
      left: 10,
      right: 10,
    },
    countdown: {
      backgroundColor: Color.White,
      height: 30,
      width: 150,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 15,
      position: 'absolute',
      bottom: hasNotch ? -70 : -50,
    },
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  image: {
    resizeMode: 'cover',
    height: hasNotch ? 200 : 150,
    width: METRICS.screen.width,
  },
};

export default styles;
