/* eslint-disable no-lonely-if */
import { React, View, PropTypes } from 'libraries';
import { CreatePostView } from 'components';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  createRoom,
  createProduct,
  changeModalLoading,
  setPopUp,
  editProduct,
  editRoom,
} from 'config';
import moment from 'moment';
import _ from 'lodash';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { config } from 'config/API/url';

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStartDateVisisble: false,
      isEndDateVisible: false,
      isStartTimeVisible: false,
      isEndTimeVisible: false,
      mode: 'create',
      typeKey: 0,
      title: '',
      info: '',
      price: '',
      bidder: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      productImage: [],
      productId: 0,
      roomId: 0,
    };
  }

  componentDidMount() {
    const { detailRoom } = this.props;
    if (!_.isEmpty(detailRoom)) {
      const {
        Product,
        allowKey,
        productId,
        startBid,
        endBid,
        maxbidder,
        id,
      } = detailRoom;
      const { description, name, price, productImages } = Product;
      this.handlerGetImage(productImages);
      this.setState({
        mode: 'edit',
        typeKey: allowKey,
        title: name,
        price: price?.toString(),
        info: description,
        bidder: maxbidder?.toString(),
        productId,
        roomId: id,
        startDate: moment(startBid).format('YYYY-MM-DD'),
        endDate: moment(endBid).format('YYYY-MM-DD'),
        startTime: moment(startBid).format('HH:mm:ss'),
        endTime: moment(endBid).format('HH:mm:ss'),
      });
    }
  }

  /**
   * for get spesific image from list image
   * @param {*} productImages
   */
  handlerGetImage = productImages => {
    const image = [];

    productImages.map(x => {
      const data = {
        uri: `${config.url.api}${x.data}`,
        type: 'image/jpeg',
        name: 'image.jpg',
      };
      return image.push(data);
    });
    return this.setState({ productImage: image });
  };

  /**
   * for set selected date
   * @param {*} type
   */
  handlerShowDatePicker = type => {
    const {
      isEndDateVisible,
      isEndTimeVisible,
      isStartTimeVisible,
      isStartDateVisisble,
      startDate,
    } = this.state;
    const { reqSetPopup } = this.props;
    switch (type) {
      case 'startDate':
        return this.setState({ isStartDateVisisble: !isStartDateVisisble });
      case 'endDate':
        if (_.isEmpty(startDate)) {
          return reqSetPopup({
            desc: 'popup.desc.enterStartDate',
            title: 'popup.title.default',
            isShow: true,
            leftButtonTitle: 'popup.button.ok',
          });
        }
        return this.setState({ isEndDateVisible: !isEndDateVisible });
      case 'startTime':
        return this.setState({ isStartTimeVisible: !isStartTimeVisible });
      case 'endTime':
        return this.setState({ isEndTimeVisible: !isEndTimeVisible });
      default:
        return null;
    }
  };

  /**
   * onchangetext
   * @param {*} value
   * @param {*} type
   */
  onChangeText = (value, type) => {
    switch (type) {
      case 'title':
        return this.setState({ title: value });
      case 'info':
        return this.setState({ info: value });
      case 'price':
        return this.setState({ price: value });
      case 'bidder':
        return this.setState({ bidder: value });
      default:
        return null;
    }
  };

  /**
   * for setting start date of bidding
   * @param {} date
   */
  setStartDate = date => {
    const newDate = moment(date).format('YYYY-MM-DD');
    const now = moment().format('YYYY-MM-DD');
    const diff = moment(newDate).diff(now, 'seconds');
    if (diff < 0) {
      this.setState({
        startDate: moment()
          .add(1, 'days')
          .format('YYYY-MM-DD'),
      });
    } else {
      this.setState({ startDate: newDate });
    }
    this.handlerShowDatePicker('startDate');
  };

  /**
   * for setting end date of bidding
   * @param {} date
   */
  setEndDate = date => {
    const { startDate } = this.state;
    const newDate = moment(date).format('YYYY-MM-DD');
    const diff = moment(newDate).diff(startDate, 'seconds');
    if (diff <= 0) {
      this.setState({
        endDate: moment(startDate)
          .add(1, 'days')
          .format('YYYY-MM-DD'),
      });
    } else {
      this.setState({ endDate: newDate });
    }
    this.handlerShowDatePicker('endDate');
  };

  /**
   * for setting start time of bidding
   * @param {} date
   */
  setStartTime = date => {
    moment.locale();
    const newDate = moment(date).format('HH:mm:ss');
    this.setState({ startTime: newDate });
    this.handlerShowDatePicker('startTime');
  };

  /**
   * for setting end time of bidding
   * @param {} date
   */
  setEndTime = date => {
    const newDate = moment(date).format('HH:mm:ss');
    this.setState({ endTime: newDate });
    this.handlerShowDatePicker('endTime');
  };

  /**
   * for set selected key for bidding
   * @param {} p
   */
  onChangeKeyType = p => {
    this.setState({ typeKey: p });
  };

  /**
   * handling for take a picture
   * @param {*} index
   * @param {*} isNull
   */
  handlerOpenCamera = (index = 0, isNull = true) => {
    // More info on all the options is below in the API Reference... just some common use cases shown here
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 720,
      maxHeight: 720,
      quality: 1,
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker(options, response => {
      const { productImage, mode } = this.state;
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.uri;
        if (mode === 'edit' && !isNull) {
          const newImage = [...productImage];
          newImage[index] = {
            uri: source,
            type: 'image/jpeg',
            name: 'image.jpg',
          };
          return this.setState({
            productImage: newImage,
          });
        }
        const data = {
          uri: source,
          type: 'image/jpeg',
          name: 'image.jpg',
        };
        // eslint-disable-next-line react/destructuring-assignment
        const datas = productImage.concat(data);
        return this.setState({ productImage: datas });

        // You can also display the productImage using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };

  /**
   * funcrion for sending data to action
   */
  handlerSaveProduct = async () => {
    const {
      title,
      info,
      price,
      typeKey,
      startDate,
      startTime,
      bidder,
      endDate,
      endTime,
      productImage,
      productId,
      roomId,
      mode,
    } = this.state;
    const {
      navigation,
      reqCreateRoom,
      reqCreateProduct,
      reqChangeModalLoading,
      reqSetPopup,
      reqEditRoom,
      reqEditProduct,
    } = this.props;
    const formData = new FormData();
    formData.append('name', title);
    formData.append('categoryId', 1);
    formData.append('description', info);
    formData.append('price', price);
    formData.append('status', 1);
    productImage.map((x, i) => formData.append('product', x));
    if (mode === 'edit') formData.append('id', productId);

    const payload = {
      type: 'form-data',
      body: formData,
    };
    try {
      reqChangeModalLoading(true);
      let resProduct = '';
      if (mode === 'edit') {
        resProduct = await reqEditProduct(payload);
      } else {
        resProduct = await reqCreateProduct(payload);
      }
      if (resProduct.success) {
        const startBid = `${startDate} ${startTime}`;
        const endBid = `${endDate} ${endTime}`;
        let p = {
          body: {
            productId: resProduct.data.id,
            allowKey: typeKey,
            startBid,
            endBid,
            maxbidder: bidder,
          },
        };
        let res = '';
        if (mode === 'edit') {
          p = {
            body: {
              productId: resProduct.data.id,
              allowKey: typeKey,
              startBid,
              endBid,
              maxbidder: bidder,
              id: roomId,
            },
          };
          res = await reqEditRoom(p);
        } else {
          res = await reqCreateRoom(p);
        }

        reqChangeModalLoading(false);
        if (res.success) {
          setPopUp({
            desc: 'popup.desc.successJoin',
            title: 'popup.title.successJoin',
            isShow: true,
            leftButtonTitle: 'popup.button.ok',
          });
          return navigation.reset({
            index: 0,
            routes: [{ name: 'DASHBOARD' }],
          });
        }
        return reqSetPopup({
          isShow: true,
          leftButtonTitle: 'popup.button.ok',
        });
      }
      reqChangeModalLoading(false);
      return reqSetPopup({ isShow: true, leftButtonTitle: 'popup.button.ok' });
    } catch {
      reqChangeModalLoading(false);
      reqSetPopup({ isShow: true, leftButtonTitle: 'popup.button.ok' });
    }
  };

  /**
   * go to previous page
   */
  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  /**
   * for form validation
   */
  formValidation = () => {
    const {
      typeKey,
      productImage,
      title,
      endDate,
      startDate,
      startTime,
      endTime,
      info,
      price,
      bidder,
    } = this.state;
    const { reqSetPopup } = this.props;

    if (_.isEmpty(typeKey.toString())) {
      return reqSetPopup({
        title: 'popup.title.default',
        desc: 'popup.desc.typeKey',
        isShow: true,
        leftButtonTitle: 'popup.button.ok',
      });
    }

    if (_.isEmpty(productImage)) {
      return reqSetPopup({
        title: 'popup.title.default',
        desc: 'popup.desc.productImage',
        isShow: true,
        leftButtonTitle: 'popup.button.ok',
      });
    }

    if (_.isEmpty(title)) {
      return reqSetPopup({
        title: 'popup.title.default',
        desc: 'popup.desc.productName',
        isShow: true,
        leftButtonTitle: 'popup.button.ok',
      });
    }

    if (_.isEmpty(info)) {
      return reqSetPopup({
        title: 'popup.title.default',
        desc: 'popup.desc.desc',
        isShow: true,
        leftButtonTitle: 'popup.button.ok',
      });
    }

    if (_.isEmpty(price)) {
      return reqSetPopup({
        title: 'popup.title.default',
        desc: 'popup.desc.price',
        isShow: true,
        leftButtonTitle: 'popup.button.ok',
      });
    }

    if (_.isEmpty(startDate)) {
      return reqSetPopup({
        title: 'popup.title.default',
        desc: 'popup.desc.startDate',
        isShow: true,
        leftButtonTitle: 'popup.button.ok',
      });
    }

    if (_.isEmpty(startTime)) {
      return reqSetPopup({
        title: 'popup.title.default',
        desc: 'popup.desc.startTime',
        isShow: true,
        leftButtonTitle: 'popup.button.ok',
      });
    }

    if (_.isEmpty(endDate)) {
      return reqSetPopup({
        title: 'popup.title.default',
        desc: 'popup.desc.endDate',
        isShow: true,
        leftButtonTitle: 'popup.button.ok',
      });
    }

    if (_.isEmpty(endTime)) {
      return reqSetPopup({
        title: 'popup.title.default',
        desc: 'popup.desc.endTime',
        isShow: true,
        leftButtonTitle: 'popup.button.ok',
      });
    }

    if (_.isEmpty(bidder)) {
      return reqSetPopup({
        title: 'popup.title.default',
        desc: 'popup.desc.bidder',
        isShow: true,
        leftButtonTitle: 'popup.button.ok',
      });
    }

    return this.handlerSaveProduct();
  };

  /**
   * for rendering page
   */
  render() {
    const {
      handlerShowDatePicker,
      onChangeKeyType,
      onChangeText,
      setStartDate,
      setStartTime,
      setEndDate,
      formValidation,
      goBack,
      setEndTime,
      handlerOpenCamera,
    } = this;

    const {
      isEndDateVisible,
      isEndTimeVisible,
      isStartTimeVisible,
      isStartDateVisisble,
      typeKey,
      title,
      info,
      price,
      uri,
      bidder,
      startDate,
      endDate,
      startTime,
      endTime,
      productImage,
    } = this.state;

    const tomorrow = moment(new Date())
      .add(1, 'days')
      .format('YYYY-MM-DD');

    return (
      <View style={{ flex: 1 }}>
        <CreatePostView
          handlerShowDatePicker={handlerShowDatePicker}
          onChangeKeyType={onChangeKeyType}
          typeKey={typeKey}
          productImage={productImage}
          uri={uri}
          onChangeText={onChangeText}
          goBack={goBack}
          title={title}
          info={info}
          price={price}
          bidder={bidder}
          startDate={startDate}
          endDate={endDate}
          startTime={startTime}
          endTime={endTime}
          handlerOpenCamera={handlerOpenCamera}
          handlerSaveProduct={formValidation}
        />
        <DateTimePickerModal
          format="YYYY-MM-DD"
          minDate={tomorrow}
          isVisible={isStartDateVisisble}
          mode="date"
          onConfirm={setStartDate}
          onCancel={setStartDate}
        />
        <DateTimePickerModal
          isVisible={isEndDateVisible}
          mode="date"
          onConfirm={setEndDate}
          onCancel={setEndDate}
        />
        <DateTimePickerModal
          isVisible={isStartTimeVisible}
          mode="time"
          onConfirm={setStartTime}
          onCancel={setStartTime}
        />
        <DateTimePickerModal
          isVisible={isEndTimeVisible}
          mode="time"
          onConfirm={setEndTime}
          onCancel={setEndTime}
        />
      </View>
    );
  }
}

CreatePost.defaultProps = {
  reqCreateProduct: () => {},
  reqCreateRoom: () => {},
  reqChangeModalLoading: () => {},
  reqSetPopup: () => {},
  reqEditProduct: () => {},
  reqEditRoom: () => {},
  detailRoom: {},
};

CreatePost.propTypes = {
  reqCreateRoom: PropTypes.func,
  reqCreateProduct: PropTypes.func,
  reqChangeModalLoading: PropTypes.func,
  reqSetPopup: PropTypes.func,
  detailRoom: PropTypes.object,
  reqEditRoom: PropTypes.func,
  reqEditProduct: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  detailRoom: props.route.params.data,
});

const mapDispatchToProps = dispatch => ({
  reqCreateProduct: p => dispatch(createProduct(p)),
  reqCreateRoom: p => dispatch(createRoom(p)),
  reqChangeModalLoading: p => dispatch(changeModalLoading(p)),
  reqSetPopup: p => dispatch(setPopUp(p)),
  reqEditRoom: p => dispatch(editRoom(p)),
  reqEditProduct: p => dispatch(editProduct(p)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
