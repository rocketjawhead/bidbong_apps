import {METRICS, Color, FONTS} from 'utils';

const styles = {
  container: {
    margin: METRICS.gutter.s,
  },
  title: {
    marginBottom: METRICS.gutter.s,
  },
  card: {
    borderRadius: 7,
    padding: METRICS.gutter.s,
    backgroundColor: Color.White,
    marginBottom: METRICS.gutter.s,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  wrapperImage: {
    padding: 2,
    borderRadius: 10,
    backgroundColor: Color.Manatee50,
    position: 'absolute',
    right: METRICS.gutter.s,
    top: METRICS.gutter.s,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  price: {
    marginTop: METRICS.gutter.xs,
    marginBottom: METRICS.gutter.s,
  },
  titlePrice: {
    marginBottom: METRICS.gutter.xxs,
  },
  wrapperStatus: {
    flexDirection: 'row',
    marginBottom: METRICS.gutter.xs,
  },
  text: {
    time: {
      color: Color.Manatee75,
    },
    num: {
      fontSize: FONTS.size.L,
    },
    subtitle: {
      textAlign: 'center',
    },
    form: {
      color: Color.Manatee75,
      marginBottom: METRICS.gutter.xxs,
    },
    formValue: {
      marginBottom: METRICS.gutter.s,
    },
  },
  button: {
    backgroundColor: Color.CornflowerBlue15,
    padding: METRICS.gutter.s,
    borderRadius: 10,
    alignItems: 'center',
  },
  textButton: {
    fontSize: FONTS.size.S,
    color: Color.CornflowerBlue100,
  },
  square: {
    width: 35,
    height: 35,
    borderRadius: 5,
    backgroundColor: Color.Shades,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: METRICS.gutter.s,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: METRICS.gutter.s,
  },
};

export default styles;
