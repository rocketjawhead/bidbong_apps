import { React, View, PropTypes } from 'libraries';
import { Text, Input } from 'components/atoms';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import styles from './styles';

const _renderButtonStatus = ({
  orderStatus,
  onPress,
  onChangeCourierName,
  onChangeAWB,
}) => {
  const data = [
    {
      id: 12,
      title: 'Confirm Payment',
      code: 13,
    },
    {
      id: 13,
      title: 'On Order',
      code: 20,
    },
    {
      id: 20,
      title: 'Order on Delivery',
      code: 31,
    },
    {
      id: 31,
      title: 'Order Finished',
      code: 33,
    },
  ];

  const _renderFormAWB = x => {
    if (orderStatus === 20 && x.code === 31) {
      return (
        <React.Fragment>
          <View style={styles.formAWB}>
            <Text translate={false}>Expedition Name</Text>
            <Input
              noBorder
              translatePlaceholder={false}
              onChangeText={onChangeCourierName}
            />
          </View>
          <View style={styles.formAWB}>
            <Text translate={false}>Tracking Number</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
              }}>
              <Input
                noBorder
                onChangeText={onChangeAWB}
                translatePlaceholder={false}
                style={{ flex: 1 }}
                containerStyle={{ flex: 1 }}
              />
              <TouchableOpacity onPress={() => onPress(x.code)}>
                <EvilIcon name="arrow-right" style={styles.iconSend} />
              </TouchableOpacity>
            </View>
          </View>
        </React.Fragment>
      );
    }
    return null;
  };

  return data.map((x, i) => {
    const isActive =
      orderStatus === x.id || (orderStatus === 20 && x.code === 31);
    const isDone = orderStatus > x.id;
    return (
      <View style={styles.btnContainer}>
        <View>
          <TouchableOpacity
            disabled={!isActive}
            style={styles.button(isActive)}
            key={i}
            onPress={() => onPress(x.code)}>
            <Text translate={false} style={styles.text(isActive)}>
              {x.title}
            </Text>
          </TouchableOpacity>
          {_renderFormAWB(x)}
        </View>
        {isDone ? <Icon name="checkcircleo" style={styles.icon} /> : null}
      </View>
    );
  });
};

const CardStatusOrder = ({
  orderStatus,
  onPress,
  onChangeCourierName,
  onChangeAWB,
}) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <View style={styles.square}>
        <Text translate={false} bold>
          1
        </Text>
      </View>
      <Text>detailBidRoom.text.setStatus</Text>
    </View>
    {_renderButtonStatus({
      orderStatus,
      onPress,
      onChangeCourierName,
      onChangeAWB,
    })}
  </View>
);

CardStatusOrder.defaultProps = {
  orderStatus: 0,
  onPress: () => {},
  onChangeAWB: () => {},
  onChangeCourierName: () => {},
};

CardStatusOrder.propTypes = {
  onPress: PropTypes.func,
  orderStatus: PropTypes.number,
  onChangeAWB: PropTypes.func,
  onChangeCourierName: PropTypes.func,
};

export default React.memo(CardStatusOrder);
