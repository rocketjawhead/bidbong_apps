import { React, View, ScrollView, Animated, PropTypes } from 'libraries';
import {
  Image,
  NavigationHeader,
  CardReservation,
  Text,
  NavigationBar,
  ModalListBidder,
  ModalDescProduct,
} from 'components';
import { connect } from 'react-redux';
import {
  getUserBid,
  postReservation,
  setUserBid,
  changeModalLoading,
  clearListRoom,
  getLiveRoom,
  getWaitingRoom,
  getDetailRoom,
  setLeaveRoom,
} from 'config';
import _ from 'lodash';
import moment from 'moment';
import { Fragment } from 'react';
import { METRICS } from 'utils';
import SocketIOClient from 'socket.io-client';
import { config } from 'config/API/url';
import styles from './styles';

const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 0;
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.scrollYAnimatedValue = new Animated.Value(0);
    this.state = {
      descVisible: false,
      bidderVisible: false,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      statusRoom: '',
    };
    this.socket = SocketIOClient(config.url.api); // replace 'environment.serverUrl' with your server url

    this.socket.on('usermakebid', () => {
      this.getDetailRoom();
    });
  }

  async componentDidMount() {
    await this.getDetailRoom();
    this.getDiff();
    this.getBanner();
    this.getStatusRoom();
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  /**
   * clear timer
   */
  clearTimer = () => {
    clearInterval(this.interval);
    this.interval = null;
  };

  /**
   * for get detail room to BE
   */
  getDetailRoom = async () => {
    const { reqGetDetailRoom, roomId } = this.props;
    const payload = {
      url: roomId,
    };
    await reqGetDetailRoom(payload);
  };

  /**
   * get different time from now
   */
  getDiff = () => {
    const { detailRoom } = this.props;
    this.interval = setInterval(() => {
      const date1 = moment()
        .utc('+0200')
        .format('x');
      const date2 = moment(detailRoom.startBid)
        .utc('+0200')
        .format('x');
      const difference1 = date2 - date1;
      return this.setState({
        days: moment.duration(difference1).get('days'),
        hours: moment.duration(difference1).get('hours'),
        minutes: moment.duration(difference1).get('minutes'),
        seconds: moment.duration(difference1).get('seconds'),
      });
    }, 1000);
  };

  /**
   * for getting status room
   */
  getStatusRoom = () => {
    const { userBid, detailRoom, profile } = this.props;
    // const isLockRoom = !_.isEmpty(userBid) && detailRoom.id !== userBid.storeId;
    const alreadyBook = detailRoom.listBidders.filter(
      x => x.buyerId === profile.id,
    );
    // if (isLockRoom) return this.setState({statusRoom: 'lock'});
    if (!_.isEmpty(alreadyBook)) return this.setState({ statusRoom: 'booked' });
    return null;
  };

  /**
   * function for request reservation room
   */
  handlerReservation = async () => {
    const {
      detailRoom,
      reqGetUserBid,
      reqSetUserBid,
      reqGetLiveRoom,
      reqClearListRoom,
      reqGetWaitingRoom,
      reqPostReservation,
      reqChangeModalLoading,
    } = this.props;
    const payload = {
      body: {
        productId: detailRoom.productId,
        storeId: detailRoom.id,
      },
    };
    const res = await reqPostReservation(payload);
    if (res.success)
      return this.setState(
        { statusRoom: 'booked', bidderVisible: false },
        async () => {
          reqChangeModalLoading(true);
          reqSetUserBid(res.data);
          await reqGetLiveRoom();
          await reqClearListRoom();
          await reqGetWaitingRoom();
          await reqGetUserBid();
          reqChangeModalLoading(false);
        },
      );
  };

  // HANDLER TO SHOW AND HIDE MODAL
  handlerShowModalDesc = () => {
    const { descVisible } = this.state;
    this.setState({ descVisible: !descVisible });
  };

  /**
   * handing show modal list bidder
   */
  handlerShowModalBidder = () => {
    const { bidderVisible } = this.state;
    this.setState({ bidderVisible: !bidderVisible });
  };

  /**
   * get image banner
   */
  getBanner = () => {
    const { detailRoom } = this.props;
    const x = parseInt(detailRoom.allowKey);
    switch (x) {
      case 1:
        return 'img-banner-wood-door';
      case 2:
        return 'img-banner-silver-door';
      case 3:
        return 'img-banner-gold-door';
      default:
        return 'img-banner-diamond-door';
    }
  };

  /**
   * get type room
   */
  getTitle = () => {
    const { detailRoom } = this.props;
    const x = parseInt(detailRoom.allowKey);
    switch (x) {
      case 1:
        return 'component.door.wood';
      case 2:
        return 'component.door.silver';
      case 3:
        return 'component.door.gold';
      default:
        return 'component.door.diamond';
    }
  };

  /**
   * function for leave room
   */
  handlerLeaveRoom = async () => {
    const {
      profile,
      detailRoom,
      reqLeaveRoom,
      reqGetUserBid,
      reqGetLiveRoom,
      reqClearListRoom,
      reqGetWaitingRoom,
      reqChangeModalLoading,
    } = this.props;
    const data = detailRoom.listBidders.filter(x => x.buyerId === profile.id);
    const payload = {
      body: {
        id: data[0].id,
      },
    };
    const res = await reqLeaveRoom(payload);
    if (res.success)
      return this.setState(
        { statusRoom: '', bidderVisible: false },
        async () => {
          reqChangeModalLoading(true);
          await reqGetLiveRoom();
          await reqClearListRoom();
          await reqGetWaitingRoom();
          await reqGetUserBid();
          reqChangeModalLoading(false);
        },
      );
  };

  render() {
    const headerHeight = this.scrollYAnimatedValue.interpolate({
      inputRange: [0, 15],
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

    const { descVisible, bidderVisible } = this.state;

    const {
      getTitle,
      getBanner,
      handlerLeaveRoom,
      handlerReservation,
      handlerShowModalDesc,
      handlerShowModalBidder,
    } = this;

    const { detailRoom } = this.props;
    const { days, hours, minutes, seconds, statusRoom } = this.state;
    return (
      <View>
        <ScrollView
          contentContainerStyle={{
            paddingTop: HEADER_MAX_HEIGHT,
          }}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } },
            },
          ])}>
          <View style={{ flex: 1 }}>
            <Image
              source={getBanner()}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.container.header}>
              <NavigationHeader bold title={getTitle()} />
              <View style={styles.container.countdown}>
                <Text translate={false}>
                  {`${days}d ${hours}h ${minutes}m ${seconds}s`}
                </Text>
              </View>
            </View>
            <CardReservation
              room={detailRoom}
              Product={detailRoom.Product}
              statusRoom={statusRoom}
              showModalDesc={handlerShowModalDesc}
              showModalBidder={handlerShowModalBidder}
              handlerLeaveRoom={handlerLeaveRoom}
              handlerReservation={handlerReservation}
            />
          </View>
        </ScrollView>
        <NavigationBar
          padding={padding}
          height={headerHeight}
          title="Reservation Room"
          backgroundColor={headerBackgroundColor}
        />

        {/* MODAL */}
        <ModalDescProduct
          Product={detailRoom.Product}
          visible={descVisible}
          closeModal={handlerShowModalDesc}
        />
        <ModalListBidder
          visible={bidderVisible}
          closeModal={handlerShowModalBidder}
          transaction={detailRoom.listBidders}
          onPress={handlerReservation}
          statusRoom={statusRoom}
        />
      </View>
    );
  }
}

