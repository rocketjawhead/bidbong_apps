/* eslint-disable import/no-cycle */
import {
  React,
  View,
  ScrollView,
  Carousel,
  PropTypes,
  DeviceInfo,
} from 'libraries';
import { Text } from 'components/atoms';
import { setListRoom } from 'config';
import _ from 'lodash';
import { CardRoom } from 'components/molecules';
import { Pagination } from 'react-native-snap-carousel';

import { typeOf } from 'utils/functions/fn';
import styles from './styles';

class ListDoor extends React.Component {
  state = {
    activeSlide: 0,
  };

  /**
   * render pagination using react-native-snap-carousel
   */
  _renderPagination = () => {
    const { activeSlide } = this.state;
    const { listRoom } = this.props;
    const isEmpty = _.isEmpty(listRoom);
    const isUndefined = listRoom[0] === undefined;
    let fixRoom = [];
    if (isUndefined || isEmpty) {
      fixRoom = 4;
    } else {
      fixRoom = listRoom.length;
    }
    return (
      <View style={{ flexDirection: 'row', marginRight: 12 }}>
        <Text translate={false}>{activeSlide + 1}</Text>
        <Text translate={false}>{`/${fixRoom}`}</Text>
      </View>
    );
  };

  _renderEmptyRoom = () => {
    const data = [1, 2, 3, 4];
    return (
      <Carousel
        containerCustomStyle={styles.containerCarousel}
        activeSlideAlignment="start"
        ref={c => {
          this.Carousel = c;
        }}
        data={data}
        itemWidth={styles.carousel.item.width}
        sliderWidth={styles.carousel.slider.width}
        onSnapToItem={index => this.setState({ activeSlide: index })}
        renderItem={({ item, index }) => (
          <CardRoom key={index} data={item} type="empty" />
        )}
      />
    );
  };

  _renderListDoor = () => {
    const { listRoom, onPress, userBid, toBidRoom } = this.props;
    const isEmpty = _.isEmpty(listRoom);
    const isUndefined = listRoom[0] === undefined;
    if (isUndefined || isEmpty) return this._renderEmptyRoom();
    return (
      <Carousel
        containerCustomStyle={styles.containerCarousel}
        activeSlideAlignment="start"
        ref={c => {
          this.Carousel = c;
        }}
        data={listRoom}
        itemWidth={styles.carousel.item.width}
        sliderWidth={styles.carousel.slider.width}
        onSnapToItem={index => this.setState({ activeSlide: index })}
        renderItem={({ item, index }) => (
          <CardRoom
            key={index}
            data={item}
            onPress={onPress}
            userBid={userBid}
            toBidRoom={toBidRoom}
          />
        )}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.text.pick}>home.text.pickItem</Text>
          {this._renderPagination()}
        </View>
        {this._renderListDoor()}
      </View>
    );
  }
}

ListDoor.defaultProps = {
  userBid: [],
  listRoom: [],
  onPress: () => {},
  toBidRoom: () => {},
};

ListDoor.propTypes = {
  userBid: PropTypes.array,
  onPress: PropTypes.func,
  listRoom: PropTypes.array,
  toBidRoom: PropTypes.func,
};

export default ListDoor;
