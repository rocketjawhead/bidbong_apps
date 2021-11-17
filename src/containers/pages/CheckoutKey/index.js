import { React, PropTypes, View } from 'libraries';
import { CheckoutKeyView, ModalWebView, Button } from 'components';
import { connect } from 'react-redux';
import { METRICS } from 'utils';
import { postBuyKey, setClearKey, paymentKey, setPopUp } from 'config';

class CheckoutKey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalWebView: false,
      url3ds: '',
    };
  }

  /**
   * function for request buy key
   */
  handlerBuyKey = async () => {
    const {
      reqPostBuyKey,
      navigation,
      reqSetClearKey,
      cartKey,
      reqSetPopup,
      paymentType,
      reqPaymentKey,
    } = this.props;
    const payload = {
      body: cartKey,
    };
    const res = await reqPostBuyKey(payload);
    if (res.success) {
      const data = {
        body: {
          currency: 'EUR',
          card_type: '1',
          card_no: paymentType.cardNo,
          ccExpiryMonth: paymentType.expMonth,
          ccExpiryYear: paymentType.expYear,
          cvvNumber: paymentType.cvv,
        },
      };
      try {
        const response = await reqPaymentKey(data);
        if (response.success) {
          reqSetClearKey();
          if (response.result.status === '3d_redirect') {
            return this.setState({
              modalWebView: true,
              url3ds: response.result.redirect_3ds_url,
            });
          }
          return navigation.reset({
            index: 0,
            routes: [{ name: 'MAINMENU' }],
          });
        }
        if (response.error) {
          return reqSetPopup({
            title: 'popup.title.default',
            translate: false,
            desc: response.error,
            isShow: true,
            leftButtonTitle: 'popup.button.ok',
          });
        }
        return reqSetPopup({
          title: 'popup.title.default',
          desc: 'popup.desc.default',
          isShow: true,
          leftButtonTitle: 'popup.button.ok',
        });
      } catch (error) {
        if (error.error) {
          return reqSetPopup({
            title: 'popup.title.default',
            translate: false,
            desc: error.error,
            isShow: true,
            leftButtonTitle: 'popup.button.ok',
          });
        }
        return reqSetPopup({
          title: 'popup.title.default',
          desc: 'popup.desc.default',
          isShow: true,
          leftButtonTitle: 'popup.button.ok',
        });
      }
    }
  };

  /**
   * navigation to payment list
   */
  toPaymentList = () => {
    const { navigation, profile, reqSetPopup } = this.props;
    const { toProfile } = this;
    const { address, city, state, country, zipPostCode } = profile;
    if (address && city && state && country && zipPostCode)
      return navigation.navigate('PAYMENT');

    return reqSetPopup({
      title: 'popup.title.default',
      desc:
        'to continue the payment please fill in your address data on the profile first',
      isShow: true,
      translate: false,
      leftButtonTitle: 'popup.button.toProfile',
      onPressLeft: this.toProfile(),
    });
  };

  /**
   * @name navigationStateChangeHandler
   * @description handle webview navigation
   */
  navigationStateChangeHandler = async e => {
    const { reqSetPopup, reqSetClearKey, navigation } = this.props;
    if (e.url.indexOf('success') !== -1) {
      reqSetClearKey();
      this.setState({ modalWebView: false });
      reqSetPopup({
        title: 'checkout.modal.title.paymentSuccess',
        desc: 'checkout.modal.desc.paymentKeySuccess',
        isShow: true,
        leftButtonTitle: 'popup.button.toProfile',
      });
      return navigation.reset({
        index: 0,
        routes: [{ name: 'MAINMENU' }],
      });
    }

    if (e.url.indexOf('fail') !== -1) {
      this.setState({ modalWebView: false });
      if (e.url.indexOf('Insufficient')) {
        return reqSetPopup({
          title: 'popup.title.default',
          translate: false,
          desc: 'You dont have enough money',
          isShow: true,
          leftButtonTitle: 'popup.button.ok',
        });
      }
      return reqSetPopup({
        title: 'popup.title.default',
        translate: false,
        desc: 'Payment faield please try again',
        isShow: true,
        leftButtonTitle: 'popup.button.ok',
      });
    }
  };

  /**
   * navigation to profile
   */
  toProfile = () => {
    const { navigation } = this.props;
    navigation.navigate('EDITPROFILE');
  };

  /**
   * rendering page
   */
  render() {
    const { cartKey, paymentType, profile } = this.props;
    const { toPaymentList, handlerBuyKey, navigationStateChangeHandler } = this;
    const { modalWebView, url3ds } = this.state;
    return (
      <React.Fragment>
        <CheckoutKeyView
          listKey={cartKey}
          toPaymentList={toPaymentList}
          paymentType={paymentType}
          handlerBuyKey={handlerBuyKey}
        />
        <ModalWebView
          visible={modalWebView}
          url={url3ds}
          navigationStateChangeHandler={navigationStateChangeHandler}
        />
      </React.Fragment>
    );
  }
}

CheckoutKey.defaultProp = {
  cartKey: [],
  profile: {},
  paymentType: '',
  reqPostBuyKey: () => {},
  reqSetClearKey: () => {},
  reqSetPopup: () => {},
  reqPaymentKey: () => {},
};

CheckoutKey.propTypes = {
  profile: PropTypes.object,
  cartKey: PropTypes.array,
  paymentType: PropTypes.object,
  reqSetPopup: PropTypes.func,
  reqPostBuyKey: PropTypes.func,
  reqPaymentKey: PropTypes.func,
  reqSetClearKey: PropTypes.func,
};

const mapStateToProps = state => ({
  cartKey: state.cart.key,
  profile: state.auth.profile,
  paymentType: state.cart.paymentType,
});

const mapDispatchToProps = dispatch => ({
  reqPostBuyKey: p => dispatch(postBuyKey(p)),
  reqSetPopup: p => dispatch(setPopUp(p)),
  reqSetClearKey: () => dispatch(setClearKey()),
  reqPaymentKey: p => dispatch(paymentKey(p)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutKey);
