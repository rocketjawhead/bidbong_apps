import {METRICS, FONTS} from 'utils';

const styles = {
  content: {
    position: 'absolute',
    top: METRICS.gutter.xl,
    paddingHorizontal: METRICS.gutter.s
  },
  txtLogin: {
    fontSize: FONTS.size.XXL,
    color: '#fff',
  },
  carding: {
    marginTop: METRICS.gutter.xl,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: METRICS.gutter.m,
    width: METRICS.screen.width * 0.9,
    alignSelf: 'center',
  },
  OTP: {
    backgroundColor: '#E7E9FD',
    borderRadius: 10,
    width: 55,
    height: 70,
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: FONTS.size.XXL,
    fontFamily: 'Roboto-Bold',
    color: '#394A6D',
    marginTop: METRICS.gutter.m,
  },
  buttonText: {
    fontSize: FONTS.size.XS,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  dontHaveAccount: {
    textAlign: 'center',
    marginTop: METRICS.gutter.s,
    marginBottom: METRICS.gutter.m,
    color: '#394A6D',
  },
};

export default styles;
