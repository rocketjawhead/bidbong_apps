/* eslint-disable camelcase */
/* eslint-disable import/no-cycle */
import {
  React,
  View,
  Animated,
  SafeAreaView,
  PropTypes,
  ScrollView,
  TouchableOpacity,
} from 'libraries';
import {
  Text,
  Price,
  Image,
  NavigationHeader,
  CardShipping,
  NavigationBar,
  AuctionTime,
  CardPayment,
  CardStatusOrder,
} from 'components';
import _ from 'lodash';
import { config } from 'config/API/url';
import Icon from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import styles from './styles';

const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 0;

class DetailBidRoomView extends React.Component {
  constructor(props) {
    super(props);
    this.scrollYAnimatedValue = new Animated.Value(0);
  }

  _renderButtonAction = x => {
    const { handlerShowModal, statusRoom } = this.props;
    if (statusRoom === 'live') {
      return (
        <TouchableOpacity onPress={() => handlerShowModal(x)}>
          <Image source="ic-more" contentIcon imgWidth={25} />
        </TouchableOpacity>
      );
    }
    return null;
  };

  /**
   * ====================
   * FUNCRION RENDER
   * ====================
   */
  _renderBidderList = () => {
    const { listBidder } = this.props;
    const { _renderEmptyState } = this;
    if (listBidder.length === 0) return _renderEmptyState();
    return listBidder.map((x, i) => (
      <View key={i} style={styles.wrapperBidder}>
        <View style={{ flex: 0.85 }}>
          <Text translate={false}>
            {x.User.first} {x.User.last}
          </Text>
        </View>
        <Price theme="green" amount={x.nominal ? x.nominal : 0} />
        {this._renderButtonAction(x)}
      </View>
    ));
  };

  _renderImage = () => {
    const { detailRoom } = this.props;
    const image = detailRoom.Product.productImages;
    console.log('ini image detail room')
    return image.map((x, i) => {
      const url = `${config.url.api}${x.data}`;
      return <Image source={{ uri: url }} style={styles.imgProduct} />;
    });
  };

  _renderEmptyState = () => (
    <View style={styles.container.emptyState}>
      <Image contentIcon source="ic-smile" imgWidth={32} />
      <Text style={styles.text.emptyState}>detailBidRoom.text.emptyState</Text>
    </View>
  );

  _getTypeKey = p => {
    switch (p) {
      case 1:
        return <Text h3>component.door.wood</Text>;
      case 2:
        return <Text h3>component.door.silver</Text>;
      case 3:
        return <Text h3>component.door.gold</Text>;
      case 4:
        return <Text h3>component.door.diamond</Text>;
      default:
        return null;
    }
  };

  _renderStatusRoom = () => {
    const { statusRoom } = this.props;
    switch (statusRoom) {
      case 'waiting':
        return (
          <View style={styles.content.status}>
            <Text bold style={styles.text.status('waiting')}>
              dashboard.text.status.scheduled
            </Text>
          </View>
        );
      case 'live':
        return (
          <View style={styles.content.status}>
            <Text bold style={styles.text.status('live')}>
              dashboard.text.status.open
            </Text>
          </View>
        );
      default:
        return (
          <View style={styles.content.status}>
            <Text bold style={styles.text.status('end')}>
              dashboard.text.status.finish
            </Text>
          </View>
        );
    }
  };

  _renderDetailOrder = orderStatus => {
    const {
      handlerPaymentConfirmation,
      onChangeAWB,
      onChangeCourierName,
    } = this.props;
    return (
      <View>
        <CardStatusOrder
          orderStatus={orderStatus}
          onPress={handlerPaymentConfirmation}
          onChangeAWB={onChangeAWB}
          onChangeCourierName={onChangeCourierName}
        />
        <CardShipping />
        <CardPayment />
      </View>
    );
  };

