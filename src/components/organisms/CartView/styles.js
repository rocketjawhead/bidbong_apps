import { METRICS, Color, FONTS } from 'utils';

const styles = {
  container: {
    margin: METRICS.gutter.s,
    height: METRICS.screen.height,
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
      marginBottom: METRICS.gutter.s,
    },
    product: {
      fontSize: FONTS.size.M,
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
  containerEmpty: {
    jusifyContent: 'center',
    alignItems: 'center',
    marginTop: METRICS.screen.height * 0.25,
    padding: METRICS.gutter.m,
  },
};

export default styles;
