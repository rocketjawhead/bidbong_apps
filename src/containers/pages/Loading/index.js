import { changeModalLoading } from 'config';
import { PropTypes, React, View } from 'libraries';
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux';
import styles from './styles';

class Loading extends React.PureComponent {
  render() {
    const { visible } = this.props;
    if (!visible) return null;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <LottieView
            autoPlay
            loop
            source={require('./loading.json')}
            style={{ height: 75, width: 75 }}
          />
        </View>
      </View>
    );
  }
}

Loading.propTypes = {
  visible: PropTypes.bool,
};

Loading.defaultProps = {
  visible: false,
};

const reduxState = state => ({
  visible: state.modal.isShow,
});

const reduxDispatch = dispatch => ({
  reqSetModal: () => dispatch(changeModalLoading()),
});

export default connect(reduxState, reduxDispatch)(Loading);
