/* eslint-disable import/no-cycle */
import { Image, Price, Text } from 'components';
import { Button, NavigationHeader } from 'components/molecules';
import { config } from 'config/API/url';
import _ from 'lodash';
import { PropTypes, React, SafeAreaView, ScrollView, View } from 'libraries';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';

class CartView extends React.Component {
  _renderProductItem = () => {
    const { listRoom } = this.props;
    return listRoom.map((x, i) => {
      const time = moment(x.setWinnerDate).format('MMMM Do, YYYY - hh:mm a');
      const image = `${x.Product.images}`;
      return (
        <View style={styles.card}>
          <View style={styles.wrapperImage}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
          <Text translate={false} style={styles.text.product}>
            {x.product_name}
          </Text>
          <Price
            theme="green"
            title="component.price"
            containerStyles={styles.price}
            titleStyle={styles.titlePrice}
            amount={x.winner_price}
          />
          <View style={styles.wrapperStatus}>
            <Text>cart.text.status</Text>
            {/* <Text translate={false}></Text> */}
            {this._renderStatusOrder(x.latest_status_code)}
            {/* <Text translate={false}>cart.status.deliver</Text> */}
          </View>
          <Text translate={false} style={styles.text.time}>
            {time}
          </Text>
          {this._renderButton(x.latest_status_code, x)}
          {/* <TouchableOpacity style={styles.button} >
            <Text style={styles.textButton}>cart.button.seeDetail</Text>
          </TouchableOpacity> */}
        </View>
      );
    });
  };

  _renderStatusOrder = type => {
    switch (parseInt(type)) {
      case 10:
        return (
          <View>
            <Text>paymentStatus.waitingForPayment</Text>
          </View>
        );
      case 11:
        return (
          <View>
            <Text>paymentStatus.paymentExpired</Text>
          </View>
        );
      case 12:
        return (
          <View>
            <Text>paymentStatus.paymentPaid</Text>
          </View>
        );
      case 13:
        return (
          <View>
            <Text>paymentStatus.paymentConfirmed</Text>
          </View>
        );
      case 14:
      case 15:
        return (
          <View>
            <Text>paymentStatus.pendingPayment</Text>
          </View>
        );
      case 20:
        return (
          <View>
            <Text>paymentStatus.onOrder</Text>
          </View>
        );
      case 21:
        return (
          <View>
            <Text>paymentStatus.orderConfirmed</Text>
          </View>
        );
      case 30:
        return (
          <View>
            <Text>paymentStatus.packing</Text>
          </View>
        );
      case 31:
        return (
          <View>
            <Text>paymentStatus.deliver</Text>
          </View>
        );
      case 32:
        return (
          <View>
            <Text>paymentStatus.arrived</Text>
          </View>
        );
      default:
        return (
          <View>
            <Text>paymentStatus.finish</Text>
          </View>
        );
    }
  };

  _renderButton = (type, data) => {
    const { toCheckout } = this.props;
    switch (parseInt(type)) {
      case 10:
      case 14:
      case 15:
        return (
          <View style={{ marginTop: 50 }}>
            <Button
              title="cart.button.selectPayment"
              onPress={() => toCheckout(data)}
            />
          </View>
        );
      default:
        return (
          <TouchableOpacity
            style={styles.button}
            onPress={() => toCheckout(data)}>
            <Text style={styles.textButton}>cart.button.seeDetail</Text>
          </TouchableOpacity>
        );
    }
  };

  _renderEmptyState = () => {
    const { goBack } = this.props;
    return (
      <View style={styles.containerEmpty}>
        <Text>cart.empty.title</Text>
        <Text>cart.empty.subtitle</Text>
        <Button title="cart.empty.button" onPress={goBack} />
        <View style={{ height: 50 }}></View>
      </View>
    );
  };

  render() {
    const { listRoom } = this.props;
    const isEmpty = _.isEmpty(listRoom);
    const content = isEmpty
      ? this._renderEmptyState()
      : this._renderProductItem();
    return (
      <ScrollView
        style={{ flex: 1 }}
        scrollEnabled={!isEmpty}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <NavigationHeader />
          <Text h2 style={styles.title}>
            cart.title
          </Text>
          {content}
        </View>
      </ScrollView>
    );
  }
}

CartView.defaultProps = {
  listRoom: [],
  goBack: () => {},
  toCheckout: () => {},
};

CartView.propTypes = {
  goBack: PropTypes.func,
  listRoom: PropTypes.array,
  toCheckout: PropTypes.func,
};

export default CartView;
