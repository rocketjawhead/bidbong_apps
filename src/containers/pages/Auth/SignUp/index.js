import {
  React,
  Component,
  ScrollView,
  SafeAreaView,
  PropTypes,
} from 'libraries';
import { Image, CardSignUp } from 'components';
import { postRegister } from 'config';
import { connect } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import styles from './styles';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      email: '',
      password: '',
      fullname: '',
      passwordConfirmation: '',
      validation: {
        phone: false,
        email: false,
        password: false,
        fullname: false,
        passwordConfirmation: false,
      },
    };
  }

  /**
   * for request register
   */
  handlerRegister = async () => {
    const { phone, email, password, fullname } = this.state;
    const { reqPostSignUp } = this.props;
    const lengthName = fullname.split(' ').length;
    const token = await messaging().getToken();

    const firstname =
      lengthName === 1
        ? fullname
        : fullname
            .split(' ')
            .slice(0, -1)
            .join(' ');
    const lastname = fullname
      .split(' ')
      .slice(-1)
      .join(' ');

    const payload = {
      body: {
        first: firstname,
        last: lastname,
        email,
        phone,
        password,
        roleId: 5,
        // fcm_reg_code: token,
      },
    };
    const res = await reqPostSignUp(payload);
    if (res.success) {
      return this.setState(
        {
          phone: '',
          email: '',
          password: '',
          fullname: '',
          passwordConfirmation: '',
        },
        () => this.toLogin(),
      );
    }
  };

  /**
   * navigation to login page
   */
  toLogin = () => {
    const { navigation } = this.props;
    return navigation.navigate('LOGIN');
  };

  /**
   * rendering page
   */
  render() {
    /**
     *=======================
     * CALL FUNCTION
     *=======================
     */
    const { handlerRegister, toLogin } = this;

    /**
     * =======================
     * CALL STATE
     * =======================
     */
    const {
      email,
      phone,
      password,
      fullname,
      validation,
      passwordConfirmation,
    } = this.state;

    return (
      <Image source="img-login" style={styles.imageBackground} imageBackground>
        <SafeAreaView style={styles.imageBackground}>
          <ScrollView contentContainerStyle={styles.container}>
            <CardSignUp
              toLogin={toLogin}
              setPass={v => this.setState({ password: v })}
              setEmail={v => this.setState({ email: v })}
              setPhone={v => this.setState({ phone: v })}
              setConfPass={v => this.setState({ passwordConfirmation: v })}
              setFullname={v => this.setState({ fullname: v })}
              handleRegister={handlerRegister}
              valuePass={password}
              valueEmail={email}
              valuePhone={phone}
              valueConfPass={passwordConfirmation}
              valueFullname={fullname}
              validationFullname={validation.fullname}
              validationPass={validation.password}
              validationEmail={validation.email}
              validationPhone={validation.phone}
              validationConfPass={validation.passwordConfirmation}
            />
          </ScrollView>
        </SafeAreaView>
      </Image>
    );
  }
}

SignUp.defaultProps = {
  reqPostSignUp: () => {},
};

SignUp.propTypes = {
  reqPostSignUp: PropTypes.func,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  reqPostSignUp: p => dispatch(postRegister(p)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
