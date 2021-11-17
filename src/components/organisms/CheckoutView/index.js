/* eslint-disable camelcase */
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
import { Text, Image, FormInputText, Button, Price } from 'components';
import { NavigationHeader, NavigationBar } from 'components/molecules';
import { Validator } from 'utils';
import _ from 'lodash';
import { config } from 'config/API/url';
import styles from './styles';

const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 0;
class CheckoutView extends React.Component {
  constructor(props) {
    super(props);
    this.scrollYAnimatedValue = new Animated.Value(0);
  }

  _renderCountry = () => {
    const { shipping } = this.props;
    const isEmpty = _.isEmpty(shipping);
    if (isEmpty) {
      return (
        <Text style={styles.text.productName} bold>
          checkout.text.fillCountry
        </Text>
      );
    }

    return (
      <Text
        style={styles.text.productName}
        bold
        params={{ name: shipping.country }}>
        checkout.text.filledCountry
      </Text>
    );
  };

  _renderButtonCountry = () => {
    const { shipping } = this.props;
    const isEmpty = _.isEmpty(shipping);
    if (isEmpty) {
      return <Text style={styles.placeholder}>checkout.input.country</Text>;
    }

    return (
      <Text style={styles.placeholder} translate={false}>
        {shipping.country}
      </Text>
    );
  };

  _renderPaymentType = () => {
    const { paymentType } = this.props;
    if (!paymentType) return <Text>checkout.button.selectPayment</Text>;

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

    const {
      handlerModal,
      onChangeText,
      valueFirtsname,
      valueLastname,
      valueEmail,
      valuePhone,
      valueAddress,
      shipping,
      valuecity,
      valuePostCode,
      valueState,
      validationFirstname,
      validationLastname,
      validationEmail,
      validationPhone,
      validationAddress,
      validationCity,
      validationZipcode,
      toPaymentList,
      validationState,
      detailRoom,
      handlerCheckout,
    } = this.props;

    const disabled =
      _.isEmpty(valueFirtsname) ||
      _.isEmpty(valueLastname) ||
      _.isEmpty(valueAddress) ||
      _.isEmpty(valueEmail) ||
      _.isEmpty(valuePhone) ||
      _.isEmpty(valuePostCode) ||
      _.isEmpty(valueState) ||
      _.isEmpty(valuecity) ||
      _.isEmpty(shipping);

    const { winner_price, Product } = detailRoom;
    const { name, productImages } = Product;

    const url = `${config.url.api}${productImages[0].data}`;
    const shippingCost = _.isEmpty(shipping) ? 0 : shipping.price;

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
              {/* <Text h3 style={styles.title}>
                checkout.title
              </Text> */}

              {/* FORM */}
              <View style={styles.card}>
                <View style={styles.content.header}>
                  <View style={styles.square}>
                    <Text bold style={styles.text.number} translate={false}>
                      1
                    </Text>
                  </View>
                  <Text style={styles.text.subtitle}>
                    checkout.text.shipping
                  </Text>
                </View>
                <FormInputText
                  labelStyle={styles.input.label}
                  value={valueFirtsname}
                  placeholder="checkout.input.firstname"
                  containerStyle={styles.input.container}
                  onChangeText={onChangeText}
                  type="firstname"
                  maxLength={20}
                  validation={validationFirstname}
                  validate={() => new Validator(valueFirtsname).isRequired()}
                />
                <FormInputText
                  labelStyle={styles.input.label}
                  value={valueLastname}
                  placeholder="checkout.input.lastname"
                  containerStyle={styles.input.container}
                  onChangeText={onChangeText}
                  type="lastname"
                  maxLength={20}
                  validation={validationLastname}
                  validate={() => new Validator(valueLastname).isRequired()}
                />
                <FormInputText
                  labelStyle={styles.input.label}
                  value={valueEmail}
                  placeholder="checkout.input.email"
                  containerStyle={styles.input.container}
                  onChangeText={onChangeText}
                  type="email"
                  maxLength={30}
                  validation={validationEmail}
                  validate={() =>
                    new Validator(valueEmail).isEmail().isRequired()
                  }
                />
                <FormInputText
                  labelStyle={styles.input.label}
                  value={valuePhone}
                  placeholder="checkout.input.phone"
                  containerStyle={styles.input.container}
                  onChangeText={onChangeText}
                  type="phoneNumber"
                  maxLength={20}
                  keyboardType="numeric"
                  validation={validationPhone}
                  validate={() => new Validator(valuePhone).isRequired()}
                />
                <FormInputText
                  labelStyle={styles.input.label}
                  value={valueAddress}
                  placeholder="checkout.input.address"
                  containerStyle={styles.input.container}
                  onChangeText={onChangeText}
                  type="address"
                  maxLength={50}
                  validation={validationAddress}
                  validate={() => new Validator(valueAddress).isRequired()}
                />
                <FormInputText
                  labelStyle={styles.input.label}
                  value={valuecity}
                  placeholder="checkout.input.city"
                  containerStyle={styles.input.container}
                  onChangeText={onChangeText}
                  type="city"
                  maxLength={20}
                  validation={validationCity}
                  validate={() => new Validator(valuecity).isRequired()}
                />
                <FormInputText
                  labelStyle={styles.input.label}
                  value={valueState}
                  placeholder="checkout.input.state"
                  containerStyle={styles.input.container}
                  onChangeText={onChangeText}
                  type="state"
                  maxLength={25}
                  validation={validationState}
                  validate={() => new Validator(valueState).isRequired()}
                />
                <FormInputText
                  labelStyle={styles.input.label}
                  value={valuePostCode}
                  placeholder="checkout.input.zipcode"
                  containerStyle={styles.input.container}
                  onChangeText={onChangeText}
                  type="zipPostCode"
                  maxLength={10}
                  keyboardType="numeric"
                  validation={validationZipcode}
                  validate={() => new Validator(valuePostCode).isRequired()}
                />
                <TouchableOpacity
                  onPress={handlerModal}
                  style={styles.btnSelectCountry}>
                  {this._renderButtonCountry()}
                  <Icon name="chevron-small-down" style={styles.iconDown} />
                </TouchableOpacity>
              </View>

              {/* PAYMENT */}
              <View style={styles.card}>
                <View style={styles.content.header}>
                  <View style={styles.square}>
                    <Text bold style={styles.text.number} translate={false}>
                      2
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

              {/* DETAIL PRODUCT AND SHIPPING */}
              <View style={styles.card}>
                <View style={styles.content.header}>
                  <View style={styles.square}>
                    <Text bold style={styles.text.number} translate={false}>
                      3
                    </Text>
                  </View>
                  <Text style={styles.text.subtitle}>
                    checkout.text.productItem
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                  <Image source={{ uri: url }} style={styles.image} />
                  <View style={styles.wrapperDetailProduct}>
                    <Text
                      style={styles.text.productName}
                      bold
                      translate={false}>
                      {name}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text>checkout.text.price</Text>
                      <Price
                        theme="green"
                        amount={winner_price}
                        containerStyles={{ marginLeft: 4 }}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.content.headerShipping}>
                  <View style={styles.square}>
                    <Text bold style={styles.text.number} translate={false}>
                      4
                    </Text>
                  </View>
                  <Text style={styles.text.subtitle}>
                    checkout.text.shippingCost
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                  <View style={styles.wrapperIcon}>
                    <Image
                      source="ic-ship"
                      contentIcon
                      style={styles.iconShipping}
                    />
                  </View>
                  <View style={styles.wrapperDetailProduct}>
                    {this._renderCountry()}
                    <View style={{ flexDirection: 'row' }}>
                      <Text>checkout.text.price</Text>
                      <Price
                        theme="green"
                        amount={shippingCost}
                        containerStyles={{ marginLeft: 4 }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ height: 75 }}>
              <Button
                title="checkout.button.next"
                disabled={disabled}
                onPress={handlerCheckout}
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

