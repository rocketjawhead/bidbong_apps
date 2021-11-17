import {METRICS, Color, FONTS} from 'utils';

const styles = {
  container: {
    margin: METRICS.gutter.s,
  },
  title: {
    marginVertical: METRICS.gutter.xs,
  },
  card: {
    backgroundColor: Color.White,
    borderRadius: 10,
    padding: METRICS.gutter.s,
    marginBottom: METRICS.gutter.s,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  square: {
    width: 30,
    height: 30,
    backgroundColor: Color.Shades,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: METRICS.gutter.s,
  },
  number: {
    fontSize: FONTS.size.M,
  },
  key: {
    fontSize: FONTS.size.M,
  },
  currentPrice: {
    marginTop: METRICS.gutter.s,
    marginBottom: METRICS.gutter.xxs,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  input: {
    flex: 0.8,
  },
  labelStyle: {
    color: Color.Manatee100,
  },
  button: {
    backgroundColor: Color.CornflowerBlue25,
    marginTop: METRICS.gutter.s,
    padding: METRICS.gutter.xs,
    alignItems: 'center',
    borderRadius: 7,
  },
  txtSave: {
    color: Color.CornflowerBlue100,
  },
};

export default styles;
