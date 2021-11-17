import { Theme, isIos, func } from 'utils';

const styles = {
  background: {
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute'
  },
  container: {
    flex: 1,
    backgroundColor: Theme.primary(),
  },
  content: {
    container: {
      flex: 1
    }
  }
};

export default styles;