  _renderDetailWinner = () => {
    const { detailRoom } = this.props;
    const { _renderDetailOrder } = this;
    if (detailRoom.userWinner) {
      const dataUser = detailRoom.listBidders.filter(
        x => x.buyerId === detailRoom.userWinner,
      );
      const { first, last } = dataUser[0].User;
      const orderStatus = detailRoom?.latest_status_code;
      switch (orderStatus) {
        case 10:
          return (
            <View style={styles.cardWinner}>
              <Text style={styles.textWinner} bold>
                detailBidRoom.text.winner
              </Text>
              <Text translate={false} style={styles.winnerName} bold>
                {`${first} ${last}`}
              </Text>
              <Text style={styles.textWiting}>
                detailBidRoom.text.waitingUserFillAddress
              </Text>
            </View>
          );
        default:
          return _renderDetailOrder(orderStatus);
      }
    }
    return null;
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

    /**
     * ===============
     * CALL FUNCTION
     * ===============
     */
    const {
      _renderBidderList,
      _renderImage,
      _renderDetailWinner,
      _renderStatusRoom,
      _getTypeKey,
    } = this;

    /**
     * ===============
     * CALL PROPS
     * ===============
     */
    const {
      detailRoom,
      days,
      hours,
      minutes,
      listBidder,
      seconds,
      statusRoom,
      handlerShowModalBidder,
    } = this.props;
    if (detailRoom.id) {
      const { Product } = detailRoom;
      const startTime = moment(detailRoom.startBid).format(
        'YYYY-MM-DD HH:mm:ss',
      );
      const endTime = moment(detailRoom.endBid).format('YYYY-MM-DD HH:mm:ss');
      const currentBid =
        detailRoom.bidder.length === 0
          ? detailRoom.product_price
          : detailRoom.bidder[0].bidder;

      return (
        <SafeAreaView style={styles.background}>
          <ScrollView
            contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
            scrollEventThrottle={16}
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: { y: this.scrollYAnimatedValue },
                },
              },
            ])}
            style={styles.container.main}>
            <View style={styles.mainWrapper}>
              <NavigationHeader />
              <View style={styles.header}>
                {_getTypeKey(parseInt(detailRoom.allowKey))}
                {_renderStatusRoom()}
              </View>
              {_renderDetailWinner()}
              <View style={styles.content.statusBid}>
                <AuctionTime
                  seconds={seconds}
                  minutes={minutes}
                  hours={hours}
                  days={days}
                  type={statusRoom}
                  time={detailRoom.endBid}
                />
                <Price
                  type="sm"
                  theme="green"
                  titleBold
                  title="component.currentBid"
                  titleStyle={styles.price}
                  amount={currentBid}
                />
              </View>
              <View>
                <View style={styles.content.header}>
                  <Text bold style={styles.text.bidder}>
                    detailBidRoom.text.bidder
                  </Text>
                  <View style={styles.wrapperTotalBidder}>
                    <Text
                      translate={false}
                      bold
                      style={styles.text.totalBidder}>
                      {`${listBidder.length}`}
                    </Text>
                    <Text translate={false} style={styles.text.totalBidder}>
                      {`/${detailRoom.maxbidder}`}
                    </Text>
                  </View>
                </View>
                {_renderBidderList()}
                <TouchableOpacity
                  style={styles.button.cta}
                  onPress={handlerShowModalBidder}>
                  <Text>detailBidRoom.button.showMoreBidder</Text>
                  <Icon name="chevron-right" style={styles.icon.next} />
                </TouchableOpacity>
                <View style={styles.card}>
                  <View style={styles.content.image}>{_renderImage()}</View>
                  <Text bold translate={false} style={styles.text.product}>
                    {`${Product.name}`}
                  </Text>
                  <Text translate={false} style={styles.text.desc}>
                    {`${Product.description}`}
                  </Text>
                  <Text params={{ name: startTime }}>
                    detailBidRoom.text.startBid
                  </Text>
                  <Text params={{ name: endTime }}>
                    detailBidRoom.text.endBid
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
          <NavigationBar
            title="Total Bidder"
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

DetailBidRoomView.defaultProps = {
  detailRoom: {},
  statusRoom: '',
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  listBidder: [],
  onChangeAWB: () => {},
  handlerShowModal: () => {},
  onChangeCourierName: () => {},
  handlerShowModalBidder: () => {},
  handlerPaymentConfirmation: () => {},
};

DetailBidRoomView.propTypes = {
  days: PropTypes.number,
  hours: PropTypes.number,
  minutes: PropTypes.number,
  seconds: PropTypes.number,
  detailRoom: PropTypes.object,
  listBidder: PropTypes.array,
  statusRoom: PropTypes.string,
  onChangeAWB: PropTypes.func,
  handlerShowModal: PropTypes.func,
  onChangeCourierName: PropTypes.func,
  handlerShowModalBidder: PropTypes.func,
  handlerPaymentConfirmation: PropTypes.func,
};

export default DetailBidRoomView;
