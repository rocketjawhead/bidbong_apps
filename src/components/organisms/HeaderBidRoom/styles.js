import {Color, FONTS, METRICS} from 'utils';

const styles = {
  button: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  dotActive: Color.White,
  dotInactive: Color.White25,
  paginationBoxStyle: {
    marginBottom: 15,
  },
  container: {
    marginBottom: METRICS.gutter.s,
  },
  content: {
    position: 'absolute',
    bottom: 50,
    right: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginHorizontal: METRICS.gutter.s,
  },
  amount: {
    color: Color.White,
    fontSize: FONTS.size.L,
    width: METRICS.screen.width * 0.6,
  },
};
export default styles;
