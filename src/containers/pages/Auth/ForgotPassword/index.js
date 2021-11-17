import {
  React,
  Component,
  ScrollView,
  TouchableOpacity,
  PropTypes,
  SafeAreaView,
} from 'libraries';
import { Image, CardForgotPassword } from 'components';
import { changeModalLoading, reqResetPassword } from 'config';
import { connect } from 'react-redux';
import styles from './styles';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  /**
   * for request forgot password
   */
  handlerForgotPassword = async () => {
    const { reqPostEmail, reqChangeModalLoading, navigation } = this.props;
    const { email } = this.state;
    try {
      await reqChangeModalLoading(true);
      const payload = {
        body: {
          email,
        },
      };
      const res = await reqPostEmail(payload);
      await reqChangeModalLoading(false);
      if (res.success) {
        navigation.navigate('OTP', { email });
      }
    } catch (error) {
      await reqChangeModalLoading(false);
    }
  };

  /**
   * for change input email
   * @param {} p
   */
  onChangeEmail = p => {
    this.setState({ email: p });
  };

  /**
   * go to previous page
   */
  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  /**
   * for rendering page
   */
  render() {
    const { handlerForgotPassword, goBack, onChangeEmail } = this;
    const { email } = this.state;
    return (
      <Image source="img-OTP" style={styles.imageBackground} imageBackground>
        <SafeAreaView style={styles.imageBackground}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Image contentIcon source="ic-back" imgWidth={30} />
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.container}>
            <CardForgotPassword
              onPress={handlerForgotPassword}
              email={email}
              onChangeEmail={onChangeEmail}
            />
          </ScrollView>
        </SafeAreaView>
      </Image>
    );
  }
}

ForgotPassword.defaultProps = {
  reqPostEmail: () => {},
  reqChangeModalLoading: () => {},
};

ForgotPassword.propTypes = {
  reqPostEmail: PropTypes.func,
  reqChangeModalLoading: PropTypes.func,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  reqPostEmail: p => dispatch(reqResetPassword(p)),
  reqChangeModalLoading: p => dispatch(changeModalLoading(p)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
