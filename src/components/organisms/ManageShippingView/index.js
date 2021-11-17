/* eslint-disable eqeqeq */
/* eslint-disable import/no-cycle */
import {
  SafeAreaView,
  React,
  ScrollView,
  View,
  Animated,
  TouchableOpacity,
  PropTypes,
} from 'libraries';
import {
  Text,
  NavigationHeader,
  Input,
  Price,
  NavigationBar,
} from 'components';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';

const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 0;

class ManageShippingView extends React.Component {
  constructor(props) {
    super(props);
    this.scrollYAnimatedValue = new Animated.Value(0);
  }

  _renderEmptyState = () => {
    const { searchShipping } = this.props;
    return (
      <View style={styles.containerEmptyState}>
        <Text h3 translate={false}>{`"${searchShipping}"`}</Text>
        <Text style={styles.text.desc}>manageShipping.text.empty</Text>
      </View>
    );
  };

  _renderListShipping = () => {
    const {
      listShipping,
      id,
      price,
      onChangePrice,
      handlerUpdateShipping,
      searchMode,
    } = this.props;
    if (listShipping.length === 0 && searchMode)
      return this._renderEmptyState();

    return listShipping.map((x, i) => {
      const idCountry = x.id.toString();
      const isActive = x.id == id && price;
      const isValue = x.id == id ? price : null;
      return (
        <View style={styles.card} key={i}>
          <View style={styles.header}>
            <View style={styles.square}>
              <Text translate={false}>{idCountry}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.key} translate={false}>
                {x.country}
              </Text>
            </View>
          </View>
          <View style={styles.content}>
            <Price
              theme="green"
              title="component.currentPrice"
              titleBold
              titleStyle={styles.currentPrice}
              amount={x.price}
              md
            />
            <Input
              isIcon
              type={x.id}
              typeIcon="Fontisto"
              leftIcon="euro"
              value={isValue}
              onChangeText={onChangePrice}
              containerStyle={styles.input}
              translatePlaceholder={false}
              label="manageShipping.input.price"
              labelStyle={styles.labelStyle}
            />
          </View>
          {isActive ? (
            <TouchableOpacity
              style={styles.button}
              onPress={handlerUpdateShipping}>
              <Text style={styles.txtSave}>manageShipping.button.save</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      );
    });
  };

  _renderPagination = () => {
    const {
      currentPage,
      totalPage,
      handlerGetShipping,
      searchMode,
    } = this.props;
    if (searchMode) return null;
    return (
      <View style={styles.containerPagination}>
        <TouchableOpacity onPress={() => handlerGetShipping(1, 'prev')}>
          <Text>manageShipping.text.prev</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <Text translate={false}>{currentPage}</Text>
          <Text translate={false}>{`/${totalPage}`}</Text>
        </View>
        <TouchableOpacity onPress={() => handlerGetShipping(1, 'next')}>
          <Text>manageShipping.text.next</Text>
        </TouchableOpacity>
      </View>
    );
  };

  _renderSearch = () => {
    const { onChangeText, searchShipping, handlerSearchCountry } = this.props;
    return (
      <View style={styles.containerSearch}>
        <Input
          isIcon
          containerStyle={styles.inputSearch}
          placeholder="manageShipping.input.search"
          onChangeText={onChangeText}
          value={searchShipping}
          noBorder
          onSubmit={handlerSearchCountry}
          go
        />
        <TouchableOpacity
          style={styles.buttonSearch}
          onPress={handlerSearchCountry}>
          <Feather name="search" style={styles.iconSearch} />
        </TouchableOpacity>
      </View>
    );
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
    return (
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } },
            },
          ])}>
          <View style={styles.container}>
            <NavigationHeader />
            <Text h2 style={styles.title}>
              manageShipping.title
            </Text>
            <View>
              {this._renderSearch()}
              {this._renderListShipping()}
              {this._renderPagination()}
            </View>
          </View>
        </ScrollView>
        <NavigationBar
          title="Transaction Detail"
          padding={padding}
          height={headerHeight}
          backgroundColor={headerBackgroundColor}
        />
      </SafeAreaView>
    );
  }
}

ManageShippingView.defaultProps = {
  id: '',
  price: '',
  totalPage: 0,
  searchMode: false,
  currentPage: 0,
  listShipping: [],
  searchShipping: '',
  onChangeText: () => {},
  onChangePrice: () => {},
  handlerGetShipping: () => {},
  handlerSearchCountry: () => {},
  handlerUpdateShipping: () => {},
};

ManageShippingView.propTypes = {
  id: PropTypes.string,
  price: PropTypes.string,
  totalPage: PropTypes.number,
  searchMode: PropTypes.bool,
  currentPage: PropTypes.number,
  listShipping: PropTypes.array,
  onChangeText: PropTypes.func,
  onChangePrice: PropTypes.func,
  searchShipping: PropTypes.string,
  handlerGetShipping: PropTypes.func,
  handlerSearchCountry: PropTypes.func,
  handlerUpdateShipping: PropTypes.func,
};

export default ManageShippingView;
