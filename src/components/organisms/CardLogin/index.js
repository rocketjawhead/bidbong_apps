/* eslint-disable import/no-cycle */
import { React, View, TouchableOpacity, PropTypes } from 'libraries';
import { Text, FormInputText } from 'components/atoms';
import _ from 'lodash';
import { Validator } from 'utils';
import { Button } from 'components/molecules';
import styles from './styles';

class CardLogin extends React.Component {
  validationForm = () => {
    const { email, password } = this.props;

    const isEmail = new Validator(email).isRequired().isEmail();
    const isPassword = new Validator(password).isRequired();

    if (
      !_.isEmpty(isEmail.error) ||
      !_.isEmpty(isPassword.error) ||
      _.isEmpty(email) ||
      _.isEmpty(password)
    ) {
      return true;
    }
    return false;
  };

  render() {
    /**
     * ====================
     * CALL PROPS
     * ====================
     */
    const {
      toRegister,
      email,
      onChangeEmail,
      password,
      onChangePassword,
      onPress,
      toForgotPassword,
    } = this.props;

    /**
     * =========================
     * CALL FUNCTION
     * =========================
     */
    const { validationForm } = this;

    return (
      <View style={styles.content}>
        <Text style={styles.txtLogin} light animated>
          login.title
        </Text>
        <Text style={styles.txtLogin} bold animated>
          login.subtitle
        </Text>
        <View style={styles.carding}>
          <FormInputText
            placeholder="login.input.email"
            leftIcon="ic-user"
            iconLeftStyle={styles.leftIcon}
            containerStyle={styles.input}
            value={email}
            validate={() => new Validator(email).isEmail().isRequired()}
            onChangeText={onChangeEmail}
          />
          <FormInputText
            placeholder="login.input.password"
            leftIcon="ic-lock"
            isPassword
            iconLeftStyle={styles.leftIcon}
            containerStyle={styles.input}
            onChangeText={onChangePassword}
            value={password}
            validate={() => new Validator(password).isRequired()}
          />
          <TouchableOpacity onPress={toForgotPassword}>
            <Text style={styles.forgotPass}>login.text.forgotPassword</Text>
          </TouchableOpacity>
          <View style={{ height: 75 }}>
            <Button
              title="login.button.signin"
              disabled={validationForm()}
              onPress={onPress}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={styles.dontHaveAccount}>
              login.text.dontHaveAccount
            </Text>
            <TouchableOpacity onPress={toRegister}>
              <Text bold style={styles.dontHaveAccount}>
                login.button.signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

CardLogin.defaultProps = {
  email: '',
  password: '',
  onPress: () => {},
  toRegister: () => {},
  onChangeEmail: () => {},
  onChangePassword: () => {},
  toForgotPassword: () => {},
};

CardLogin.propTypes = {
  email: PropTypes.string,
  onPress: PropTypes.func,
  password: PropTypes.string,
  toRegister: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  toForgotPassword: PropTypes.func,
};

export default CardLogin;
