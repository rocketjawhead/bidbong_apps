/* eslint-disable import/no-cycle */
import {
  React,
  View,
  SafeAreaView,
  TouchableOpacity,
  PropTypes,
} from 'libraries';
import { Text, Image, Input } from 'components';
import { NavigationHeader, Button } from 'components/molecules';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import _ from 'lodash';
import styles from './styles';

class PaymentView extends React.Component {
  _renderImageVisa = isVisa => {
    if (isVisa) return <Image contentIcon source="ic-visa" imgWidth={30} />;
    return (
      <Image
        contentIcon
        source="ic-visa"
        imgWidth={30}
        style={{ tintColor: 'grey' }}
      />
    );
  };

  _renderImageMC = isMC => {
    if (isMC) return <Image contentIcon source="ic-mastercard" imgWidth={60} />;

    return (
      <Image
        contentIcon
        source="ic-mastercard"
        imgWidth={60}
        style={{ tintColor: 'grey' }}
      />
    );
  };

  render() {
    const {
      cvv,
      card,
      expYear,
      expMonth,
      paymentType,
      onChangeText,
      onEndEditingYear,
      onEndEditingMonth,
      handlerSetPayment,
    } = this.props;
    const isEmpty = _.isEmpty(paymentType);
    const isVisa = card.substring(0, 1) === '4';
    const perfixMC = card.substring(0, 2);
    const isMC = parseInt(perfixMC) >= 51 && parseInt(perfixMC) <= 55;

    const isDisabled =
      card.length < 10 || expYear.length < 3 || !expMonth || cvv.length < 2;

    return (
      <SafeAreaView style={styles.background}>
        <View style={styles.container.main}>
          <NavigationHeader />
          <Text h2 style={styles.text.title}>
            payment.title
          </Text>
          <View>
            <Text bold translate={false}>
              Card No.
            </Text>
            <Input
              noBorder
              keyboardType="numeric"
              translatePlaceholder={false}
              containerStyle={{
                padding: 12,
                borderWidth: 1,
                borderRadius: 10,
                height: 50,
                justifyContent: 'center',
                borderColor: 'grey',
              }}
              value={card}
              maxLength={20}
              onChangeText={onChangeText}
              type="card"
            />
            <View style={styles.content.imgBank}>
              {this._renderImageVisa(isVisa)}
              {this._renderImageMC(isMC)}
            </View>
          </View>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, marginRight: 12 }}>
                <Text bold translate={false}>
                  Expiry Month
                </Text>
                <Input
                  value={expMonth}
                  onEndEditing={onEndEditingMonth}
                  keyboardType="numeric"
                  onChangeText={onChangeText}
                  noBorder
                  maxLength={2}
                  translatePlaceholder={false}
                  containerStyle={{
                    padding: 12,
                    height: 50,
                    borderWidth: 1,
                    borderRadius: 10,
                    justifyContent: 'center',
                    borderColor: 'grey',
                  }}
                  type="month"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text bold translate={false}>
                  Expiry Year
                </Text>
                <Input
                  type="year"
                  maxLength={4}
                  onChangeText={onChangeText}
                  value={expYear}
                  keyboardType="numeric"
                  noBorder
                  onEndEditing={onEndEditingYear}
                  translatePlaceholder={false}
                  containerStyle={{
                    padding: 12,
                    height: 50,
                    borderWidth: 1,
                    borderRadius: 10,
                    justifyContent: 'center',
                    borderColor: 'grey',
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{ marginTop: 12 }}>
            <Text bold translate={false}>
              CVV No.
            </Text>
            <Input
              value={cvv}
              noBorder
              onChangeText={onChangeText}
              type="cvv"
              keyboardType="numeric"
              translatePlaceholder={false}
              containerStyle={{
                padding: 12,
                borderWidth: 1,
                borderRadius: 10,
                height: 50,
                justifyContent: 'center',
                borderColor: 'grey',
              }}
              maxLength={20}
            />
          </View>
        </View>

        <View style={styles.container.button}>
          <Button
            title="payment.button"
            containerStyle={styles.container.button}
            disabled={isDisabled}
            onPress={handlerSetPayment}
          />
        </View>
      </SafeAreaView>
    );
  }
}

PaymentView.defaultProps = {
  cvv: '',
  card: '',
  expYear: '',
  expMonth: '',
  paymentType: '',
  onChangeText: () => {},
  handlerSetPayment: () => {},
  onEndEditingYear: () => {},
  onEndEditingMonth: () => {},
  handlerSelectPayment: () => {},
};

PaymentView.propTypes = {
  cvv: PropTypes.string,
  card: PropTypes.string,
  expYear: PropTypes.string,
  expMonth: PropTypes.string,
  paymentType: PropTypes.string,
  onChangeText: PropTypes.func,
  onEndEditingYear: PropTypes.func,
  onEndEditingMonth: PropTypes.func,
  handlerSetPayment: PropTypes.func,
  handlerSelectPayment: PropTypes.func,
};

export default PaymentView;
