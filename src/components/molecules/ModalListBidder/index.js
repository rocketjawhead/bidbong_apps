import {React, View, Modal, PropTypes, TouchableOpacity} from 'libraries';
import Icon from 'react-native-vector-icons/Entypo';
import _ from 'lodash';
import {Text, Image, Price} from 'components/atoms';
import {METRICS} from 'utils';
import {Fragment} from 'react';
import styles from './styles';
import ButtonReservation from '../ButtonReservation';

const imgWidth = METRICS.screen.width * 0.5;

const _renderButtonReservation = (statusRoom, handlerReservation) => {
  if (statusRoom) return null;
  return (
    <View style={styles.buttonReservation}>
      <ButtonReservation onPress={handlerReservation} />
    </View>
  );
};

const _renderEmptyState = (handlerReservation, statusRoom) => (
  <Fragment>
    <View style={styles.containerEmtpyState}>
      <Image source="img-empty-state" imgWidth={imgWidth} />
      <Text style={styles.text.empty}>reservation.modal.text.emptyState</Text>
      {_renderButtonReservation(handlerReservation, statusRoom)}
    </View>
  </Fragment>
);

const _renderItemBidder = (transaction, handlerReservation) => {
  const data = transaction;
  if (_.isEmpty(data)) return _renderEmptyState(handlerReservation);
  return (
    <View>
      {data.map(x => (
        <View
          key={x}
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={styles.content.itemBidder}>
            <Image
              contentIcon
              source="ic-bidder"
              imgWidth={45}
              style={{marginRight: 12}}
            />
            <Text translate={false}>{`${x.User.first} ${x.User.last}`}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const ModalListBidder = ({
  visible,
  closeModal,
  statusRoom,
  transaction,
  handlerReservation,
}) => (
  <Modal visible={visible}>
    <View style={styles.header}>
      <TouchableOpacity onPress={closeModal}>
        <Icon name="chevron-left" style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>reservation.modal.title.bidder</Text>
      <View />
    </View>
    <View style={styles.container}>
      {_renderItemBidder(transaction, handlerReservation, statusRoom)}
    </View>
  </Modal>
);

ModalListBidder.defaultProps = {
  visible: false,
  isAdmin: false,
  statusRoom: '',
  transaction: [],
  closeModal: () => {},
  handlerReservation: () => {},
};

ModalListBidder.propTypes = {
  visible: PropTypes.bool,
  isAdmin: PropTypes.bool,
  statusRoom: PropTypes.string,
  closeModal: PropTypes.func,
  transaction: PropTypes.array,
  handlerReservation: PropTypes.func,
};

export default React.memo(ModalListBidder);
