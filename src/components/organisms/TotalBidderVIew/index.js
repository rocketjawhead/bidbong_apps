import { React, View, SafeAreaView, Animated, PropTypes } from 'libraries';
import { Text, NavigationHeader, NavigationBar } from 'components';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';

const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 0;
class TotalBidderView extends React.Component {
  constructor(props) {
    super(props);
    this.scrollYAnimatedValue = new Animated.Value(0);
    this.state = {
      descVisible: false,
      bidderVisible: false,
    };
  }

  /**
   * ========================
   * FUNCTION RENDER
   * ========================
   */
  _renderBidder = data =>
    data.map((data, index) => (
      <Text style={styles.text.bidder} translate={false}>
        {`${data.user_first} ${data.user_last}`}
      </Text>
    ));

  render() {
    /**
     * =====================
     * CALL FUNCTION
     * =====================
     */
    const { _renderBidder } = this;

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

    const {
      lastWinner,
      listBidder,
      totalLastWinner,
      totalListBidder,
    } = this.props;

    return (
      <SafeAreaView style={styles.background}>
        <ScrollView
          contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } },
            },
          ])}
          style={styles.container}>
          <NavigationHeader />
          <Text h3 style={styles.text.title} params={{ name: totalListBidder }}>
            totalBidder.text.totalBidder
          </Text>
          <View style={styles.card}>
            <Text bold style={styles.text.subTitle}>
              totalBidder.text.lastWinner
            </Text>
            {_renderBidder(lastWinner)}
          </View>
          <View style={styles.card}>
            <Text bold style={styles.text.subTitle}>
              totalBidder.text.bidder
            </Text>
            {_renderBidder(listBidder)}
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
}

TotalBidderView.defaultProps = {
  lastWinner: [],
  listBidder: [],
  totalLastWinner: [],
  totalListBidder: [],
};

TotalBidderView.propTypes = {
  lastWinner: PropTypes.array,
  listBidder: PropTypes.array,
  totalLastWinner: PropTypes.array,
  totalListBidder: PropTypes.array,
};

export default TotalBidderView;
