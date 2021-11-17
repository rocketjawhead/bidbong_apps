import {
  Animated,
  TouchableOpacity,
  View,
  Text,
  PropTypes,
  React,
} from 'libraries';
import Icon from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Color } from 'utils';
import styles from './styles';

class FAB extends React.Component {
  mode = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  navigateToCreateRoom = () => {
    const { toCreateRoom } = this.props;
    toCreateRoom();
    this.toggleView();
  };

  navigateToCreateUser = () => {
    const { toCreateUser } = this.props;
    toCreateUser();
    this.toggleView();
  };

  toggleView = () => {
    const { isActive } = this.state;
    this.setState({ isActive: !isActive });
    this.setState({});
    Animated.timing(this.mode, {
      toValue: this.mode._value === 0 ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  _renderBg = () => {
    const { isActive } = this.state;
    if (isActive) {
      return (
        // <View
        //   style={{
        //     width: '100%',
        //     height: '100%',
        //     opacity: 0.1,
        //     backgroundColor: '#0000',
        //   }}></View>
        <TouchableOpacity
          activeOpacity={0.4}
          style={{
            backgroundColor: Color.Manatee25,
            height: '100%',
            width: '100%',
            position: 'absolute',
            // opacity: 0.5,
          }}
          onPress={() => this.toggleView()}
        />
      );
    }
    // return null;
  };

  render() {
    const firstY = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 70],
    });
    const secondY = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 120],
    });
    const opacity = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    const rotation = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '45deg'],
    });

    const { isActive } = this.state;

    const BackgroundColorConfig = this.mode.interpolate({
      inputRange: [0, 1],

      outputRange: ['rgba(255, 255, 255, 0)', 'rgba(136, 142, 158, 0.50)'],
    });

    const bg = isActive ? ['#fff', '#fff'] : ['#464CE0', '#6877F4'];
    const colorIcon = isActive ? '#464CE0' : '#fff';

    const { navigateToCreateRoom, navigateToCreateUser } = this;

    return (
      <React.Fragment>
        {this._renderBg()}
        <Animated.View style={styles.mainContainer}>
          <Animated.View style={styles.contentItem(firstY, opacity)}>
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={navigateToCreateRoom}>
              <View style={styles.square}>
                <Text style={{ textAlign: 'center' }}>New Bid Room</Text>
              </View>
              <View style={styles.itemCircle}>
                <Icon name="home" style={styles.itemIcon} />
              </View>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={styles.contentItem(secondY, opacity)}>
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={navigateToCreateUser}>
              <View style={styles.square}>
                <Text style={{ textAlign: 'center' }}>New Admin User</Text>
              </View>
              <View style={styles.itemCircle}>
                <EvilIcons name="user" style={styles.itemIcon} />
              </View>
            </TouchableOpacity>
          </Animated.View>
          <LinearGradient
            colors={bg}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.mainCircle}>
            <TouchableOpacity
              onPress={() => this.toggleView()}
              style={styles.mainButton}>
              <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                <Icon name="pluscircleo" style={styles.iconPlus(colorIcon)} />
              </Animated.View>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
      </React.Fragment>
    );
  }
}

FAB.defaultProps = {
  toCreateRoom: () => {},
  toCreateUser: () => {},
};

FAB.propTypes = {
  toCreateRoom: PropTypes.func,
  toCreateUser: PropTypes.func,
};

export default FAB;
