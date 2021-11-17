import {React, Modal, PropTypes, View, TouchableOpacity} from 'libraries';
import {Text, Button} from 'components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';

class ModalChooseAction extends React.PureComponent {
  render() {
    const {visible, onPress, reqClose, data} = this.props;
    if (data && data.User)
      return (
        <Modal animationType="slide" transparent visible={visible}>
          <View style={styles.background}>
            <View style={styles.container.main}>
              <View style={styles.container.header}>
                <TouchableOpacity onPress={reqClose}>
                  <AntDesign name="close" style={styles.icon.close} />
                </TouchableOpacity>
                <Text bold style={styles.text.header}>
                  modalMakeWinner.title
                </Text>
              </View>
              <Text bold style={styles.text.makeWinner}>
                modalMakeWinner.makeWinnerFor
              </Text>
              <Text h2 translate={false} style={styles.text.winner}>
                {data.User.first} {data.User.last}
              </Text>
              <View style={{height: 75}}>
                <Button title="modalMakeWinner.sure" onPress={onPress} />
              </View>
            </View>
          </View>
        </Modal>
      );
    return null;
  }
}

ModalChooseAction.defaultProps = {
  visible: false,
  data: {},
  onPress: () => {},
  reqClose: () => {},
};

ModalChooseAction.propTypes = {
  data: PropTypes.object,
  visible: PropTypes.bool,
  onPress: PropTypes.func,
  reqClose: PropTypes.func,
};

export default ModalChooseAction;
