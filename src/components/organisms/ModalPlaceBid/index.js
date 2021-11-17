import {React, Modal, PropTypes, View, TouchableOpacity} from 'libraries';
// eslint-disable-next-line import/no-cycle
import {Text, Button, Price, Input} from 'components';
import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from './styles';

const dataButton = [
  {id: 1, price: 0.1, view: '0.10 €'},
  {id: 2, price: 0.5, view: '0.50 €'},
  {id: 3, price: 1, view: '1 €'},
  {id: 4, price: 5, view: '5 €'},
];

const _renderButtonPrice = (onChangePrice, idPrice) =>
  dataButton.map(x => {
    const isActive = x.id === idPrice;
    return (
      <TouchableOpacity
        style={styles.button(isActive)}
        onPress={() => onChangePrice(x.price, 'button', x.id)}>
        <Text translate={false} style={styles.text.addPrice(isActive)}>
          {x.view}
        </Text>
      </TouchableOpacity>
    );
  });

const ModalPlaceBid = ({
  isOpen,
  idPrice,
  onPress,
  detailRoom,
  onChangePrice,
  price,
  validationPrice,
  handlerPlaceBid,
  currentPrice,
}) => {
  const isDisabled = parseInt(price) < currentPrice;
  return (
    <Modal animationType="slide" transparent visible={isOpen}>
      <View style={styles.background}>
        <View style={styles.container.main}>
          <TouchableOpacity style={styles.container.header} onPress={onPress}>
            <AntDesign name="close" style={styles.icon.close} />
            <Text bold style={styles.text.header}>
              modalPlaceBid.title
            </Text>
          </TouchableOpacity>
          <View style={styles.content.main}>
            <View style={styles.content.currentBid}>
              <Text style={styles.text.title}>component.currentBid</Text>
              <Price
                theme="green"
                amount={currentPrice}
                type="md"
                containerStyles={styles.price}
              />
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.text.title}>bidRoom.text.iwill</Text>
              <View style={styles.content.price}>
                <Input
                  onChangeText={onChangePrice}
                  noBorder
                  translatePlaceholder={false}
                  value={price}
                  inputStyle={{fontWeight: 'bold'}}
                  keyboardType="numeric"
                  maxLenght={15}
                  onEndEditing={validationPrice}
                />
              </View>
            </View>
          </View>
          <View style={styles.content.button}>
            {_renderButtonPrice(onChangePrice, idPrice)}
          </View>
          <View style={styles.container.button}>
            <Button
              disabled={isDisabled}
              title="bidRoom.button.placeBid"
              onPress={handlerPlaceBid}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

ModalPlaceBid.defaultProps = {
  price: 0,
  isOpen: false,
  idPrice: 0,
  detailRoom: {},
  currentPrice: 0,
  onPress: () => {},
  onChangePrice: () => {},
  handlerPlaceBid: () => {},
  validationPrice: () => {},
};

ModalPlaceBid.propTypes = {
  price: PropTypes.number,
  isOpen: PropTypes.bool,
  idPrice: PropTypes.number,
  onPress: PropTypes.func,
  detailRoom: PropTypes.object,
  currentPrice: PropTypes.number,
  onChangePrice: PropTypes.func,
  handlerPlaceBid: PropTypes.func,
  validationPrice: PropTypes.func,
};

export default React.memo(ModalPlaceBid);
