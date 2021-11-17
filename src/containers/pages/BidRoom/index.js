import { React, Fragment, PropTypes } from 'libraries';
import { connect } from 'react-redux';
import { getDetailRoom, postBidding, changeModalLoading } from 'config';
import _ from 'lodash';
import moment from 'moment';
import { CommonActions } from '@react-navigation/native';
import { HeaderBidRoom, CardBidRoom, ModalPlaceBid } from 'components';
import { config } from 'config/API/url';
import SocketIOClient from 'socket.io-client';

class BidRoom extends React.Component {
  interval = null;

  constructor(props) {
    super(props);
    this.state = {
      isOpenModalBid: false,
      days: '',
      hours: '',
      minutes: '',
      seconds: '',
      price: 0,
      idPrice: 0,
      listImage: [],
      listBidder: [],
      currentPrice: 0,
    };
    this.socket = SocketIOClient(config.url.api); // replace 'environment.serverUrl' with your server url

    this.socket.on('updateStatusBiddingAdmin', () => {
      this.handlerGetDetailRoom();
    });

    this.socket.on('setwinner', async () => {
      this.handlerGetDetailRoom();
    });
    this.socket.on('userupdatebid', () => {
      this.handlerGetDetailRoom();
    });
    this.socket.on('usermakebid', () => {
      this.handlerGetDetailRoom();
    });
  }

