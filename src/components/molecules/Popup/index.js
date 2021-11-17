import { Text } from 'components/atoms';
import { Modal, PropTypes, React, TouchableOpacity, View } from 'libraries';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Button from '../Button';
import styles from './styles';

class Popup extends React.PureComponent {
  render() {
    const { popup, onPressDefault } = this.props;

    return (
      <Modal animationType="slide" transparent visible={popup.isShow}>
        <View style={styles.background}>
          <View style={styles.container.main}>
            <TouchableOpacity
              style={styles.container.header}
              onPress={onPressDefault}>
              <AntDesign name="close" style={styles.icon.close} />
              <Text
                bold
                style={styles.text.header}
                translate={popup.titleTranslate}>
                {popup.title}
              </Text>
            </TouchableOpacity>
            <Text translate={popup.translate} style={styles.desc}>
              {popup.desc}
            </Text>
            <View style={styles.containerButton}>
              <Button title="popup.button.ok" onPress={onPressDefault} />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

Popup.defaultProps = {
  popup: {},
  onPressDefault: () => {},
};

Popup.propTypes = {
  popup: PropTypes.object,
  onPressDefault: PropTypes.func,
};

export default Popup;
