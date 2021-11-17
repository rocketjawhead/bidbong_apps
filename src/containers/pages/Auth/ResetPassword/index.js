import { ResetPassword as ResetPasswordPage } from 'components';
import { React, PropTypes } from 'libraries';
import { connect } from 'react-redux';
import { changeModalLoading, reqSetNewPassword } from 'config';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
    };
  }

  /**
   * for request new password
   */
  handlerSetPassword = async () => {
    const { password } = this.state;
    const {
      token,
      userDetail,
      navigation,
      reqPostNewPassword,
      reqChangeModalLoading,
    } = this.props;
    reqChangeModalLoading(true);
    try {
      const payload = {
        body: {
          password,
          userId: userDetail.data.refId.toString(),
          token,
        },
      };
      const res = await reqPostNewPassword(payload);
      reqChangeModalLoading(false);

      if (res.success) {
        return navigation.reset({
          index: 0,
          routes: [{ name: 'LOGIN' }],
        });
      }
    } catch (error) {
      reqChangeModalLoading(false);
    }
  };

  /**
   * for change text
   * @param {} value
   * @param {*} type
   */
  onChangeText = (value, type) => {
    switch (type) {
      case 'password':
        return this.setState({ password: value });
      case 'confpass':
        return this.setState({ confirmPassword: value });
      default:
        return null;
    }
  };

  /**
   * for rendering page
   */
  render() {
    const { password, confirmPassword } = this.state;
    const { handlerSetPassword, onChangeText } = this;
    return (
      <ResetPasswordPage
        password={password}
        onChangeText={onChangeText}
        confirmPassword={confirmPassword}
        handlerSetPassword={handlerSetPassword}
      />
    );
  }
}

ResetPassword.defaultProps = {
  token: '',
  userDetail: {},
  reqPostNewPassword: () => {},
  reqChangeModalLoading: () => {},
};

ResetPassword.propTypes = {
  token: PropTypes.string,
  userDetail: PropTypes.object,
  reqPostNewPassword: PropTypes.func,
  reqChangeModalLoading: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  token: props.route.params.token,
  userDetail: props.route.params.data,
});

const mapDispatchToProps = dispatch => ({
  reqPostNewPassword: p => dispatch(reqSetNewPassword(p)),
  reqChangeModalLoading: p => dispatch(changeModalLoading(p)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
