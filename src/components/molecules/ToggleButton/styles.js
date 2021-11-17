import {Color} from 'utils';

const styles = {
  animatedBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0091EA',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  img: translateX => ({
    alignSelf: 'center',
    resizeMode: 'contain',
    position: 'absolute',
  }),
};

export default styles;
