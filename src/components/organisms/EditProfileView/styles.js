import { Color, METRICS, FONTS } from 'utils';

const styles = {
  background: {
    background: Color.White,
    flex: 1,
  },
  container: {
    padding: METRICS.gutter.s,
  },
  content: {
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  title: {
    marginVertical: METRICS.gutter.s,
  },
  card: {
    padding: METRICS.gutter.s,
    borderRadius: 10,
    backgroundColor: Color.White,
    marginHorizontal: METRICS.gutter.m,
    marginBottom: METRICS.gutter.m,
  },
  square: {
    backgroundColor: Color.Shades,
    flex: -1,
    padding: 10,
    borderRadius: 10,
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: METRICS.gutter.s,
  },
  text: {
    number: {
      fontSize: FONTS.size.M,
    },
    subtitle: {
      fontSize: FONTS.size.L,
    },
  },
  input: {
    container: {
      marginTop: METRICS.gutter.xxl,
      flex: 1,
    },
    label: {
      color: Color.Manatee100,
    },
    password: {
      flexDirection: 'row',
      flex: 1,
      marginTop: METRICS.gutter.xxl,
      borderBottomWidth: 1,
      borderBottomColor: Color.Manatee50,
    },
  },
  button: {
    show: {
      alignSelf: 'center',
      color: Color.CornflowerBlue100,
    },
  },
  btnSelectCountry: {
    borderBottomWidth: 1,
    borderColor: Color.Manatee50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: METRICS.gutter.s,
    paddingBottom: 3,
  },
  placeholder: {
    color: Color.Manatee100,
    fontSize: FONTS.size.M,
  },
  iconDown: {
    fontSize: FONTS.size.L,
  },
};

export default styles;
