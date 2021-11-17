/* eslint-disable import/no-cycle */
import {
  CardBid,
  FAB,
  HeaderDashboard,
  Image,
  NavigationBar,
  Text,
} from 'components';
import {
  Animated,
  Fragment,
  PropTypes,
  React,
  SafeAreaView,
  View,
} from 'libraries';
import moment from 'moment';
import { LineChart } from 'react-native-chart-kit';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/Feather';
import styles from './styles';

const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 0;
class DashboardView extends React.Component {
  constructor(props) {
    super(props);
    this.scrollYAnimatedValue = new Animated.Value(0);
  }

  _renderEmptyState = () => (
    <View style={styles.container.emptyState}>
      <Image contentIcon source="ic-smile" imgWidth={32} />
      <Text style={styles.text.emptyState}>dashboard.text.emptyState</Text>
    </View>
  );

  _renderEmptyStateHistory = () => (
    <View style={styles.container.emptyState}>
      <Image contentIcon source="ic-smile" imgWidth={32} />
      <Text style={styles.text.emptyState}>
        dashboard.text.emptyStateHistory
      </Text>
    </View>
  );

  _renderListRoom = () => {
    const { listRoom, toRoom, handlerModal } = this.props;
    if (listRoom.length === 0) return this._renderEmptyState();
    return listRoom.map((data, index) => (
      <View key={index}>
        <CardBid
          data={data}
          toRoom={toRoom}
          isAdmin
          handlerModal={handlerModal}
        />
      </View>
    ));
  };

  _renderChart = () => {
    const { dataChart } = this.props;
    const { _renderEmptyStateHistory } = this;
    const currentMonth = moment().format('MMMM');
    const months =
      dataChart.labels.length > 0 ? dataChart.labels : [currentMonth];
    const dataSet = dataChart.data.length > 0 ? dataChart.data : [0];
    const data = {
      labels: months,
      datasets: [
        {
          data: dataSet,
        },
      ],
    };

    const chartConfig = {
      decimalPlaces: 1, // optional, defaults to 2dp
      color: () => `rgba(70, 76, 224, 0.5)`,
      labelColor: () => `rgba(57, 74, 109, 1)`,
      style: {
        borderRadius: 16,
      },
    };
    if (dataChart.data.length > 0)
      return (
        <LineChart
          data={data}
          width={styles.chartWidth} // from react-native
          height={220}
          withInnerLines={false}
          withOuterLines={false}
          withDots={false}
          segments={2}
          chartConfig={chartConfig}
          style={styles.chart}
        />
      );

    return _renderEmptyStateHistory();
  };

  render() {
    const { dataChart } = this.props;
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
     * ===================
     * CALL FUNCTION
     * ===================
     */
    const { _renderListRoom, _renderChart } = this;

    /**
     * ===================
     * CALL PROPS
     * ===================
     */
    const {
      toLogout,
      toCreateRoom,
      toTotalBid,
      toTotalRoom,
      listRoom,
      toManageKey,
      toManaegeShipping,
      toCreateUser,
    } = this.props;

    const totalRoom = listRoom.length;
    return (
      <Fragment>
        <SafeAreaView />
        <ScrollView
          contentContainerStyle={{
            // paddingTop: HEADER_MAX_HEIGHT,
            flexGrow: 1,
          }}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } },
            },
          ])}>
          <HeaderDashboard toLogout={toLogout} />
          <TouchableOpacity onPress={toTotalBid}>
            <View style={styles.cardHeader}>
              <View style={styles.container.header}>
                <Text bold style={styles.text.titleHeader}>
                  dashboard.text.totalBidder
                </Text>
              </View>
              <Icons name="arrow-right-circle" style={styles.icon.back} />
              {_renderChart()}
            </View>
          </TouchableOpacity>
          <View style={styles.line} />
          <View style={styles.container.totalDownload}>
            <View style={{ ...styles.content.amount, marginRight: 12 }}>
              <Text bold style={styles.text.titleTotal}>
                dashboard.text.totalDownload
              </Text>
              <Text style={styles.text.amount} translate={false}>
                1629
              </Text>
            </View>
            <View style={styles.content.amount}>
              <Text bold style={styles.text.titleTotal}>
                dashboard.text.totalRoom
              </Text>
              <TouchableOpacity
                style={styles.wrapperTotalRoom}
                onPress={toTotalRoom}>
                <Text style={styles.text.amount} translate={false}>
                  {totalRoom}
                </Text>
                <Icons name="arrow-right-circle" style={styles.icon.next} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.line} />

          <TouchableOpacity
            style={styles.button.manageKey}
            onPress={toManageKey}>
            <Text style={styles.text.manageKey}>
              dashboard.button.manageKey
            </Text>
            <View style={styles.circle}>
              <Image contentIcon source="ic-keyhole" imgHeight={30} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button.manageKey}
            onPress={toManaegeShipping}>
            <Text style={styles.text.manageKey}>
              dashboard.button.manageShip
            </Text>
            <View style={styles.circle}>
              <Image contentIcon source="ic-ship" imgHeight={30} />
            </View>
          </TouchableOpacity>

          {_renderListRoom()}
        </ScrollView>
        <NavigationBar
          withoutIcon
          title="Dashboard"
          padding={padding}
          height={headerHeight}
          backgroundColor={headerBackgroundColor}
        />
        <FAB toCreateRoom={toCreateRoom} toCreateUser={toCreateUser} />
      </Fragment>
    );
  }
}

DashboardView.defaultProps = {
  listRoom: [],
  dataChart: {},
  toLogout: () => {},
  toCreateUser: () => {},
  toCreateRoom: () => {},
  toTotalBid: () => {},
  toTotalRoom: () => {},
  toManageKey: () => {},
  toRoom: () => {},
  toManaegeShipping: () => {},
  handlerModal: () => {},
};

DashboardView.propTypes = {
  dataChart: PropTypes.object,
  listRoom: PropTypes.array,
  toLogout: PropTypes.func,
  toCreateUser: PropTypes.func,
  toCreateRoom: PropTypes.func,
  toTotalBid: PropTypes.func,
  toTotalRoom: PropTypes.func,
  toManageKey: PropTypes.func,
  toRoom: PropTypes.func,
  toManaegeShipping: PropTypes.func,
  handlerModal: PropTypes.func,
};

export default DashboardView;
