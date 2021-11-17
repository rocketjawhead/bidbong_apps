import { StyleSheet } from 'libraries';
import { Color, FONTS, METRICS } from 'utils';

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  container: {
    margin: METRICS.gutter.s,
    justifyContent: 'center',
    flex: 1,
  },
  textWrapper: {
    margin: METRICS.gutter.xs,
  },
  title: {
    color: Color.White,
    fontSize: FONTS.size.XXL,
    fontFamily: FONTS.type.light,
  },
  subtitle: {
    color: Color.White,
    fontWeight: 'bold',
    fontSize: FONTS.size.XXL,
  },
});

export default styles;
