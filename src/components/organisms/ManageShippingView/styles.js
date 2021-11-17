import { METRICS, Color, FONTS } from 'utils';

const styles = {
  container: {
    margin: METRICS.gutter.s,
    flex: 1,
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
  cardInput: {
    backgroundColor: Color.White,
    borderRadius: 10,
    padding: METRICS.gutter.s,
    paddingTop: METRICS.gutter.m,
    marginBottom: METRICS.gutter.s,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  square: {
    backgroundColor: Color.Shades,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: METRICS.gutter.s,
    paddingHorizontal: METRICS.gutter.s,
    paddingVertical: 10,
  },
  rectangle: {
    width: 70,
    height: 30,
    backgroundColor: Color.Shades,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: METRICS.gutter.s,
  },
  number: {
    fontSize: FONTS.size.M,
    margin: METRICS.gutter.s,
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
  containerPagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 12,
  },
  containerSearch: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: Color.White,
    padding: METRICS.gutter.xs,
    borderRadius: 10,
    borderColor: Color.Manatee25,
    borderWidth: 1,
    marginBottom: METRICS.gutter.s,
    paddingHorizontal: METRICS.gutter.s,
  },
  inputSearch: {
    flex: 1,
    marginRight: METRICS.gutter.xs,
  },
  iconSearch: {
    color: Color.CornflowerBlue100,
    fontSize: FONTS.size.L,
    textAlign: 'center',
  },
  buttonSearch: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerEmptyState: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: METRICS.screen.height * 0.2,
  },
  text: {
    desc: {
      textAlign: 'center',
      marginTop: METRICS.gutter.s,
    },
  },
};

export default styles;
