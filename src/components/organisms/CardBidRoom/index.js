import {React, View, PropTypes} from 'libraries';
// eslint-disable-next-line import/no-cycle
import {Text, Price, Image, Button, AuctionTime} from 'components';
import _ from 'lodash';
import styles from './styles';

class CardBidRoom extends React.Component {
  _renderEmptyState = () => (
    <View style={styles.container.emptyState}>
      <Image contentIcon source="ic-smile" imgWidth={32} />
      <Text style={styles.text.emptyState}>bidRoom.text.emptyState</Text>
    </View>
  );

  _renderPrice = x => {
    if (x === null || _.isEmpty(x.toString())) return null;
    return <Price theme="green" amount={x} />;
  };

  _renderBidder = (x, i) => (
    <View
      key={i}
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={styles.content.itemBidder}>
        <Image
          contentIcon
          source="ic-bidder"
          imgWidth={45}
          style={{marginRight: 12}}
        />
        <Text translate={false}>{`${x.User.first} ${x.User.last}`}</Text>
      </View>
      {this._renderPrice(x.nominal)}
    </View>
  );

  _renderItemBidder = () => {
    const {listBidder} = this.props;
    return <View>{listBidder.map((x, i) => this._renderBidder(x, i))}</View>;
  };

  render() {
    const {_renderItemBidder} = this;
    const {
      isOpen,
      handleShowModal,
      detailRoom,
      seconds,
      minutes,
      hours,
      days,
      currentPrice,
    } = this.props;
    const currentBid =
      detailRoom && detailRoom.listBidders && detailRoom.listBidders.length;
    if (_.isEmpty(detailRoom)) return null;
    return (
      <View style={styles.container.main}>
        <View style={styles.container.card}>
          <View style={styles.content.header}>
            <AuctionTime
              seconds={seconds}
              minutes={minutes}
              hours={hours}
              days={days}
            />
            <Price
              titleBold
              theme="green"
              type="md"
              amount={currentPrice}
              titleStyle={{
                marginVertical: 10,
              }}
              title="bidRoom.text.currentBid"
            />
          </View>
          <View style={styles.container.listBidder}>
            <View style={styles.content.listBidder}>
              <Text bold style={styles.text.bidder}>
                bidRoom.text.bidder
              </Text>
              <View style={styles.container.bidderRow}>
                <Text translate={false} style={{textAlign: 'center'}}>
                  <Text translate={false} bold>
                    {currentBid}
                  </Text>
                  {`/${detailRoom.maxbidder}`}
                </Text>
              </View>
            </View>
            {_renderItemBidder()}
            <View style={styles.container.Button}>
              <Button
                onPress={handleShowModal}
                title="bidRoom.button.placeBid"
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

CardBidRoom.defaultProps = {
  days: 0,
  hours: 0,
  isOpen: false,
  minutes: 0,
  seconds: 0,
  currentPrice: 0,
  detailRoom: {},
  listBidder: [],
  handleShowModal: () => {},
};

CardBidRoom.propTypes = {
  days: PropTypes.number,
  hours: PropTypes.number,
  isOpen: PropTypes.bool,
  minutes: PropTypes.number,
  seconds: PropTypes.number,
  listBidder: PropTypes.array,
  detailRoom: PropTypes.object,
  currentPrice: PropTypes.number,
  handleShowModal: PropTypes.func,
};

export default CardBidRoom;
