import {React, View, Modal, PropTypes, TouchableOpacity} from 'libraries';
import Icon from 'react-native-vector-icons/Entypo';
import {Text} from 'components/atoms';
import styles from './styles';

const ModalDescProduct = ({visible, closeModal, Product}) => (
  <Modal visible={visible}>
    <View style={styles.header}>
      <TouchableOpacity onPress={closeModal}>
        <Icon name="chevron-left" style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>reservation.modal.title.desc</Text>
      <View />
    </View>
    <View style={styles.container}>
      <Text bold style={styles.product} translate={false}>
        {Product.name}
      </Text>
      <Text style={styles.desc} translate={false}>
        {Product.description}
      </Text>
    </View>
  </Modal>
);

ModalDescProduct.defaultProps = {
  visible: false,
  Product: {},
  closeModal: () => {},
};

ModalDescProduct.propTypes = {
  visible: PropTypes.bool,
  Product: PropTypes.object,
  closeModal: PropTypes.func,
};

export default React.memo(ModalDescProduct);
