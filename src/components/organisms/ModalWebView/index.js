import { React, Modal, PropTypes } from 'libraries';
import { WebView } from 'react-native-webview';

class ModalWebView extends React.Component {
  render() {
    const { visible, url, navigationStateChangeHandler } = this.props;
    return (
      <Modal animationType="slide" transparent visible={visible}>
        <WebView
          source={{ uri: url }}
          onNavigationStateChange={navigationStateChangeHandler}
        />
      </Modal>
    );
  }
}

ModalWebView.defaultProps = {
  url: '',
  visible: false,
  navigationStateChangeHandler: () => {},
};

ModalWebView.propTypes = {
  url: PropTypes.string,
  visible: PropTypes.bool,
  navigationStateChangeHandler: PropTypes.func,
};

export default ModalWebView;
