import {METRICS, FONTS} from 'utils';

const styles = {
  content: {
    justifyContent: 'center',
    position: 'absolute',
    top: METRICS.screen.height * 0.06,
  },
  txtLogin: {
    fontSize: FONTS.size.XXL,
    color: '#fff',
  },
  carding: {
    marginVertical: METRICS.gutter.m,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: METRICS.gutter.m,
    paddingVertical: METRICS.gutter.m,
    width: METRICS.screen.width * 0.9,
    alignSelf: 'center',
  },
  leftIcon: {
    resizeMode: 'contain',
    margin: 5,
    alignSelf: 'center',
    width: METRICS.gutter.m,
    marginRight: METRICS.gutter.s,
  },
  input: {},
  forgotPass: {
    textAlign: 'right',
    color: '#888E9E',
    marginTop: METRICS.gutter.m,
  },
  dontHaveAccount: {
    textAlign: 'center',
    color: '#394A6D',
  },
  buttonText: {
    fontSize: FONTS.size.S,
    textAlign: 'center',
    margin: 15,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
};

export default styles;
