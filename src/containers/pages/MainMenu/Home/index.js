import {
  React,
  SafeAreaView,
  Animated,
  PropTypes,
  ScrollView,
  RefreshControl,
} from 'libraries';
import { METRICS } from 'utils';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Image, HeaderHome, ListDoor } from 'components';
import { setListRoom } from 'config';
import styles from './styles';

class Home extends React.Component {
  state = {
    fadeAnim: new Animated.Value(-100),
  };

  async componentDidMount() {
    const { animationIn } = this;
    animationIn();
  }

  componentDidUpdate(prevProps, prevState) {
    const { isShow } = this.props;
    if (prevProps.isShow !== isShow) {
      if (isShow === 1) {
        return this.animationIn();
      }
      return this.animationOut();
    }
  }

  componentWillUnmount() {
    const { animationOut } = this;
    animationOut();
  }

  animationIn = () => {
    const { fadeAnim } = this.state;
    Animated.spring(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  animationOut = () => {
    const { fadeAnim } = this.state;
    Animated.spring(fadeAnim, {
      toValue: -METRICS.screen.width,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  render() {
    const { fadeAnim } = this.state;
    const {
      userKey,
      listRoom,
      toDetailRoom,
      userBid,
      toCart,
      refresh,
      onRefresh,
      toBidRoom,
      toNotification,
    } = this.props;
    return (
      <Animated.View
        style={[
          styles.background,
          {
            transform: [
              {
                translateX: fadeAnim,
              },
            ],
          },
        ]}>
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }>
          <Image
            source="img-home"
            style={styles.imageBackground}
            imageBackground>
            <SafeAreaView style={styles.imageBackground}>
              <HeaderHome
                listKey={userKey}
                toNotification={toNotification}
                toCart={toCart}
              />
              <ListDoor
                userBid={userBid}
                onPress={toDetailRoom}
                toBidRoom={toBidRoom}
                listRoom={listRoom}
              />
            </SafeAreaView>
          </Image>
        </ScrollView>
      </Animated.View>
    );
  }
}

Home.defaultProps = {
  isShow: 0,
  userKey: [],
  userBid: {},
  refresh: false,
  listRoom: [],
  toCart: () => {},
  toBidRoom: () => {},
  onRefresh: () => {},
  toDetailRoom: () => {},
  toNotification: () => {},
};

Home.propTypes = {
  toCart: PropTypes.func,
  isShow: PropTypes.number,
  userBid: PropTypes.object,
  refresh: PropTypes.bool,
  userKey: PropTypes.array,
  listRoom: PropTypes.array,
  onRefresh: PropTypes.func,
  toBidRoom: PropTypes.func,
  toDetailRoom: PropTypes.func,
  toNotification: PropTypes.func,
};

const mapStateToProps = state => ({
  userKey: state.profile.userKey,
  userBid: state.profile.userBid,
  listRoom: state.room.listRoom,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
