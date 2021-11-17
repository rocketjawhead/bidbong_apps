import { Image, Text, ListKey, CardListKey } from 'components';
import { React, View, SafeAreaView, Animated, PropTypes } from 'libraries';
import { getListKey, postBuyKey, setCartKey } from 'config';
import _ from 'lodash';
import { connect } from 'react-redux';
import { METRICS } from 'utils';
import styles from './styles';

class Store extends React.Component {
  state = {
    fadeAnim: new Animated.Value(-100),
    key: [],
  };

  componentDidMount() {
    const { animationIn } = this;
    animationIn();
  }

  componentDidUpdate(prevProps, prevState) {
    const { isShow } = this.props;
    if (prevProps.isShow !== isShow) {
      if (isShow === 2) {
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

  /**
   * for add selected key to cart
   * @param {*} x
   */
  addCart = x => {
    const { key } = this.state;
    const dataKey = {
      keyId: x.id,
      count: 1,
      price: x.price,
    };
    const data = key.find(y => y.keyId === x.id);
    if (data) {
      const index = key
        .map(function(e) {
          return e.keyId;
        })
        .indexOf(data.keyId);
      key[index] = {
        keyId: data.keyId,
        count: (data.count += 1),
        price: x.price * data.count,
      };
      return this.setState({ key });
    }
    key.push(dataKey);
    return this.setState({ key });
  };

  /**
   * for remove selected key from cart
   * @param {} x
   */
  removeCart = x => {
    const { key } = this.state;
    const dataKey = {
      keyId: x.id,
      count: 1,
    };
    const data = key.find(y => y.keyId === x.id);
    if (data) {
      const index = key
        .map(function(e) {
          return e.id;
        })
        .indexOf(data.keyId);
      if (data.count === 1) {
        key.splice(index, 1);
        return this.setState({ key });
      }
      key[index] = {
        keyId: data.keyId,
        count: (data.count -= 1),
      };
      return this.setState({ key });
    }
    key.push(dataKey);
    return this.setState({ key });
  };

  /**
   * funtion for get total amount
   */
  getTotal = () => {
    const { key } = this.state;
    let total = 0;
    key.map(x => (total += x.price));
    return total;
  };

  /**
   * delete all state
   */
  clearState = () => {
    this.setState({ key: [] });
  };

  /**
   * function for checkout key
   */
  handlerCheckoutKey = async () => {
    const { key } = this.state;
    const { reqSetCartKey, toCheckout } = this.props;
    reqSetCartKey(key);
    return toCheckout();
  };

  render() {
    const { fadeAnim, key } = this.state;
    const { Key, userKey } = this.props;
    const { handlerCheckoutKey, addCart, removeCart } = this;
    return (
      <Animated.View
        style={[
          styles.bg,
          {
            transform: [
              {
                translateX: fadeAnim,
              },
            ],
          },
        ]}>
        <Image style={styles.background} source="img-bg-store" imageBackground>
          <SafeAreaView style={styles.container.main}>
            <Text bold style={styles.text.titlePage}>
              store.title
            </Text>
            <View style={styles.container.key}>
              <ListKey listKey={userKey} />
            </View>
            <View style={styles.container.card}>
              <CardListKey
                cartKey={key}
                arrayKey={Key}
                addCart={addCart}
                removeCart={removeCart}
                getTotal={this.getTotal()}
                handlerBuyKey={handlerCheckoutKey}
              />
            </View>
          </SafeAreaView>
        </Image>
      </Animated.View>
    );
  }
}

Store.defaultProps = {
  Key: [],
  isShow: 0,
  userKey: [],
  toCheckout: () => {},
  reqPostBuyKey: () => {},
  reqSetCartKey: () => {},
  getProfileDetail: () => {},
};

Store.propTypes = {
  Key: PropTypes.array,
  isShow: PropTypes.number,
  userKey: PropTypes.array,
  toCheckout: PropTypes.func,
  reqPostBuyKey: PropTypes.func,
  reqSetCartKey: PropTypes.func,
  getProfileDetail: PropTypes.func,
};

const mapStateToProps = state => ({
  Key: state.store.key,
  userKey: state.profile.userKey,
});

const mapDispatchToProps = dispatch => ({
  reqSetCartKey: p => dispatch(setCartKey(p)),
  reqGetListKey: () => dispatch(getListKey()),
  reqPostBuyKey: p => dispatch(postBuyKey(p)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Store);
