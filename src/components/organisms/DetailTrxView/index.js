/* eslint-disable camelcase */
/* eslint-disable import/no-cycle */
import {
  React,
  SafeAreaView,
  ScrollView,
  View,
  Animated,
  PropTypes,
} from 'libraries';
import {
  Text,
  Image,
  Price,
  NavigationBar,
  NavigationHeader,
} from 'components';
import moment from 'moment';
import { config } from 'config/API/url';
import styles from './styles';

const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 0;

class CartView extends React.Component {
  constructor(props) {
    super(props);
    this.scrollYAnimatedValue = new Animated.Value(0);
  }

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

    /**
     * PROPS
     */
    const { detailTrx } = this.props;
    if (detailTrx) {
      const {
        product_name,
        winner_price,
        last_update,
        latest_status_name,
        winner,
        Product,
      } = detailTrx;
      const lastUpdate = moment(last_update).format('MMMM DD, YYYY - HH:MM');
      if (winner[0].ShippingDetail === null) return null;
      const {
        firstName,
        lastname,
        phoneNumber,
        email,
        city,
        state,
        address,
        shippingType,
        zipPostCode,
      } = winner[0].ShippingDetail;
      const { country } = shippingType;
      const image = Product.images;
      const urlImage = `${image}`;

      return (
        <SafeAreaView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
            scrollEventThrottle={16}
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: { y: this.scrollYAnimatedValue },
                },
              },
            ])}>
            <View style={styles.container}>
              <NavigationHeader />
              <Text h2 style={styles.title}>
                trxDetail.title
              </Text>

              <View style={styles.card}>
                <View style={styles.wrapperImage}>
                  <Image source={{ uri: urlImage }} style={styles.image} />
                </View>
                <Text translate={false}>{product_name}</Text>
                <Price
                  theme="green"
                  title="component.price"
                  type="md"
                  containerStyles={styles.price}
                  titleStyle={styles.titlePrice}
                  amount={winner_price}
                />
                <View style={styles.wrapperStatus}>
                  <Text>cart.text.status</Text>
                  <Text translate={false}>{latest_status_name}</Text>
                </View>
                <Text translate={false} style={styles.text.time}>
                  {lastUpdate}
                </Text>
              </View>

              <View style={styles.card}>
                <View style={styles.header}>
                  <View style={styles.square}>
                    <Text translate={false} style={styles.text.nume}>
                      1
                    </Text>
                  </View>
                  <Text>trxDetail.text.shipping</Text>
                </View>
                <View>
                  <Text style={styles.text.form}>trxDetail.text.firstname</Text>
                  <Text translate={false} style={styles.text.formValue}>
                    {firstName}
                  </Text>
                  <Text style={styles.text.form}>trxDetail.text.lastname</Text>
                  <Text translate={false} style={styles.text.formValue}>
                    {lastname}
                  </Text>
                  <Text style={styles.text.form}>trxDetail.text.email</Text>
                  <Text translate={false} style={styles.text.formValue}>
                    {email}
                  </Text>
                  <Text style={styles.text.form}>
                    trxDetail.text.phonenumber
                  </Text>
                  <Text translate={false} style={styles.text.formValue}>
                    {phoneNumber}
                  </Text>
                  <Text style={styles.text.form}>trxDetail.text.address</Text>
                  <Text translate={false} style={styles.text.formValue}>
                    {address}
                  </Text>
                  <Text style={styles.text.form}>trxDetail.text.city</Text>
                  <Text translate={false} style={styles.text.formValue}>
                    {city}
                  </Text>
                  <Text style={styles.text.form}>trxDetail.text.state</Text>
                  <Text translate={false} style={styles.text.formValue}>
                    {state}
                  </Text>
                  <Text style={styles.text.form}>trxDetail.text.zipcode</Text>
                  <Text translate={false} style={styles.text.formValue}>
                    {zipPostCode}
                  </Text>
                  <Text style={styles.text.form}>trxDetail.text.country</Text>
                  <Text translate={false} style={styles.text.formValue}>
                    {country}
                    {/* {ShippingType} */}
                  </Text>
                </View>
              </View>

              <View style={styles.card}>
                <View style={styles.header}>
                  <View style={styles.square}>
                    <Text translate={false} style={styles.text.nume}>
                      2
                    </Text>
                  </View>
                  <Text>trxDetail.text.payment</Text>
                </View>
                <View>
                  <Text style={styles.text.form}>
                    trxDetail.text.paymentMethod
                  </Text>
                  <Text style={styles.text.formValue}>
                    trxDetail.text.paymentType
                  </Text>
                </View>
              </View>

              <View style={styles.card}>
                <View style={styles.header}>
                  <View style={styles.square}>
                    <Text translate={false} style={styles.text.nume}>
                      3
                    </Text>
                  </View>
                  <Text>trxDetail.text.needHelp</Text>
                </View>
                <View>
                  <Text style={styles.text.form}>
                    trxDetail.text.phonenumber
                  </Text>
                  <Text style={styles.text.formValue} translate={false}>
                    +33 6 67 65 22 96
                  </Text>
                  <Text style={styles.text.form}>trxDetail.text.email</Text>
                  <Text style={styles.text.formValue} translate={false}>
                    info@bidbong.com
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
          <NavigationBar
            title="Transaction Detail"
            padding={padding}
            height={headerHeight}
            backgroundColor={headerBackgroundColor}
          />
        </SafeAreaView>
      );
    }

    return null;
  }
}

CartView.defaultProps = {
  detailTrx: {},
};

CartView.propTypes = {
  detailTrx: PropTypes.object,
};

export default CartView;
