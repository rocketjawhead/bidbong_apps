/* eslint-disable import/no-cycle */
import {
  React,
  View,
  SafeAreaView,
  ScrollView,
  Animated,
  PropTypes,
} from 'libraries';
import {Text, NavigationHeader, CardBid, NavigationBar} from 'components';
import styles from './styles';

const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 0;
class TotalRoomView extends React.Component {
  constructor(props) {
    super(props);
    this.scrollYAnimatedValue = new Animated.Value(0);
  }

  /**
   * ========================
   * FUNCTION RENDER
   * ========================
   */
  _renderListRoom = () => {
    const {listRoom} = this.props;
    return listRoom.map((data, index) => <CardBid data={data} />);
  };

  render() {
    /**
     * ====================
     * CALL FUNCTION
     * ====================
     */
    const {_renderListRoom} = this;

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

    return (
      <SafeAreaView style={styles.background}>
        <ScrollView
          contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT}}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: this.scrollYAnimatedValue}}},
          ])}>
          <View style={styles.container}>
            <NavigationHeader />
            <Text h3 style={styles.text.title} params={{name: 34}}>
              totalRoom.text.totalRoom
            </Text>
          </View>
          {_renderListRoom()}
        </ScrollView>
        <NavigationBar
          title="Total Room"
          padding={padding}
          height={headerHeight}
          backgroundColor={headerBackgroundColor}
        />
      </SafeAreaView>
    );
  }
}

TotalRoomView.defaultProps = {
  listRoom: [],
};

TotalRoomView.propTypes = {
  listRoom: PropTypes.array,
};

export default TotalRoomView;
