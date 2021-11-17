import {StyleSheet} from 'libraries';
import {Color, METRICS} from 'utils';

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: Color.WhiteLilac,
  },
  mainContainer: {
    padding: METRICS.gutter.s,
  },
  title: {
    marginTop: METRICS.gutter.s,
  },
  containerList: {
    marginTop: METRICS.gutter.s,
  },
});

export default styles;
