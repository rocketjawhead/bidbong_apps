import { METRICS, FONTS, Color } from 'utils';

const styles = {
  container: {
    key: {
      flexDirection: 'row',
      marginTop: METRICS.gutter.s,
    },
  },
  content: {
    key: {
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 12,
    },
  },
  image: {
    alignSelf: 'center',
  },
  text: {
    typeKey: {
      color: Color.White,
      textAlign: 'center',
      fontSize: FONTS.size.S,
    },
    totalKey: {
      color: Color.White50,
      textAlign: 'center',
      fontSize: FONTS.size.S,
    },
  },
};

export default styles;
