import {StyleSheet} from 'libraries';
import {Color, METRICS} from 'utils';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.White,
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    padding: METRICS.gutter.s,
    marginBottom: METRICS.gutter.s,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: METRICS.gutter.s,
  },
  square: {
    width: 35,
    height: 35,
    borderRadius: 5,
    backgroundColor: Color.Manatee25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconAction: {
    width: 30,
    resizeMode: 'contain',
  },
  contentIcon: {
    flexDirection: 'row',
  },
  containField: {
    marginBottom: METRICS.gutter.xs,
  },
  titleField: {
    color: Color.Manatee75,
  },
});

export default styles;
