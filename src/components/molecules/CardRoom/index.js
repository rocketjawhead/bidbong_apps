import { React, View, PropTypes } from 'libraries';
import { Image, Text, Price } from 'components/atoms';
import { TouchableOpacity } from 'react-native-gesture-handler';
import _ from 'lodash';
import moment from 'moment';
import { config } from 'config/API/url';
import styles from './styles';

class CardRoom extends React.PureComponent {
  state = {
    days: '0',
    hours: '0',
    minutes: '0',
    seconds: '0',
  };

  interval = null;

  componentDidMount() {
    this.getDiff();
  }

  componentDidUpdate(prevProps, prevState) {
    const { seconds } = this.state;
    const { data } = this.props;
    if (prevState.seconds === '0' || seconds === '0' || _.isEmpty(data)) {
      this.getDiff();
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  clearTimer = () => {
    clearInterval(this.interval);
    this.interval = null;
  };

  getIconKey = x => {
    const data = parseInt(x);
    switch (data) {
      case 1:
        return 'ic-wood-key';
      case 2:
        return 'ic-silver-key';
      case 3:
        return 'ic-gold-key';
      default:
        return 'ic-diamond-key';
    }
  };

  getTypeKey = x => {
    const data = parseInt(x);
    switch (data) {
      case 1:
        return 'home.door.wood';
      case 2:
        return 'home.door.silver';
      case 3:
        return 'home.door.gold';
      default:
        return 'home.door.diamond';
    }
  };

  getTypeDoor = x => {
    const data = parseInt(x);
    switch (data) {
      case 1:
        return 'img-card-wood-door';
      case 2:
        return 'img-card-silver-door';
      case 3:
        return 'img-card-gold-door';
      default:
        return 'img-card-diamond-door';
    }
  };

  getTypeDoorEmpty = x => {
    const data = parseInt(x);
    switch (data) {
      case 1:
        return 'img-card-wood-blur';
      case 2:
        return 'img-card-silver-blur';
      case 3:
        return 'img-card-gold-blur';
      default:
        return 'img-card-diamond-blur';
    }
  };

  getDiff = () => {
    const { data } = this.props;
    if (this.interval !== null) return null;
    //new code
    // if (data.typeRoom === 'live') {
      return this.countDownLiveRoom();
    // }
    return this.countDownWaitingRoom();
  };

  countDownLiveRoom = () => {
    const { data } = this.props;
    const { clearTimer } = this;
    this.interval = setInterval(() => {
      const date1 = moment()
        .utc('+0200')
        .format('x');
        console.log('ini countDownLiveRoom',data)
      const date2 = new Date(data.endBid);
      const difference1 = date2.getTime() - date1;
      if (difference1 > 0) {
        return this.setState({
          days: moment.duration(difference1).get('days'),
          hours: moment.duration(difference1).get('hours'),
          minutes: moment.duration(difference1).get('minutes'),
          seconds: moment.duration(difference1).get('seconds'),
        });
      }
      return this.setState(
        {
          hours: '0',
          minutes: '0',
          seconds: '0',
        },
        () => clearTimer(),
      );
    }, 1000);
  };

  countDownWaitingRoom = () => {
    const { data } = this.props;
    const { clearTimer } = this;

    this.interval = setInterval(() => {
      const date1 = moment()
        .utc('+0200')
        .format('x');
        console.log('ini countdown countDownWaitingRoom',data)
      const date2 = new Date(data.startBid);
      const difference1 = date2.getTime() - date1;
      if (difference1 > 0) {
        return this.setState({
          days: moment.duration(difference1).get('days'),
          hours: moment.duration(difference1).get('hours'),
          minutes: moment.duration(difference1).get('minutes'),
          seconds: moment.duration(difference1).get('seconds'),
        });
      }
      return this.setState(
        {
          hours: '0',
          minutes: '0',
          seconds: '0',
        },
        () => clearTimer(),
      );
    }, 1000);
  };

  _renderActiveRoom = () => {
    const { data, toBidRoom } = this.props;
    const { getTypeDoor, getTypeKey } = this;
    const { days, hours, minutes, seconds } = this.state;
    console.log('data', data);
    const url =
      data && data.Product && data.Product.productImages
        ? `${data.Product.images}`
        : '';
    if (
      seconds.toString() === 0 &&
      minutes.toString() === 0 &&
      hours.toString() === 0 &&
      days.toString() === 0
    )
      this.getDiff();
    if (data && data.Product)
      return (
        <TouchableOpacity onPress={() => toBidRoom(data.id)}>
          <Image
            source={getTypeDoor(data.allowKey)}
            imageBackground
            resizeMode="stretch"
            style={styles.bgImage}>
            <View style={styles.container.main}>
              <Text style={styles.text.typeDoor}>
                {getTypeKey(data.allowKey)}
              </Text>
              <View style={styles.container.countdown}>
                <Text translate={false}>
                  {`${days}d ${hours}h ${minutes}m ${seconds}s`}
                </Text>
              </View>
              <Text bold style={styles.text.roomongame}>
                home.text.roomongame
              </Text>
            </View>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.container.imageProduct}>
                  <Image source={{ uri: url }} style={styles.image.product} />
                </View>
                <View style={{ justifyContent: 'flex-end' }}>
                  <Price
                    title="component.startBid"
                    amount={data.Product.price}
                  />
                </View>
              </View>
              <Text bold style={styles.text.desc} translate={false}>
                {data.Product.name}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Text bold translate={false} style={styles.text.bidder}>
                  {`${data.BiddingTransactions.length} `}
                </Text>
                <Text style={styles.text.bidder}>home.text.bidderEnrolled</Text>
              </View>
            </View>
          </Image>
        </TouchableOpacity>
      );
    return null;
  };

  _renderEmpty = () => {
    const { data } = this.props;
    const { getTypeDoorEmpty } = this;
    return (
      <View>
        <Image
          source={getTypeDoorEmpty(data)}
          imageBackground
          resizeMode="stretch"
          style={styles.bgEmpty}>
          <Image contentIcon source="ic-flask" imgWidth={35} />
          <Text style={styles.text.empty}>dashboard.text.empty</Text>
        </Image>
      </View>
    );
  };

  render() {
    const { data, onPress, type } = this.props;
    console.log('ini data room render',data)
    const { getIconKey, getTypeDoor, getTypeKey } = this;
    const { days, hours, minutes, seconds } = this.state;
    if (type === 'empty') return this._renderEmpty();
    const isLive = data?.typeRoom === 'live' || data?.typeRoom === 'end';
    const url =
      data && data.Product && data.Product.productImages
        ? `${data.Product.images}`
        : '';
    if (isLive) return this._renderActiveRoom();
    if (data && data.Product)
      return (
        <TouchableOpacity onPress={() => onPress(data)}>
          <Image
            source={getTypeDoor(data.allowKey)}
            imageBackground
            resizeMode="stretch"
            style={styles.bgImage}>
            <View style={styles.container.main}>
              <Text style={styles.text.typeDoor}>
                {getTypeKey(data.allowKey)}
              </Text>
              <View style={styles.container.countdown}>
                <Text translate={false}>
                  {`${days}d ${hours}h ${minutes}m ${seconds}s`}
                </Text>
              </View>
              <View style={styles.container.key}>
                <Image
                  source={getIconKey(data.allowKey)}
                  contentIcon
                  imgWidth={40}
                  style={styles.image.key}
                />
              </View>
            </View>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.container.imageProduct}>
                  <Image source={{ uri: url }} style={styles.image.product} />
                </View>
                <View style={{ justifyContent: 'flex-end' }}>
                  <Price
                    title="component.startBid"
                    amount={data.Product.price}
                  />
                </View>
              </View>
              <Text bold style={styles.text.desc} translate={false}>
                {data.Product.name}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Text bold translate={false} style={styles.text.bidder}>
                  {`${data.BiddingTransactions.length} `}
                </Text>
                <Text style={styles.text.bidder}>home.text.bidderEnrolled</Text>
              </View>
            </View>
          </Image>
        </TouchableOpacity>
      );
    return null;
  }
}

CardRoom.defaultProps = {
  data: {},
  type: 'active',
  onPress: () => {},
  toBidRoom: () => {},
};

CardRoom.propTypes = {
  data: PropTypes.object,
  type: PropTypes.string,
  onPress: PropTypes.func,
  toBidRoom: PropTypes.func,
};

export default CardRoom;
