import {METRICS, Color, FONTS} from 'utils';

const styles = {
  content: {
    width: 30,
    height: 30,
    elevation: 5,
    shadowRadius: 3.84,
    borderRadius: 15,
    shadowOffset: {
      shadowColor: '#000',
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    backgroundColor: Color.White,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: FONTS.size.M,
    textAlign: 'center',
  },
  text: {
    marginTop: METRICS.gutter.s,
  },
};

export default styles;
