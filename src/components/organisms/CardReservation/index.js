import { React, View, Fragment, PropTypes, TouchableOpacity } from 'libraries';
// eslint-disable-next-line import/no-cycle
import { Text, Image, ButtonReservation, Price } from 'components';
import Icon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { config } from 'config/API/url';
import styles from './styles';

class CardReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0,
    };

    this.changeImage = null;
  }

  componentDidMount() {
    const { getImageUrl } = this;
    getImageUrl();
  }

  componentWillUnmount() {}

  clearTimer = () => {
    clearInterval(this.changeImage);
    this.changeImage = null;
  };

  getImageUrl = () => {
    this.changeImage = setInterval(() => {
      const { currentImage } = this.state;
      const { Product } = this.props;
      if (currentImage === Product.productImages.length - 1) {
        return this.setState({ currentImage: 0 });
      }
      return this.setState({ currentImage: currentImage + 1 });
    }, 5000);
  };

  _renderPhotoProduct = () => {
    const { Product } = this.props;
    const { currentImage } = this.state;
    return (
      <View>
        {Product &&
          Product.productImages &&
          Product.productImages.map((x, i) => {
            const url = `${x.prductImgName}`;
            const isActive = currentImage === i;
            return (
              <View style={styles.wrapperImage(isActive)} key={i}>
                <Image source={{ uri: url }} style={styles.image.small} />
              </View>
            );
          })}
      </View>
    );
  };

  getIconKey = x => {
    switch (x) {
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

  _renderFooter = () => {
    const { statusRoom, handlerReservation, room } = this.props;
    const { getIconKey } = this;
    // if (statusRoom === 'lock')
    //   return (
    //     <View style={styles.banner}>
    //       <View style={styles.circleRed}>
    //         <Feather name="info" style={styles.iconInfo} />
    //       </View>
    //       <View style={styles.bannerContent}>
    //         <Text bold style={styles.titleLock}>
    //           reservation.footer.locked.title
    //         </Text>
    //         <Text>reservation.footer.locked.desc</Text>
    //       </View>
    //     </View>
    //   );
    if (statusRoom === 'booked')
      return (
        <View style={styles.banner}>
          <View style={styles.circleBlue}>
            <Image source="ic-bell" contentIcon imgWidth={30} />
          </View>
          <View style={styles.bannerContent}>
            <Text bold style={styles.titleBooked}>
              reservation.footer.booked.title
            </Text>
            <Text>reservation.footer.booked.desc</Text>
          </View>
        </View>
      );
    return (
      <View style={styles.button.reservation}>
        <ButtonReservation
          icon={getIconKey(room.id)}
          onPress={handlerReservation}
        />
      </View>
    );
  };

  _renderButtonLeaveGame = () => {
    const { statusRoom, handlerLeaveRoom } = this.props;
    if (statusRoom === 'booked')
      return (
        <TouchableOpacity
          style={styles.button.leave}
          onPress={handlerLeaveRoom}>
          <View>
            <Text bold style={styles.text.leave}>
              reservation.button.leave.title
            </Text>
            <Text>reservation.button.leave.subtitle</Text>
          </View>
          <View style={styles.circleRed}>
            <AntDesign name="login" style={styles.icon.out} />
          </View>
        </TouchableOpacity>
      );

    return null;
  };

  render() {
    const { _renderPhotoProduct } = this;
    const { showModalDesc, showModalBidder, Product } = this.props;
    const { currentImage } = this.state;
    const url =
      Product && Product.productImages
        ? `${Product?.productImages[currentImage].prductImgName}`
        : '';
    return (
      <View style={styles.container.main}>
        <View style={styles.container.card}>
          <View style={styles.content.image}>
            <View style={styles.wrapperImageBig}>
              <Image source={{ uri: url }} style={styles.image.big} />
            </View>
            {_renderPhotoProduct()}
          </View>
          <View style={styles.content.desc}>
            <Text bold style={styles.text.itemOnSale}>
              reservation.text.itemOnSale
            </Text>
            <Text translate={false} bold style={styles.text.product}>
              {Product.name}
            </Text>
            <Price
              theme="green"
              title="component.startBid"
              titleBold
              titleStyle={styles.text.price}
              amount={Product.price}
            />
          </View>
          <TouchableOpacity style={styles.button.cta} onPress={showModalDesc}>
            <Text>reservation.button.desc</Text>
            <Icon name="chevron-right" style={styles.icon.next} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button.cta} onPress={showModalBidder}>
            <Text>reservation.button.bidder</Text>
            <Icon name="chevron-right" style={styles.icon.next} />
          </TouchableOpacity>
          {this._renderButtonLeaveGame()}
        </View>
        {this._renderFooter()}
      </View>
    );
  }
}

CardReservation.defaultProps = {
  room: {},
  Product: {},
  statusRoom: '',
  showModalDesc: () => {},
  showModalBidder: () => {},
  handlerLeaveRoom: () => {},
  handlerReservation: () => {},
};

CardReservation.propTypes = {
  room: PropTypes.object,
  Product: PropTypes.object,
  statusRoom: PropTypes.string,
  showModalDesc: PropTypes.func,
  showModalBidder: PropTypes.func,
  handlerLeaveRoom: PropTypes.func,
  handlerReservation: PropTypes.func,
};

export default CardReservation;
