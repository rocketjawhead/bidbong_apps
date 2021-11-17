import { React, View, PropTypes } from 'libraries';
import { Button, NavigationHeader } from 'components';
import { connect } from 'react-redux';
import { setPaymentType } from 'config';
import { CreditCardInput } from 'react-native-credit-card-input';
import styles from './styles';

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNo: '',
      expMonth: '',
      expYear: '',
      cvv: '',
      valid: false,
    };
  }

  componentDidMount() {
    const { paymentType } = this.props;
    const { cardNo, expMonth, expYear, cvv } = paymentType;
    this.setState({ cardNo, expMonth, expYear, cvv });
  }

  /**
   * for set selected payment
   */
  handlerSetPayment = () => {
    const { reqSetPaymentType, navigation } = this.props;
    const { cardNo, expMonth, expYear, cvv } = this.state;
    const data = { cardNo, expMonth, expYear, cvv };
    reqSetPaymentType(data);
    return navigation.goBack();
  };

  /**
   * for change form
   * @param {} v
   */
  onChangeText = v => {
    const { valid, values } = v;
    const { number, expiry, cvc } = values;
    const expMonth = expiry?.split('/')[0] || '';
    const expYear = expiry?.split('/')[1] || '';
    this.setState({
      cardNo: number.replace(/ /g, ''),
      expMonth,
      expYear: `20${expYear}`,
      cvv: cvc,
      valid,
    });
  };

  render() {
    const { handlerSetPayment } = this;
    const { valid } = this.state;
    return (
      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          <View style={{ margin: 24 }}>
            <NavigationHeader />
          </View>
          <View style={{ marginTop: 24 }}>
            <CreditCardInput onChange={this.onChangeText} />
          </View>
        </View>
        <View style={{ justifyContent: 'flex-end', margin: 24 }}>
          <Button
            title="payment.button"
            onPress={handlerSetPayment}
            disabled={!valid}
          />
        </View>
      </View>
    );
  }
}

Payment.defaultProps = {
  paymentType: '',
  reqSetPaymentType: () => {},
};

Payment.propTypes = {
  paymentType: PropTypes.string,
  reqSetPaymentType: PropTypes.func,
};

const mapStateToProps = state => ({
  paymentType: state.cart.paymentType,
});

const mapDispatchToProps = dispatch => ({
  reqSetPaymentType: p => dispatch(setPaymentType(p)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
