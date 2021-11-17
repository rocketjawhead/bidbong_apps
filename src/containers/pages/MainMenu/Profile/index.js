import { React, View, SafeAreaView, Animated, PropTypes } from 'libraries';
import { Image, HeaderProfile, CardProfile } from 'components';
import ImagePicker from 'react-native-image-picker';
import { postUpdateProfile } from 'config';
import { METRICS, func } from 'utils';
import { connect } from 'react-redux';
import { config } from 'config/API/url';
import styles from './styles';

class Profile extends React.Component {
  state = {
    fadeAnim: new Animated.Value(-100),
    uri: '',
  };

  componentDidMount() {
    const { profile } = this.props;
    const { avatar } = profile;
    const { animationIn } = this;
    this.setState({ uri: `${config.url.api}${avatar}` });
    animationIn();
  }

  componentDidUpdate(prevProps, prevState) {
    const { isShow } = this.props;
    if (prevProps.isShow !== isShow) {
      if (isShow === 3) {
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

  // OPEN CAMERA
  handlerOpenCamera = () => {
    const { handlerUpdateProfile } = this;
    // More info on all the options is below in the API Reference... just some common use cases shown here
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 720,
      maxHeight: 720,
      quality: 0.5,
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.uri;
        const data = {
          uri: source,
          type: 'image/jpeg',
          name: 'image.jpg',
        };
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({ ...data }, () => {
          handlerUpdateProfile(data);
        });
      }
    });
  };

  /**
   * function for request update image profile
   * @param {*} p
   */
  handlerUpdateProfile = p => {
    const { profile, reqPostUpdateProfile } = this.props;
    const formdata = new FormData();
    formdata.append('id', profile.id);
    formdata.append('avatar', { ...p });
    const payload = {
      type: 'form-data',
      body: formdata,
    };
    reqPostUpdateProfile(payload);
  };

  render() {
    const { fadeAnim, uri } = this.state;
    const { toLogout, toEditProfile, profile, avatar } = this.props;
    const { handlerOpenCamera } = this;
    const url = uri || avatar;
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
        <Image imageBackground style={styles.background} source="img-home">
          <SafeAreaView style={styles.container.main}>
            <View style={styles.container.header}>
              <HeaderProfile
                onPress={toEditProfile}
                profile={profile}
                uri={url}
                openCamera={handlerOpenCamera}
              />
            </View>
            <View style={{ flex: 1 }}>
              <CardProfile logout={toLogout} />
            </View>
          </SafeAreaView>
        </Image>
      </Animated.View>
    );
  }
}

Profile.defaultProps = {
  isShow: 0,
  avatar: '',
  profile: {},
  toLogout: () => {},
  toEditProfile: () => {},
  reqPostUpdateProfile: () => {},
};

Profile.propTypes = {
  avatar: PropTypes.string,
  isShow: PropTypes.number,
  profile: PropTypes.object,
  toLogout: PropTypes.func,
  toEditProfile: PropTypes.func,
  reqPostUpdateProfile: PropTypes.func,
};

const mapStateToProps = state => ({
  profile: state.auth.profile,
});

const mapDispatchToProps = dispatch => ({
  reqPostUpdateProfile: p => dispatch(postUpdateProfile(p)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
