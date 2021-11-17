import { React, Modal, PropTypes, View, TouchableOpacity } from 'libraries';
import { Text } from 'components/atoms';
import { Color } from 'utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';

class ModalActionRoom extends React.PureComponent {
  render() {
    const { visible, onPress, onPressTop, onPressBottom } = this.props;

    return (
      <Modal animationType="slide" transparent visible={visible}>
        <View style={styles.background}>
          <View style={styles.container.main}>
            <View style={styles.container.header}>
              <TouchableOpacity onPress={onPress}>
                <AntDesign name="close" style={styles.icon.close} />
              </TouchableOpacity>
              <Text bold style={styles.text.header}>
                dashboard.modal.text
              </Text>
            </View>
            <TouchableOpacity
              style={styles.button.makeWin}
              onPress={onPressTop}>
              <Text style={styles.text.makeWinner}>
                dashboard.modal.buttonEdit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button.blok}
              onPress={onPressBottom}>
              <Text style={styles.text.blok}>dashboard.modal.buttonDelete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

ModalActionRoom.defaultProps = {
  visible: false,
  onPress: () => {},
  onPressTop: () => {},
  onPressBottom: () => {},
};

ModalActionRoom.propTypes = {
  visible: PropTypes.bool,
  onPress: PropTypes.func,
  onPressTop: PropTypes.func,
  onPressBottom: PropTypes.func,
};

export default ModalActionRoom;
