import {FONTS, METRICS} from 'utils';

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
    marginTop: METRICS.gutter.xs,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: METRICS.gutter.m,
    width: METRICS.screen.width * 0.9,
    alignSelf: 'center',
  },
  leftIcon: {
    resizeMode: 'contain',
    margin: METRICS.gutter.xs,
    alignSelf: 'center',
    width: METRICS.gutter.m,
    marginRight: METRICS.gutter.s,
  },
  input: {
    marginTop: METRICS.gutter.l,
  },
  dontHaveAccount: {
    textAlign: 'center',
    marginTop: METRICS.gutter.s,
    marginBottom: METRICS.gutter.m,
    color: '#394A6D',
  },
};

export default styles;