Reservation.defaultProps = {
  roomId: 0,
  userBid: {},
  profile: {},
  detailRoom: {},
  reqLeaveRoom: () => {},
  reqGetUserBid: () => {},
  reqSetUserBid: () => {},
  reqGetLiveRoom: () => {},
  reqClearListRoom: () => {},
  reqGetDetailRoom: () => {},
  reqGetWaitingRoom: () => {},
  reqPostReservation: () => {},
  reqChangeModalLoading: () => {},
};

Reservation.propTypes = {
  roomId: PropTypes.number,
  userBid: PropTypes.object,
  profile: PropTypes.object,
  detailRoom: PropTypes.object,
  reqLeaveRoom: PropTypes.func,
  reqSetUserBid: PropTypes.func,
  reqGetUserBid: PropTypes.func,
  reqGetLiveRoom: PropTypes.func,
  reqClearListRoom: PropTypes.func,
  reqGetDetailRoom: PropTypes.func,
  reqGetWaitingRoom: PropTypes.func,
  reqPostReservation: PropTypes.func,
  reqChangeModalLoading: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  roomId: props.route.params.id,
  profile: state.auth.profile,
  userBid: state.profile.userBid,
  detailRoom: state.room.detailRoom,
});

const mapDispatchToProps = dispatch => ({
  reqLeaveRoom: p => dispatch(setLeaveRoom(p)),
  reqSetUserBid: p => dispatch(setUserBid(p)),
  reqGetUserBid: () => dispatch(getUserBid()),
  reqGetLiveRoom: () => dispatch(getLiveRoom()),
  reqGetDetailRoom: p => dispatch(getDetailRoom(p)),
  reqClearListRoom: () => dispatch(clearListRoom()),
  reqGetWaitingRoom: () => dispatch(getWaitingRoom()),
  reqPostReservation: p => dispatch(postReservation(p)),
  reqChangeModalLoading: p => dispatch(changeModalLoading(p)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Reservation);
