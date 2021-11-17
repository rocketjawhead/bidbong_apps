/* eslint-disable import/no-cycle */
import { React, View, PropTypes } from 'libraries';
import { Image, Text } from 'components';
import moment from 'moment';
import _ from 'lodash';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { config } from 'config/API/url';

import styles from './styles';

const _renderStatus = p => {
  switch (p) {
    case 'waiting':
      return (
        <View style={styles.content.status}>
          <Text bold style={styles.text.status('waiting')}>
            dashboard.text.status.scheduled
          </Text>
        </View>
      );
    case 'live':
      return (
        <View style={styles.content.status}>
          <Text bold style={styles.text.status('live')}>
            dashboard.text.status.open
          </Text>
        </View>
      );
    default:
      return (
        <View style={styles.content.status}>
          <Text bold style={styles.text.status('end')}>
            dashboard.text.status.finish
          </Text>
        </View>
      );
  }
};

const getTypeKey = p => {
  switch (p) {
    case 1:
      return 'key.wood';
    case 2:
      return 'key.silver';
    case 3:
      return 'key.gold';
    default:
      return 'key.diamond';
  }
};

const CardBid = ({ data, toRoom, isAdmin, handlerModal }) => {
  const bidder =
    data && data.BiddingTransactions && data.BiddingTransactions.length;
  const startBid = moment(data.startBid).format('DD.MM.YYYY - HH:mm');
  const endBid = moment(data.endBid).format('DD.MM.YYYY - HH:mm');
  const url = `${config.url.api}${data.Product?.productImages[0]?.data}`;
  if (_.isEmpty(data)) return null;
  return (
    <View style={styles.container.main}>
      <View style={styles.container.image}>
        <Image
          source={{ uri: url }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 10,
            alignSelf: 'center',
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.container.detail}
        disabled={!isAdmin}
        onPress={() => toRoom({ id: data.id, statusRoom: data.typeRoom })}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.text.key}>
            {getTypeKey(parseInt(data.allowKey))}
          </Text>
        </View>
        <Text bold style={styles.text.product} translate={false}>
          {`${data.Product.name}`}
        </Text>
        {_renderStatus(data.typeRoom)}
        <View style={styles.wrapperTime}>
          <View style={{ flexDirection: 'row' }}>
            <Text>dashboard.text.startBid</Text>
            <Text translate={false}>{startBid}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text>dashboard.text.endBid</Text>
            <Text translate={false}>{endBid}</Text>
          </View>
        </View>
        <Text params={{ name: bidder }}>dashboard.text.enrolled</Text>
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.buttonMore}
          onPress={() => handlerModal(data)}>
          <Image source="ic-more" contentIcon imgWidth={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

CardBid.defaultProps = {
  data: {},
  isAdmin: false,
  toRoom: () => {},
  handlerModal: () => {},
};

CardBid.propTypes = {
  data: PropTypes.object,
  toRoom: PropTypes.func,
  isAdmin: PropTypes.bool,
  handlerModal: PropTypes.func,
};

export default React.memo(CardBid);
