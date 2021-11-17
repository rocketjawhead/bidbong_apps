import {React, Modal, PropTypes, View, TouchableOpacity} from 'libraries';
import {Text, Button} from 'components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';

class ModalActionListAdmin extends React.PureComponent {
  _renderViewEdit = () => {};

  _renderViewDelete = () => {
    const {
      visible,
      onPress,
      reqClose,
      selectedUser,
      handlerDeleteUser,
    } = this.props;
    return (
      <Modal animationType="slide" transparent visible={visible}>
        <View style={styles.background}>
          <View style={styles.container.main}>
            <View style={styles.container.header}>
              <TouchableOpacity onPress={reqClose}>
                <AntDesign name="close" style={styles.icon.close} />
              </TouchableOpacity>
              <Text bold style={styles.text.header}>
                AdminAccount.modal.text.confirm
              </Text>
            </View>
            <Text bold style={styles.text.delete}>
              AdminAccount.modal.text.delete
            </Text>
            <Text h2 translate={false} style={styles.text.user}>
              {`${selectedUser.first} ${selectedUser.last}`}
            </Text>
            <View style={{height: 75}}>
              <Button
                title="modalMakeWinner.sure"
                onPress={() => handlerDeleteUser(selectedUser.id)}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  _renderViewCant = () => {
    const {visible, reqClose, type} = this.props;
    const isSame = type === 'same';
    const wording = isSame
      ? 'AdminAccount.modal.text.sameUser'
      : 'AdminAccount.modal.text.lastUser';
    return (
      <Modal animationType="slide" transparent visible={visible}>
        <View style={styles.background}>
          <View style={styles.container.main}>
            <View style={styles.container.header}>
              <TouchableOpacity onPress={reqClose}>
                <AntDesign name="close" style={styles.icon.close} />
              </TouchableOpacity>
              <Text bold style={styles.text.header}>
                AdminAccount.modal.text.cant
              </Text>
            </View>
            <Text style={styles.text.user}>{wording}</Text>
            <View style={{height: 75}}>
              <Button title="AdminAccount.button.okey" onPress={reqClose} />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    const {type} = this.props;
    if (type === 'delete') return this._renderViewDelete();
    if (type === 'cant' || type === 'same') return this._renderViewCant();
    return null;
  }
}

ModalActionListAdmin.defaultProps = {
  type: 'delete',
  visible: false,
  selectedUser: {},
  onPress: () => {},
  reqClose: () => {},
  handlerDeleteUser: () => {},
};

ModalActionListAdmin.propTypes = {
  type: PropTypes.string,
  visible: PropTypes.bool,
  onPress: PropTypes.func,
  reqClose: PropTypes.func,
  selectedUser: PropTypes.object,
  handlerDeleteUser: PropTypes.func,
};

export default ModalActionListAdmin;
