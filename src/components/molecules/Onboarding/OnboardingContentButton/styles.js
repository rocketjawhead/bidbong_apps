import {METRICS, scale, Color} from 'utils';

const styles = {
  container: viewOpacity => ({
    alignSelf: 'flex-end',
    opacity: viewOpacity,
    backgroundColor: '#000',
    height: 10,
    width: undefined,
  }),
  top: {
    marginBottom: scale(METRICS.gutter.xs),
  },
};

export default styles;
