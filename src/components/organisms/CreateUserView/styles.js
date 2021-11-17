import {StyleSheet} from 'libraries';
import {METRICS, Color} from 'utils';

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: Color.WhiteLilac,
  },
  mainContainer: {
    padding: METRICS.gutter.s,
  },
  buttonShowAll: {
    borderRadius: 7,
    backgroundColor: Color.White,
    borderWidth: 1,
    borderColor: Color.Manatee25,
    flex: 1,
    marginTop: METRICS.gutter.s,
    padding: METRICS.gutter.s,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: METRICS.gutter.s,
  },
  card: {
    backgroundColor: Color.White,
    borderRadius: 7,
    padding: METRICS.gutter.s,
  },
  input: {
    marginTop: METRICS.gutter.l,
  },
  labelStyle: {
    color: Color.Manatee100,
  },
  buttonContainer: {
    height: 75,
    marginBottom: METRICS.gutter.s,
  },
});

export default styles;
