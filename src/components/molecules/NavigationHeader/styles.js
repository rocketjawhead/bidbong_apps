import {METRICS, Color, FONTS} from 'utils';

const styles = {
  content: {
    backgroundColor: Color.White,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  icon: {
    fontSize: METRICS.gutter.m,
  },
  text: {
    color: Color.White,
    textAlign: 'center',
    marginLeft: METRICS.gutter.s,
    fontSize: FONTS.size.M,
  },
};

export default styles;
