import { METRICS, Theme, scale } from 'utils';
import { Platform } from 'libraries';

const styles = {
  policy: {
    container: viewOpacity => ({
      flex: -1,
      height: scale(50),
      justifyContent: 'center',
      opacity: 0.99,
      paddingHorizontal: scale(METRICS.gutter.m)
    }),
    text: {
      desc: {
        color: Theme.light
      },
      underline: {
        color: Theme.light,
        borderBottomWidth: scale(1),
        borderBottomColor: Theme.light
      }
    }
  },
  button: {
    container: viewOpacity => ({
      flex: -1,
      height: scale(50),
      opacity: viewOpacity,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }),
    button: {
      skip: {
        flex: -1,
        height: scale(50),
        justifyContent: 'center',
        paddingHorizontal: scale(METRICS.gutter.m)
      },
      next: {
        flex: -1,
        height: scale(50),
        justifyContent: 'center',
        paddingHorizontal: scale(METRICS.gutter.m)
      }
    },
    text: {
      skip: {
        color: Theme.light
      },
      next: {
        color: Theme.light
      }
    }
  }
};

export default styles;
