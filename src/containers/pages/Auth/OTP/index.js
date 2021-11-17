/* eslint-disable no-shadow */
import {
  React,
  Component,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  PropTypes,
} from 'libraries';
import { Image, CardOTP } from 'components';
import { connect } from 'react-redux';
import { changeModalLoading, reqResetPassword, reqCheckOTP } from 'config';
import Styles from './styles';

class OTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      otp: '',
    };
  }

  componentDidMount() {
    const { email } = this.props;
    this.setState({ email });
  }

  /**
   * for request OTP
   */
  handlerReqOtp = async () => {
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
      if (res.success) {
        navigation.navigate('OTP', { data: res });
      }
    } catch (error) {
      await reqChangeModalLoading(false);
    }
  };

  /**
   * for sending otp to backend
   */
  handlerSendOTP = async () => {
    const { reqSendOTP, reqChangeModalLoading, navigation } = this.props;
    const { otp } = this.state;
    reqChangeModalLoading(true);
    try {
      const payload = {
        body: {
          token: otp,
        },
      };
      const res = await reqSendOTP(payload);
      reqChangeModalLoading(false);
      if (res.success) {
        return navigation.navigate('RESETPASSWORD', { data: res, token: otp });
      }
    } catch (e) {
      reqChangeModalLoading(false);
    }
  };

  /**
   * go to previous page
   */
  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    const { goBack, handlerSendOTP } = this;
    const { otp } = this.state;
    return (
      <Image source="img-OTP" style={Styles.imageBackground} imageBackground>
        <SafeAreaView style={Styles.imageBackground}>
          <TouchableOpacity style={Styles.backButton} onPress={goBack}>
            <Image contentIcon source="ic-back" imgWidth={30} />
          </TouchableOpacity>
          <ScrollView contentContainerStyle={Styles.container}>
            <CardOTP
              OTP={otp}
              onPress={handlerSendOTP}
              onChangeOTP={otp => this.setState({ otp })}
            />
          </ScrollView>
        </SafeAreaView>
      </Image>
    );
  }
}

OTP.defaultProps = {
  email: '',
  reqSendOTP: () => {},
  reqPostEmail: () => {},
  reqChangeModalLoading: () => {},
};

OTP.propTypes = {
  email: PropTypes.string,
  reqSendOTP: PropTypes.func,
  reqPostEmail: PropTypes.func,
  reqChangeModalLoading: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  email: props.route.params.email,
});

const mapDispatchToProps = dispatch => ({
  reqPostEmail: p => dispatch(reqResetPassword(p)),
  reqChangeModalLoading: p => dispatch(changeModalLoading(p)),
  reqSendOTP: p => dispatch(reqCheckOTP(p)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OTP);
