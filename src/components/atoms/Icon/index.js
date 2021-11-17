import {PropTypes, React} from 'libraries';
import {Theme, scale} from 'utils/index.js';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';

const IconSet = createIconSetFromIcoMoon(icoMoonConfig);

const Icon = props => <IconSet {...props} />;

Icon.propTypes = {
  size: PropTypes.number,
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  style: PropTypes.object,
};

Icon.defaultProps = {
  size: scale(18),
  color: Theme.dark,
};

export default React.memo(Icon);