  async componentDidMount() {
    const {
      handlerGetDetailRoom,
      countdown,
      handlerSetListImage,
      handlerCheckWinner,
    } = this;
    await handlerGetDetailRoom();
    await handlerCheckWinner();
    handlerSetListImage();
    countdown();
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  /**
   * for clear timer
   */
  clearTimer = () => {
    clearInterval(this.interval);
    this.interval = null;
  };

  /**
   * for set list image to state
   */
  handlerSetListImage = () => {
    const { detailRoom } = this.props;
    const { listImage } = this.state;
    const listState = [...listImage];
    const listImageA = detailRoom.Product.productImages;
    const url = config.url.api;
    // listImageA.map((x, i) => listState.push(`${url}${x.data}`));
    listImageA.map((x, i) => listState.push(`${x.prductImgName}`));
    this.setState({ listImage: listState });
  };

  /**
   * handler for sorting bidder
   */
  handlerListBidder = () => {
    const { detailRoom } = this.props;
    const { bidder } = detailRoom;
    const currentPrice = bidder[0].bidder
      ? bidder[0].bidder
      : detailRoom.product_price;
    const fixList = detailRoom.listBidders.sort(
      this.sortingBidder('nominal', 'desc'),
    );
    this.setState({ listBidder: fixList, currentPrice });
  };

  /**
   * handler for checing if room have a winner
   */
  handlerCheckWinner = async () => {
    const { detailRoom, navigation } = this.props;
    if (detailRoom.userWinner) {
      return navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'STATUSBID', params: { data: detailRoom } }],
        }),
      );
    }
    return null;
  };

  /**
   * sorting bidder from highest bidding
   * @param {} property
   * @param {*} order
   */
  sortingBidder = (property, order) => {
    let sortOrder = 1;
    if (order === 'desc') {
      sortOrder = -1;
    }
    return function(a, b) {
      // a should come before b in the sorted order
      if (a[property] < b[property]) {
        return -1 * sortOrder;
        // a should come after b in the sorted order
      }
      if (a[property] > b[property]) {
        return 1 * sortOrder;
        // a and b are the same
      }
      return 0 * sortOrder;
    };
  };

  /**
   * for getting detail room to be
   */
  handlerGetDetailRoom = async () => {
    const { reqGetDetailRoom, roomId } = this.props;
    const { handlerListBidder } = this;
    const payload = {
      url: roomId,
    };
    await reqGetDetailRoom(payload);
    handlerListBidder();
  };

  /**
   * handing for showing modal
   */
  handleShowModalBid = () => {
    const { isOpenModalBid } = this.state;
    this.setState({ isOpenModalBid: !isOpenModalBid });
  };

  /**
   * onChange price
   * @param {*} v
   * @param {*} type
   * @param {*} idPrice
   */
  onChangePrice = (v, type = 'input', idPrice) => {
    const { detailRoom } = this.props;
    if (type === 'button') {
      const { currentPrice } = this.state;
      const fixPrice = `${(currentPrice + v).toString()}€`;
      return this.setState({ price: fixPrice, idPrice });
    }
    const value = v.toString().replace(/\D/g, '');
    return this.setState({ price: value });
  };

  /**
   * for validation price
   */
  validationPrice = () => {
    const { price } = this.state;
    const { detailRoom } = this.props;
    const currentPrice =
      detailRoom.bidder[0].bidder === null
        ? detailRoom.Product.price
        : parseInt(detailRoom.bidder[0].bidder);
    if (currentPrice > price) {
      return this.setState({ price: `${currentPrice + 1}€` });
    }
    return this.setState({ price: `${price}€` });
  };

  /**
   * funtion for request place bidding
   */
  handlerPlaceBid = async () => {
    const { detailRoom, reqPostBidding, userBid } = this.props;
    const { price } = this.state;
    const { handlerGetDetailRoom } = this;
    const dataUser = detailRoom.listBidders.filter(
      x => x.buyerId === userBid.buyerId,
    );
    const payload = {
      body: {
        id: dataUser[0].id,
        productId: detailRoom.Product.id,
        storeId: detailRoom.id,
        nominal: parseFloat(price.replace(/€/g, '')),
      },
    };
    try {
      await reqPostBidding(payload);
      await handlerGetDetailRoom();
      this.setState({ isOpenModalBid: false });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * function for setting timmer
   */
  countdown = () => {
    const { detailRoom } = this.props;
    this.interval = setInterval(() => {
      const date1 = moment()
        .utc('+0200')
        .format('x');
      const date2 = new Date(detailRoom.endBid);
      const difference1 = date2.getTime() - date1;
      return this.setState({
        days: moment.duration(difference1).get('days'),
        hours: moment.duration(difference1).get('hours'),
        minutes: moment.duration(difference1).get('minutes'),
        seconds: moment.duration(difference1).get('seconds'),
      });
    }, 1000);
  };

  /**
   * rendering page
   */
  render() {
    const {
      isOpenModalBid,
      days,
      hours,
      minutes,
      seconds,
      price,
      idPrice,
      listBidder,
      listImage,
      currentPrice,
    } = this.state;
    const {
      handleShowModalBid,
      onChangePrice,
      validationPrice,
      handlerPlaceBid,
    } = this;
    const { detailRoom } = this.props;
    return (
      <Fragment>
        <HeaderBidRoom detailRoom={detailRoom} listImage={listImage} />
        <CardBidRoom
          isOpen={isOpenModalBid}
          detailRoom={detailRoom}
          handleShowModal={handleShowModalBid}
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          listBidder={listBidder}
          currentPrice={currentPrice}
        />
        <ModalPlaceBid
          detailRoom={detailRoom}
          isOpen={isOpenModalBid}
          onPress={handleShowModalBid}
          onChangePrice={onChangePrice}
          price={price}
          idPrice={idPrice}
          validationPrice={validationPrice}
          handlerPlaceBid={handlerPlaceBid}
          currentPrice={currentPrice}
        />
      </Fragment>
    );
  }
}

BidRoom.defaultProps = {
  roomId: 0,
  userBid: {},
  detailRoom: {},
  reqPostBidding: () => {},
  reqGetDetailRoom: () => {},
};

BidRoom.propTypes = {
  roomId: PropTypes.number,
  userBid: PropTypes.object,
  detailRoom: PropTypes.object,
  reqPostBidding: PropTypes.func,
  reqGetDetailRoom: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  roomId: props.route.params.id,
  userBid: state.profile.userBid,
  detailRoom: state.room.detailRoom,
});

const mapDispatchToProps = dispatch => ({
  reqPostBidding: p => dispatch(postBidding(p)),
  reqGetDetailRoom: p => dispatch(getDetailRoom(p)),
  reqChangeModalLoading: p => dispatch(changeModalLoading(p)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BidRoom);
