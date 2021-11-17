import {Color, FONTS, METRICS} from 'utils';

const styles = {
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItem: 'center',
  },
  text: {
    titlePage: {
      color: Color.White,
      fontSize: FONTS.size.XL,
    },
    editProfile: {
      color: Color.White,
      textAlign: 'center',
      fontSize: FONTS.size.S,
    },
    name: {
      color: Color.White,
      marginTop: METRICS.gutter.s,
      fontSize: FONTS.size.L,
      textAlign: 'center',
    },
    email: {
      color: Color.White,
      textAlign: 'center',
      fontSize: FONTS.size.S,
      marginTop: METRICS.gutter.xs,
    },
  },
  container: {
    profile: {
      alignSelf: 'center',
    },
  },
  img: {
    marginTop: METRICS.gutter.m,
    alignSelf: 'center',
    width: 90,
    height: 90,
    borderRadius: 45,
  },
};

export default styles;
