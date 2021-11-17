import { METRICS, FONTS } from 'utils';

const styles = {
  content: {
    justifyContent: 'center',
    position: 'absolute',
  },
  txtLogin: {
    fontSize: FONTS.size.XXL,
    color: '#fff',
  },
  carding: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: METRICS.gutter.m,
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
  input: {
    marginTop: METRICS.gutter.l,
  },
  forgotPass: {
    textAlign: 'right',
    color: '#888E9E',
  },
  dontHaveAccount: {
    textAlign: 'center',
    marginTop: METRICS.gutter.s,
    marginBottom: METRICS.gutter.m,
    color: '#394A6D',
  },
};

export default styles;