CheckoutView.defaultProps = {
  onChangeText: () => {},
  handlerModal: () => {},
  toPaymentList: () => {},
  handlerCheckout: () => {},
  detailRoom: {},
  shipping: {},
  valueFirtsname: '',
  valueLastname: '',
  valueEmail: '',
  valuePhone: '',
  valueAddress: '',
  valuecity: '',
  paymentType: '',
  valuePostCode: '',
  valueCountry: '',
  valueState: '',
  validationFirstname: false,
  validationLastname: false,
  validationEmail: false,
  validationPhone: false,
  validationAddress: false,
  validationCity: false,
  validationZipcode: false,
  validationState: false,
  validationCountry: false,
};

CheckoutView.propTypes = {
  shipping: PropTypes.object,
  detailRoom: PropTypes.object,
  onChangeText: PropTypes.func,
  handlerModal: PropTypes.func,
  valueFirtsname: PropTypes.string,
  valueLastname: PropTypes.string,
  valueEmail: PropTypes.string,
  toPaymentList: PropTypes.func,
  valuePhone: PropTypes.string,
  valueAddress: PropTypes.string,
  paymentType: PropTypes.string,
  valuecity: PropTypes.string,
  valuePostCode: PropTypes.string,
  valueCountry: PropTypes.string,
  valueState: PropTypes.string,
  validationFirstname: PropTypes.bool,
  validationLastname: PropTypes.bool,
  validationEmail: PropTypes.bool,
  validationPhone: PropTypes.bool,
  validationAddress: PropTypes.bool,
  validationCity: PropTypes.bool,
  validationZipcode: PropTypes.bool,
  validationState: PropTypes.bool,
  validationCountry: PropTypes.bool,
  handlerCheckout: PropTypes.func,
};

export default CheckoutView;
