import { React, PropTypes } from 'libraries';
import { CartView, DetailTrxView } from 'components';
import { getCartRoom } from 'config';
import { connect } from 'react-redux';

class Cart extends React.Component {
  componentDidMount() {
    const { reqGetCartRoom } = this.props;
    reqGetCartRoom();
  }

  /**
   * navigation to checkout page
   * @param {} data
   */
  toCheckout = data => {
    const { navigation } = this.props;
    navigation.navigate('CHECKOUT', { data });
  };

  /**
   * navigation to previous page
   */
  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  /**
   * rendering page
   */
  render() {
    const { room } = this.props;
    const { toCheckout, goBack } = this;
    return <CartView listRoom={room} toCheckout={toCheckout} goBack={goBack} />;
  }
}

Cart.defaultProps = {
  room: [],
  reqGetCartRoom: () => {},
};

Cart.propTypes = {
  room: PropTypes.array,
  reqGetCartRoom: PropTypes.funct,
};

const mapStateToProps = state => ({
  room: state.cart.room,
  paymentType: state.cart.paymentType,
});

const mapDispatchToProps = dispatch => ({
  reqGetCartRoom: () => dispatch(getCartRoom()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
