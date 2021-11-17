/* eslint-disable camelcase */
import { React, PropTypes } from 'libraries';
import {
  CheckoutView,
  ModalListShipping,
  DetailTrxView,
  ModalWebView,
} from 'components';
import {
  setPopUp,
  getCartRoom,
  postPayment,
  getShippingUser,
  setSehipping,
  checkoutProduct,
} from 'config';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Fragment } from 'react';
import Loading from '../Loading';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      form: {
        firstname: 'alfan',
        lastname: 'hibban',
        email: 'alfanhib@gmail.com',
        phoneNumber: '081335671179',
        address: 'sawojajar',
        city: 'malang',
        zipPostCode: '65139',
        country: 'US',
        state: 'east java',
      },
      modalWebView: false,
      validation: {
        firstname: false,
        lastname: false,
        email: false,
        phoneNumber: false,
        address: false,
        city: false,
        zipPostCode: false,
        country: false,
        state: false,
      },
      detailRoom: {},
    };
  }

  async componentDidMount() {
    const { reqGetCartRoom, reqGetShipping } = this.props;
    const { getDetailRoom } = this;
    await reqGetCartRoom();
    await reqGetShipping();
    getDetailRoom();
  }

  /**
   * @name getDetailRoom
   * @description for getting all data about product and room
   */
  getDetailRoom = () => {
    const { idRoom, room } = this.props;
    const dataRoom = room.filter(x => x.id === idRoom);
    this.setState({ detailRoom: dataRoom[0] });
  };

  /**
   * function for change text on form
   * @param {} value
   * @param {*} type
   */
  onChangeText = (value, type) => {
    const { form } = { ...this.state };
    form[type] = value;
    return this.setState({ form });
  };

  /**
   * handler showing modal
   */
  handlerModal = () => {
    const { visible } = this.state;
    this.setState({ visible: !visible });
  };

  /**
   * for set selected shipping
   * @param {} data
   */
  handlerChooseShipping = data => {
    const { reqSetSehipping, listShipping } = this.props;
    reqSetSehipping(listShipping[data]);
    return this.setState({ visible: false });
  };

  /**
   * navigation to payment list
   */
  toPaymentList = () => {
    const { navigation } = this.props;
    navigation.navigate('PAYMENT');
  };

  /**
   * function for request send data checkout to backend
   */
  handlerCheckout = async () => {
    const { form } = this.state;

    const {
      shipping,
      paymentType,
      reqSetPopup,
      reqPostPayment,
      reqCheckoutProduct,
      reqGetCartRoom,
    } = this.props;

    const { detailRoom } = this.state;

    const {
      firstname,
      lastname,
      email,
      phoneNumber,
      address,
      city,
      zipPostCode,
      state,
    } = form;
    const totalPrice = detailRoom.winner_price + shipping.price;
    const payload = {
      body: {
        id: detailRoom.winner[0].id,
        productId: detailRoom.Product.id,
        storeId: detailRoom.id,
        shippingType: shipping.id,
        firstName: firstname,
        lastname,
        email,
        phoneNumber,
        address,
        city,
        state,
        zipPostCode,
        country: shipping.shippingCode,
        amount: totalPrice,
        buyerId: detailRoom.winner[0].buyerId,
        paymentStatus: '',
        paymentDate: '',
        currency: 'EUR',
        card_type: '1',
        card_no: paymentType.cardNo,
        ccExpiryMonth: paymentType.expMonth,
        ccExpiryYear: paymentType.expYear,
        cvvNumber: paymentType.cvv,
      },
    };
    const res = await reqCheckoutProduct(payload);
    if (res.success) {
      const { id } = detailRoom.winner[0];
      const payloadPayment = {
        body: {
          id,
          ...payload.body,
        },
      };
      try {
        const response = await reqPostPayment(payloadPayment);
        if (response.success) {
          if (response.result.status === '3d_redirect') {
            return this.setState({
              modalWebView: true,
              url3ds: response.result.redirect_3ds_url,
            });
          }
          await reqGetCartRoom();
        }

        return reqSetPopup({
          title: 'checkout.modal.title.paymentSuccess',
          desc: 'checkout.modal.desc.paymentSuccess',
          isShow: true,
          leftButtonTitle: 'popup.button.ok',
        });
      } catch (error) {
        return reqSetPopup({
          title: 'popup.title.default',
          translate: false,
          desc: error.error,
          isShow: true,
          leftButtonTitle: 'popup.button.ok',
        });
      }
    }
  };

  /**
   * @name navigationStateChangeHandler
   * @description handle webview navigation
   */
  navigationStateChangeHandler = async e => {
    const { reqSetPopup, reqGetCartRoom } = this.props;
    await reqGetCartRoom();
    if (e.url.indexOf('success') !== -1) {
      this.setState({ modalWebView: false });
      return reqSetPopup({
        title: 'checkout.modal.title.paymentSuccess',
        desc: 'checkout.modal.desc.paymentSuccess',
        isShow: true,
        leftButtonTitle: 'popup.button.ok',
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
   * rendering page
   */
  render() {
    const {
      form,
      validation,
      visible,
      modalWebView,
      url3ds,
      detailRoom,
    } = this.state;
    const {
      firstname,
      lastname,
      email,
      phoneNumber,
      address,
      city,
      zipPostCode,
      country,
      state,
    } = form;

    const {
      onChangeText,
      handlerModal,
      handlerChooseShipping,
      toPaymentList,
      handlerCheckout,
      navigationStateChangeHandler,
    } = this;
    const { listShipping, shipping, paymentType } = this.props;

    if (_.isEmpty(detailRoom)) return <Loading />;

    if (
      detailRoom.latest_status_code < 11 ||
      detailRoom.latest_status_code === 14 ||
      detailRoom.latest_status_code === 15
    )
      return (
        <Fragment>
          <CheckoutView
            paymentType={paymentType}
            toPaymentList={toPaymentList}
            shipping={shipping}
            detailRoom={detailRoom}
            valueFirtsname={firstname}
            valueLastname={lastname}
            valueEmail={email}
            valuePhone={phoneNumber}
            valueAddress={address}
            valuecity={city}
            valuePostCode={zipPostCode}
            valueCountry={country}
            valueState={state}
            onChangeText={onChangeText}
            handlerModal={handlerModal}
            handlerCheckout={handlerCheckout}
            validationFirstname={validation.firstname}
            validationLastname={validation.lastname}
            validationEmail={validation.email}
            validationPhone={validation.phone}
            validationAddress={validation.address}
            validationCity={validation.city}
            validationZipcode={validation.zipPostCode}
            validationState={validation.state}
            validationCountry={validation.country}
          />
          <ModalListShipping
            visible={visible}
            onPress={handlerChooseShipping}
            reqClose={handlerModal}
            listShipping={listShipping}
          />
          <ModalWebView
            visible={modalWebView}
            url={url3ds}
            navigationStateChangeHandler={navigationStateChangeHandler}
          />
          {/* <modalWebView /> */}
        </Fragment>
      );

    return <DetailTrxView detailTrx={detailRoom} />;
  }
}

Checkout.defaultProps = {
  room: [],
  idRoom: 0,
  shipping: {},
  detailRoom: {},
  paymentType: '',
  listShipping: [],
  reqSetPopup: () => {},
  reqPostPayment: () => {},
  reqGetCartRoom: () => {},
  reqGetShipping: () => {},
  reqSetSehipping: () => {},
  reqCheckoutProduct: () => {},
};

Checkout.propTypes = {
  room: PropTypes.array,
  idRoom: PropTypes.string,
  shipping: PropTypes.object,
  detailRoom: PropTypes.object,
  reqSetPopup: PropTypes.func,
  paymentType: PropTypes.string,
  listShipping: PropTypes.array,
  reqPostPayment: PropTypes.func,
  reqGetCartRoom: PropTypes.funct,
  reqGetShipping: PropTypes.func,
  reqSetSehipping: PropTypes.func,
  reqCheckoutProduct: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  room: state.cart.room,
  idRoom: props.route.params.data.id,
  userBid: state.profile.userBid,
  shipping: state.cart.shipping,
  detailRoom: props.route.params.data,
  paymentType: state.cart.paymentType,
  listShipping: state.shipping.shippingList,
});

const mapDispatchToProps = dispatch => ({
  reqSetPopup: p => dispatch(setPopUp(p)),
  reqGetCartRoom: () => dispatch(getCartRoom()),
  reqPostPayment: p => dispatch(postPayment(p)),
  reqGetShipping: p => dispatch(getShippingUser(p)),
  reqSetSehipping: p => dispatch(setSehipping(p)),
  reqCheckoutProduct: p => dispatch(checkoutProduct(p)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
