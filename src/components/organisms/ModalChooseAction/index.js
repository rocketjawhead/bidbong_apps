import { React, Modal, PropTypes, View, TouchableOpacity } from 'libraries';
import { Text } from 'components/atoms';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';

class ModalBidderWinner extends React.PureComponent {
  render() {
    const { visible, onPress, onPressTop } = this.props;

    return (
      <Modal animationType="slide" transparent visible={visible}>
        <View style={styles.background}>
          <View style={styles.container.main}>
            <View style={styles.container.header}>
              <TouchableOpacity onPress={onPress}>
                <AntDesign name="close" style={styles.icon.close} />
              </TouchableOpacity>
              <Text bold style={styles.text.header}>
                modalAction.title
              </Text>
            </View>
            <TouchableOpacity
              style={styles.button.makeWin}
              onPress={onPressTop}>
              <Text style={styles.text.makeWinner}>modalAction.winner</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button.blok}>
              <Text style={styles.text.blok}>modalAction.blok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

ModalBidderWinner.defaultProps = {
  visible: false,
  onPress: () => {},
  reqClose: () => {},
  onPressTop: () => {},
};

ModalBidderWinner.propTypes = {
  visible: PropTypes.bool,
  onPress: PropTypes.func,
  reqClose: PropTypes.func,
  onPressTop: PropTypes.func,
};

export default ModalBidderWinner;
