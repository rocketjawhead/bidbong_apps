import {METRICS, FONTS, Color} from 'utils';

const styles = {
  container: {
    countdown: {
      borderWidth: 1,
      flexDirection: 'row',
      borderColor: Color.Manatee75,
      borderRadius: 10,
      paddingHorizontal: METRICS.gutter.s,
      paddingVertical: METRICS.gutter.xs,
      marginRight: METRICS.gutter.m,
      backgroundColor: Color.White,
    },
  },
  icon: {
    time: {
      alignSelf: 'center',
      fontSize: FONTS.size.XL,
      marginRight: METRICS.gutter.s,
    },
  },
  content: {
    countdown: {
      justifyContent: 'space-between',
    },
  },
  text: {
    time: {
      color: Color.BaliHai,
    },
    countdown: {
      fontSize: FONTS.size.M,
    },
  },
};

export default styles;
