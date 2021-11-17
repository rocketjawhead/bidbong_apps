import { StyleSheet } from 'libraries';
import { Color, METRICS } from 'utils';

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: Color.White,
    borderRadius: 15,
    paddingHorizontal: METRICS.gutter.s,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    paddingBottom: 15
  },
  leftIcon: {
    resizeMode: 'contain',
    margin: 5,
    alignSelf: 'center',
    width: METRICS.gutter.m,
    marginRight: METRICS.gutter.s,
  },
  input: {
    marginTop: METRICS.gutter.m,
  },
});

export default styles;
