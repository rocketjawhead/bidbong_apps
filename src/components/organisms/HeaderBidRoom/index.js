/* eslint-disable import/no-cycle */
import { React, Fragment, View, PropTypes } from 'libraries';
import { NavigationHeader, Text, Price } from 'components';
import _ from 'lodash';
import { SliderBox } from 'react-native-image-slider-box';
import { config } from 'config/API/url';
import styles from './styles';

class HeaderBidRoom extends React.Component {
  render() {
    const { detailRoom, listImage } = this.props;
    if (_.isEmpty(detailRoom)) return null;
    return (
      <View style={styles.container}>
        <SliderBox
          images={listImage}
          sliderBoxHeight={275}
          // dotColor={styles.dotActive}
          // inactiveDotColor={styles.dotInactive}
          paginationBoxStyle={styles.paginationBoxStyle}
        />
        <View style={styles.button}>
          <NavigationHeader />
        </View>
        <View style={styles.content}>
          <Text bold style={styles.amount} translate={false}>
            {detailRoom.Product.name}
          </Text>
          <Price
            title="component.startBid"
            theme="light"
            type="sm"
            amount={detailRoom.Product.price}
          />
        </View>
      </View>
    );
  }
}

HeaderBidRoom.defaultProps = {
  detailRoom: {},
  listImage: [],
};

HeaderBidRoom.propTypes = {
  detailRoom: PropTypes.object,
  listImage: PropTypes.array,
};

export default HeaderBidRoom;
