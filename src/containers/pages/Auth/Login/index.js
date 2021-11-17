import { CardLogin, Image } from 'components';
import { postLogin } from 'config';
import { config } from 'config/API/url';
import {
  PropTypes,
  React,
  SafeAreaView,
  ScrollView,
  View,
  NetInfo,
  DeviceInfo,
} from 'libraries';
import messaging from '@react-native-firebase/messaging';
import { connect } from 'react-redux';
import SocketIOClient from 'socket.io-client';
import styles from './styles';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validation: {
        email: false,
        password: false,
      },
    };
    this.socket = SocketIOClient(config.url.api); // replace 'environment.serverUrl' with your server url

    // Listens to channel2 and display the data recieved
    this.socket.on('login', data => {
      console.log('Data recieved from server', data); // this will console 'channel 2'
    });
  }

  /**
   * for navigation to register page
   */
  navigationToRegister = () => {
    const { navigation } = this.props;
    navigation.navigate('SIGNUP');
  };

  /**
   * request for login to app
   */
  handlerLogin = async () => {
    const { email, password } = this.state;
    const { reqPostLogin, navigation } = this.props;
    const token = await messaging().getToken();
    const ip = await DeviceInfo.getIpAddress();
    const payload = {
      body: {
        fcm_reg_code: token,
        email,
        password,
        ip_address: ip,
      },
    };
    this.socket.emit('login', payload); // emits 'hi server' to your server

    const res = await reqPostLogin(payload);
    if (res.success) {
      if (res.user.roleId === 5)
        return navigation.reset({
          index: 0,
          routes: [{ name: 'MAINMENU' }],
        });

      return navigation.reset({
        index: 0,
        routes: [{ name: 'DASHBOARD' }],
      });
    }
  };

  /**
   * navigation to forgot oassworf page
   */
  toForgotPassword = () => {
    const { navigation } = this.props;
    navigation.navigate('FORGOTPASSWORD');
  };

  /**
   * renering page
   */
  render() {
    const { navigationToRegister, handlerLogin, toForgotPassword } = this;

    const { email, password, validation } = this.state;

    return (
      <Image source="img-login" style={styles.imageBackground} imageBackground>
        <SafeAreaView style={styles.imageBackground}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.content}>
              <CardLogin
                onPress={handlerLogin}
                toRegister={navigationToRegister}
                email={email}
                password={password}
                onChangeEmail={v => this.setState({ email: v })}
                onChangePassword={v => this.setState({ password: v })}
                validationEmail={validation.email}
                validationPassword={validation.password}
                toForgotPassword={toForgotPassword}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Image>
    );
  }
}

Login.defaultProps = {
  reqPostLogin: () => {},
};

Login.propTypes = {
  reqPostLogin: PropTypes.func,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  reqPostLogin: p => dispatch(postLogin(p)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
