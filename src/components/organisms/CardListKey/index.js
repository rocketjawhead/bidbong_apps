import { React, View, TouchableOpacity, PropTypes } from 'libraries';
import { Image, Text } from 'components/atoms';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

class CardListKey extends React.Component {
  getNameKey = name => {
    switch (name) {
      case 1:
        return 'store.key.wood';
      case 2:
        return 'store.key.silver';
      case 3:
        return 'store.key.gold';
      default:
        return 'store.key.diamond';
    }
  };

  getIconKey = id => {
    switch (id) {
      case 1:
        return 'ic-wood-key';
      case 2:
        return 'ic-silver-key';
      case 3:
        return 'ic-gold-key';
      default:
        return 'ic-diamond-key';
    }
  };

  _renderButton = x => {
    const { addCart, cartKey, removeCart } = this.props;
    const findIt = cartKey.find(y => y.keyId === x.id);
    if (findIt) {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={styles.buttonSquare}
            onPress={() => removeCart(x)}>
            <Icon name="minus" style={styles.plus} />
          </TouchableOpacity>
          <Text translate={false} style={styles.count} bold>
            {findIt.count}
          </Text>
          <TouchableOpacity
            style={styles.buttonSquare}
            onPress={() => addCart(x)}>
            <Icon name="plus" style={styles.plus} />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View>
        <TouchableOpacity style={styles.button} onPress={() => addCart(x)}>
          <Text style={styles.text.buy}>store.button.buy</Text>
        </TouchableOpacity>
      </View>
    );
  };

  _renderCard = () => {
    const { arrayKey } = this.props;
    const { getNameKey, getIconKey, _renderButton } = this;
    if (_.isEmpty(arrayKey)) return null;
    const indexKey = arrayKey.slice(0, 4);
    return indexKey.map((x, i) => (
      <View style={styles.content.main} key={i}>
        <View style={styles.container.item}>
          <Image
            source={getIconKey(x.id)}
            imgWidth={40}
            contentIcon
            style={styles.img}
          />
          <View>
            <Text style={styles.text.typeKey}>{getNameKey(x.id)}</Text>
            <Text bold style={styles.text.amountKey} translate={false}>
              {`${x.price}€`}
            </Text>
          </View>
        </View>
        <View>{_renderButton(x)}</View>
      </View>
    ));
  };

  render() {
    const { _renderCard } = this;
    const { getTotal, handlerBuyKey, cartKey } = this.props;
    const disabled = _.isEmpty(cartKey);
    return (
      <View style={styles.container.main}>
        {_renderCard()}
        <TouchableOpacity style={styles.btnCheckout} onPress={handlerBuyKey}>
          <LinearGradient
            colors={styles.bgColor(disabled)}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.linearGradient}>
            <View style={styles.wrapperButtonText}>
              <Text style={styles.text.toPayment}>store.button.pay</Text>
              <View style={styles.wrapperTotAmount}>
                <Text bold style={styles.text.toPayment}>
                  store.text.total
                </Text>
                <Text bold style={styles.text.toPayment} translate={false}>
                  {`${getTotal}$`}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

CardListKey.defaultProps = {
  cartKey: [],
  arrayKey: [],
  getTotal: 0,
  addCart: () => {},
  removeCart: () => {},
  handlerBuyKey: () => {},
};

CardListKey.propTypes = {
  cartKey: PropTypes.array,
  addCart: PropTypes.func,
  getTotal: PropTypes.number,
  arrayKey: PropTypes.array,
  removeCart: PropTypes.func,
  handlerBuyKey: PropTypes.func,
};

export default CardListKey;
