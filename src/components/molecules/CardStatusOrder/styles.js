import { StyleSheet } from 'libraries';
import { Color, METRICS, FONTS } from 'utils';
import { CONST } from 'config';

const styles = StyleSheet.create({
  container: {
    padding: METRICS.gutter.s,
    backgroundColor: Color.White,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginBottom: METRICS.gutter.s,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: METRICS.gutter.s,
  },
  square: {
    backgroundColor: Color.Shades,
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    borderRadius: 7,
    marginRight: METRICS.gutter.s,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: METRICS.gutter.s,
  },
  button: isActive => ({
    backgroundColor: isActive ? Color.CornflowerBlue25 : Color.Shades,
    padding: 12,
    borderRadius: 5,
    width: METRICS.screen.width * 0.75,
    alignSelf: 'center',
  }),
  text: isActive => ({
    color: isActive ? Color.CornflowerBlue75 : Color.Manatee75,
  }),
  icon: {
    textAlign: 'center',
    fontSize: FONTS.size.L,
    color: Color.CornflowerBlue75,
    fontWeight: 'bold',
  },
  formAWB: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.Manatee50,
    padding: METRICS.gutter.xs,
    marginVertical: METRICS.gutter.xs,
  },
  iconSend: {
    fontSize: 30,
    color: Color.CornflowerBlue100,
    alignSelf: 'flex-start',
  },
});

export default styles;
