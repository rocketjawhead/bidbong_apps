/* eslint-disable import/no-cycle */
import {
  React,
  View,
  SafeAreaView,
  TouchableOpacity,
  PropTypes,
  Animated,
} from 'libraries';
import {
  NavigationHeaderAdmin,
  Text,
  Input,
  NavigationBar,
  Image,
} from 'components';
import {ScrollView} from 'react-native-gesture-handler';
import {Button} from 'components/molecules';
import _ from 'lodash';
import {Fragment} from 'react';
import styles from './styles';

const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 0;
class CreatePostView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.scrollYAnimatedValue = new Animated.Value(0);
  }

  _renderButtonKey = () => {
    const {onChangeKeyType, typeKey} = this.props;
    const typeA = parseInt(typeKey) === 1;
    const typeB = parseInt(typeKey) === 2;
    const typeC = parseInt(typeKey) === 3;
    const typeD = parseInt(typeKey) === 4;
    return (
      <Fragment>
        <Text bold>createPost.text.selectDoorType</Text>
        <View style={styles.content.doorType}>
          <TouchableOpacity
            onPress={() => onChangeKeyType(1)}
            style={styles.button.doorTypeLeft(typeA)}>
            <Text style={styles.text.btnTitle(typeA)}>key.wood</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onChangeKeyType(2)}
            style={styles.button.doorTypeRight(typeB)}>
            <Text style={styles.text.btnTitle(typeB)}>key.silver</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content.doorType}>
          <TouchableOpacity
            onPress={() => onChangeKeyType(3)}
            style={styles.button.doorTypeLeft(typeC)}>
            <Text style={styles.text.btnTitle(typeC)}>key.gold</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onChangeKeyType(4)}
            style={styles.button.doorTypeRight(typeD)}>
            <Text style={styles.text.btnTitle(typeD)}>key.diamond</Text>
          </TouchableOpacity>
        </View>
      </Fragment>
    );
  };

  _renderButton = index => {
    const {handlerOpenCamera, productImage} = this.props;
    const url =
      productImage && productImage.length > 0 && productImage.length > index
        ? {uri: productImage[index].uri}
        : '';
    if (url)
      return (
        <TouchableOpacity onPress={() => handlerOpenCamera(index, false)}>
          <Image key={url} source={url} style={styles.button.chooseImage} />
        </TouchableOpacity>
      );
    return (
      <TouchableOpacity
        onPress={handlerOpenCamera}
        style={styles.button.chooseImage}>
        <Text style={styles.text.photo}>createPost.button.photo</Text>
      </TouchableOpacity>
    );
  };

  _renderImageButton = () => {
    const data = [0, 1, 2, 3];
    return (
      <View style={styles.content.image}>
        {data.map(x => this._renderButton(x))}
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

    /**
     * CALL PROPS
     */
    const {
      handlerShowDatePicker,
      onChangeText,
      title,
      info,
      price,
      bidder,
      startDate,
      endDate,
      startTime,
      endTime,
      handlerSaveProduct,
      goBack,
      productImage,
    } = this.props;
    const {_renderButtonKey, _renderImageButton} = this;
    return (
      <SafeAreaView style={styles.background}>
        <ScrollView
          contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT}}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: this.scrollYAnimatedValue}}},
          ])}>
          <View style={styles.container.main}>
            <NavigationHeaderAdmin
              title="createPost.title"
              icon="x"
              onPress={goBack}
            />
            <View style={styles.card}>
              {/* SECTION CHOOSE DOOR TYPE */}
              {_renderButtonKey()}
              {/* SECTION FILL DETAIL ITEMS */}
              <Text bold style={styles.text.title}>
                createPost.text.fillItem
              </Text>
              {_renderImageButton()}

              {/* SECTION  */}
              <View>
                <Input
                  translatePlaceholder={false}
                  labelStyle={styles.input.label}
                  value={title}
                  label="createPost.input.title"
                  containerStyle={styles.input.container}
                  onChangeText={onChangeText}
                  type="title"
                />
                <Input
                  translatePlaceholder={false}
                  labelStyle={styles.input.label}
                  value={info}
                  label="createPost.input.information"
                  containerStyle={styles.input.container}
                  onChangeText={onChangeText}
                  type="info"
                />
                <Input
                  translatePlaceholder={false}
                  labelStyle={styles.input.label}
                  value={price}
                  label="createPost.input.startBid"
                  containerStyle={styles.input.container}
                  onChangeText={onChangeText}
                  type="price"
                />
                {/* SECTION INPUT DATE */}
                <View style={styles.sectionInputDate}>
                  <TouchableOpacity
                    onPress={() => handlerShowDatePicker('startDate')}
                    style={styles.button.date}>
                    <Input
                      labelStyle={styles.input.label}
                      value={startDate}
                      isIcon
                      translatePlaceholder={false}
                      rightIcon="down"
                      label="createPost.input.startDate"
                      containerStyle={styles.input.container}
                      iconRightStyle={styles.icon.dropdown}
                      editable={false}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handlerShowDatePicker('startTime')}
                    style={styles.button.date}>
                    <Input
                      labelStyle={styles.input.label}
                      value={startTime}
                      isIcon
                      rightIcon="down"
                      translatePlaceholder={false}
                      label="createPost.input.startTime"
                      containerStyle={styles.input.container}
                      editable={false}
                      iconRightStyle={styles.icon.dropdown}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.sectionInputDate}>
                  <TouchableOpacity
                    onPress={() => handlerShowDatePicker('endDate')}
                    style={styles.button.date}>
                    <Input
                      labelStyle={styles.input.label}
                      iconRightStyle={styles.icon.dropdown}
                      value={endDate}
                      isIcon
                      rightIcon="down"
                      translatePlaceholder={false}
                      label="createPost.input.endDate"
                      containerStyle={styles.input.container}
                      editable={false}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handlerShowDatePicker('endTime')}
                    style={styles.button.date}>
                    <Input
                      labelStyle={styles.input.label}
                      iconRightStyle={styles.icon.dropdown}
                      value={endTime}
                      isIcon
                      translatePlaceholder={false}
                      rightIcon="down"
                      label="createPost.input.endTime"
                      containerStyle={styles.input.container}
                      editable={false}
                    />
                  </TouchableOpacity>
                </View>
                <Input
                  translatePlaceholder={false}
                  labelStyle={styles.input.label}
                  value={bidder}
                  label="createPost.input.bidder"
                  containerStyle={styles.input.container}
                  onChangeText={onChangeText}
                  type="bidder"
                />
              </View>
              <View style={{height: 75}}>
                <Button
                  title="createPost.button.save"
                  onPress={handlerSaveProduct}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <NavigationBar
          title="Create Post"
          padding={padding}
          height={headerHeight}
          backgroundColor={headerBackgroundColor}
        />
      </SafeAreaView>
    );
  }
}

CreatePostView.defaultProps = {
  typeKey: 0,
  title: '',
  uri: '',
  info: '',
  productImage: [],
  price: '',
  bidder: '',
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  goBack: () => {},
  onChangeText: () => {},
  handlerSaveProduct: () => {},
  onChangeKeyType: () => {},
  handlerOpenCamera: () => {},
  handlerShowDatePicker: () => {},
};

CreatePostView.propTypes = {
  uri: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  startTime: PropTypes.string,
  productImage: PropTypes.array,
  goBack: PropTypes.func,
  endTime: PropTypes.string,
  title: PropTypes.string,
  info: PropTypes.string,
  price: PropTypes.string,
  bidder: PropTypes.string,
  handlerSaveProduct: PropTypes.func,
  typeKey: PropTypes.number,
  onChangeText: PropTypes.func,
  onChangeKeyType: PropTypes.func,
  handlerOpenCamera: PropTypes.func,
  handlerShowDatePicker: PropTypes.func,
};

export default CreatePostView;
