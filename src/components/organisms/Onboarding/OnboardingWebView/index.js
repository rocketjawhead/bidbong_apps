import { React, View, PropTypes, Modal, RNCWebView } from 'libraries';
import { NavBar } from 'components/molecules';
import styles from './styles';

class OnboardingWebView extends React.PureComponent {
  static propTypes = {
    content: PropTypes.string,
    modalVisible: PropTypes.bool,
    onRequestClose: PropTypes.func
  };

  static defaultProps = {
    content: 'privacyPolicy',
    modalVisible: false,
    onRequestClose: () => {}
  };

  onRequestClose = () => {
    const { onRequestClose } = this.props;
    return onRequestClose();
  };

  render() {
    const { onRequestClose } = this;
    const { content, modalVisible } = this.props;

    const PRIVACY_POLICY = 'privacyPolicy';
    const PRIVACY_POLICY_LINK = 'https://byu.id/id/m/privacy-policy';
    const TERMS_CONDITION_LINK = 'https://byu.id/id/m/term-and-condition';
    const WEBVIEW_CONTENT =
      content === PRIVACY_POLICY ? PRIVACY_POLICY_LINK : TERMS_CONDITION_LINK;

    return (
      <Modal
        visible={modalVisible}
        transparent={false}
        animationType="slide"
        onRequestClose={onRequestClose}
      >
        <View style={styles.background}>
          <View style={styles.container}>
            <NavBar white onPressRight={onRequestClose} />
            <RNCWebView
              source={{
                uri: WEBVIEW_CONTENT
              }}
              style={styles.content.container}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

export default OnboardingWebView;
