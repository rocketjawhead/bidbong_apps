/* eslint-disable import/no-cycle */
import {
  React,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Animated,
  PropTypes,
} from 'libraries';
import Icon from 'react-native-vector-icons/Entypo';
import {
  Text,
  Image,
  Button,
  NavigationHeader,
  NavigationBar,
} from 'components';
import { Price } from 'components/atoms';
import _ from 'lodash';
import styles from './styles';

const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 0;

class CheckoutKeyView extends React.Component {
  constructor(props) {
    super(props);
    this.scrollYAnimatedValue = new Animated.Value(0);
  }

  getTypeKey = type => {
    switch (type) {
      case 1:
        return 'manageKey.key.wood';
      case 2:
        return 'manageKey.key.silver';
      case 3:
        return 'manageKey.key.gold';
      default:
        return 'manageKey.key.diamond';
    }
  };

  getTotal = () => {
    const { listKey } = this.props;
    let total = 0;
    listKey.map(x => (total += x.price));
    return total;
  };

  _renderProductItem = () => {
    const { listKey } = this.props;
    const { getTypeKey } = this;
    return listKey.map((x, i) => {
      const total = `${x.count}x`;
      const typeKey = getTypeKey(x.keyId);
      const amount = x.price;
      return (
        <View style={styles.containerProductItem}>
          <Image source="img-key-c" imgWidth={60} />
          <View style={styles.wrapperItem}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text bold style={styles.text.key} translate={false}>
                {`${total} `}
              </Text>
              <Text bold style={styles.text.key}>{`${typeKey}`}</Text>
            </View>
            <View style={styles.wrapperPrice}>
              <Text style={styles.textPrice}>checkout.text.price</Text>
              <Price theme="green" amount={amount} />
            </View>
          </View>
        </View>
      );
    });
  };

  _renderPaymentType = () => {
    const { paymentType } = this.props;
    if (!paymentType.cardNo) return <Text>checkout.button.selectPayment</Text>;

    const isVisa = paymentType?.cardNo.substring(0, 1) === '4';
    const perfixMC = paymentType?.cardNo.substring(0, 2);
    const isMC = parseInt(perfixMC) >= 51 && parseInt(perfixMC) <= 55;

    if (isVisa) return <Text translate={false}>VISA </Text>;
    if (isMC) return <Text translate={false}>MASTERCARD</Text>;

    return <Text>checkout.button.selectPayment</Text>;
  };

  render() {
    /**
     * =========================
     * CONST FOR ANIMATION
     * =========================
     */
    const headerHeight = this.scrollYAnimatedValue.interpolate({
      inputRange: [0, 10],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const padding = this.scrollYAnimatedValue.interpolate({
      inputRange: [0, 10],
      outputRange: [-50, 0],
      extrapolate: 'clamp',
    });

    const headerBackgroundColor = this.scrollYAnimatedValue.interpolate({
      inputRange: [0, 10],
      outputRange: ['rgba(255,255,255,0)', '#000'],
    });

    const { toPaymentList, handlerBuyKey, paymentType } = this.props;
    const isDisabled = _.isEmpty(paymentType.cardNo);
    return (
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } },
            },
          ])}>
          <View style={styles.inner}>
            <NavigationHeader />
            <View style={styles.container.main}>
              <Text h3 style={styles.title}>
                checkout.title
              </Text>
              <View style={styles.card}>
                <View style={styles.content.header}>
                  <View style={styles.square}>
                    <Text bold style={styles.text.number} translate={false}>
                      1
                    </Text>
                  </View>
                  <Text style={styles.text.subtitle}>
                    checkout.text.paymentMethod
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.button.selectPayment}
                  onPress={toPaymentList}>
                  {this._renderPaymentType()}
                  <Icon name="chevron-right" style={styles.icon.next} />
                </TouchableOpacity>
              </View>

              <View style={styles.card}>
                <View style={styles.content.header}>
                  <View style={styles.square}>
                    <Text bold style={styles.text.number} translate={false}>
                      2
                    </Text>
                  </View>
                  <Text style={styles.text.subtitle}>
                    checkout.text.productItem
                  </Text>
                </View>
                <View style={styles.contentProduct}>
                  {this._renderProductItem()}
                </View>
                <View style={styles.wrapperTotalCost}>
                  <Text>checkout.text.totalCost</Text>
                  <Text bold style={styles.price} translate={false}>
                    {this.getTotal()}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ height: 75 }}>
              <Button
                title="checkout.button.next"
                disabled={isDisabled}
                onPress={handlerBuyKey}
              />
            </View>
          </View>
        </ScrollView>
        <NavigationBar
          title="Checkout"
          padding={padding}
          height={headerHeight}
          backgroundColor={headerBackgroundColor}
        />
      </SafeAreaView>
    );
  }
}

CheckoutKeyView.defaultProp = {
  listKey: [],
  paymentType: '',
  toPaymentList: () => {},
  handlerBuyKey: () => {},
};

CheckoutKeyView.propTypes = {
  listKey: PropTypes.array,
  paymentType: PropTypes.string,
  toPaymentList: PropTypes.func,
  handlerBuyKey: PropTypes.func,
};

export default CheckoutKeyView;
