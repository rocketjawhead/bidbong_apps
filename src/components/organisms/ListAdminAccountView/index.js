/* eslint-disable import/no-cycle */
import {
  React,
  View,
  SafeAreaView,
  ScrollView,
  Animated,
  PropTypes,
} from 'libraries';
import {
  Text,
  NavigationBar,
  NavigationHeaderAdmin,
  ListAccount,
} from 'components';
import styles from './styles';

const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 0;

class ListAdminAccountView extends React.Component {
  constructor(props) {
    super(props);
    this.scrollYAnimatedValue = new Animated.Value(0);
  }

  _renderListAccount = () => {
    const {listUser} = this.props;
    const {onPressAction} = this.props;

    const adminUser = listUser.filter((x, i) => x.roleId === 1);
    return adminUser.map((x, i) => (
      <ListAccount onPressAction={onPressAction} data={x} keyId={i} />
    ));
  };

  render() {
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

    const {totalUser} = this.props;

    return (
      <View style={styles.bg}>
        <SafeAreaView>
          <ScrollView
            contentContainerStyle={{
              paddingTop: HEADER_MAX_HEIGHT,
            }}
            scrollEventThrottle={16}
            onScroll={Animated.event([
              {nativeEvent: {contentOffset: {y: this.scrollYAnimatedValue}}},
            ])}>
            <View style={styles.mainContainer}>
              <NavigationHeaderAdmin icon="x" />
              <Text h3 params={{name: totalUser}} style={styles.title}>
                AdminAccount.title
              </Text>
              <View style={styles.containerList}>
                {this._renderListAccount()}
              </View>
            </View>
          </ScrollView>
          <NavigationBar
            title="Create Admin Account"
            padding={padding}
            height={headerHeight}
            backgroundColor={headerBackgroundColor}
          />
        </SafeAreaView>
      </View>
    );
  }
}

ListAdminAccountView.defaultProps = {
  listUser: [],
  totalUser: 0,
  onPressAction: () => {},
};

ListAdminAccountView.propTypes = {
  listUser: PropTypes.array,
  totalUser: PropTypes.number,
  onPressAction: PropTypes.func,
};

export default ListAdminAccountView;
