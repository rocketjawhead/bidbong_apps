/* eslint-disable import/no-cycle */
import {React, View, PropTypes, TouchableOpacity} from 'libraries';
import {Text, FormInputText} from 'components/atoms';
import {Button} from 'components/molecules';
import _ from 'lodash';
import {Validator} from 'utils';
import styles from './styles';

class CardSignUp extends React.Component {
  validationForm = () => {
    const {
      valueEmail,
      valuePhone,
      valuePass,
      valueFullname,
      valueConfPass,
    } = this.props;

    const isEmail = new Validator(valueEmail).isRequired().isEmail();

    const isPhone = new Validator(valuePhone).isRequired().numberOnly();
    const isPassword = new Validator(valuePass).isRequired().isPassword();
    const isFullname = new Validator(valueFullname).isRequired().alphabetOnly();
    const isNotSame = valuePass !== valueConfPass;

    if (
      !_.isEmpty(isEmail.error) ||
      !_.isEmpty(isPhone.error) ||
      !_.isEmpty(isPassword.error) ||
      !_.isEmpty(isFullname.error) ||
      isNotSame ||
      _.isEmpty(valueEmail) ||
      _.isEmpty(valuePhone) ||
      _.isEmpty(valuePass) ||
      _.isEmpty(valueFullname)
    ) {
      return true;
    }
    return false;
  };

  render() {
    const {validationForm} = this;

    const {
      toLogin,
      setPass,
      setEmail,
      setPhone,
      setFullname,
      setConfPass,
      valuePass,
      valueEmail,
      valuePhone,
      valueFullname,
      valueConfPass,
      validationPhone,
      validationFullname,
      validationEmail,
      validationPass,
      handleRegister,
    } = this.props;

    return (
      <View style={styles.content}>
        <Text style={styles.txtLogin} light animated>
          register.title
        </Text>
        <Text style={styles.txtLogin} bold animated>
          register.subtitle
        </Text>
        <View style={styles.carding}>
          <FormInputText
            placeholder="register.input.fullname"
            leftIcon="user"
            isIcon
            iconLeftStyle={styles.leftIcon}
            containerStyle={styles.input}
            onChangeText={setFullname}
            value={valueFullname}
            validation={validationFullname}
            validate={() => new Validator(valueFullname).alphabetOnly()}
          />
          <FormInputText
            placeholder="register.input.phone"
            typeIcon="Feather"
            leftIcon="phone"
            keyboardType="numeric"
            isIcon
            iconLeftStyle={styles.leftIcon}
            containerStyle={styles.input}
            onChangeText={setPhone}
            value={valuePhone}
            validation={validationPhone}
            validate={() => new Validator(valuePhone).numberOnly()}
          />
          <FormInputText
            placeholder="register.input.email"
            leftIcon="mail"
            isIcon
            keyboardType="email-address"
            iconLeftStyle={styles.leftIcon}
            containerStyle={styles.input}
            onChangeText={setEmail}
            value={valueEmail}
            validation={validationEmail}
            validate={() => new Validator(valueEmail).isEmail()}
          />
          <FormInputText
            placeholder="register.input.password"
            leftIcon="lock"
            typeIcon="Feather"
            isIcon
            isPassword
            iconLeftStyle={styles.leftIcon}
            containerStyle={styles.input}
            onChangeText={setPass}
            value={valuePass}
            validation={validationPass}
            validate={() => new Validator(valuePass).isPassword()}
          />
          <FormInputText
            placeholder="register.input.confirmPassword"
            leftIcon="lock"
            typeIcon="Feather"
            isIcon
            iconLeftStyle={styles.leftIcon}
            containerStyle={styles.input}
            onChangeText={setConfPass}
            value={valueConfPass}
            isPassword
            validation={validationPass}
            validate={() => new Validator(valueConfPass).isPassword()}
          />
          <View style={{height: 75}}>
            <Button
              title="register.button.signup"
              onPress={handleRegister}
              disabled={validationForm()}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={styles.dontHaveAccount}>
              register.text.haveAccount
            </Text>
            <TouchableOpacity onPress={toLogin}>
              <Text bold style={styles.dontHaveAccount}>
                register.button.signin
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

CardSignUp.defaultProps = {
  valuePass: '',
  valuePhone: '',
  valueEmail: '',
  valueConfPass: '',
  valueFullname: '',
  validationPass: false,
  validationEmail: false,
  validationPhone: false,
  validationFullname: false,
  toLogin: () => {},
  setPass: () => {},
  setEmail: () => {},
  setPhone: () => {},
  setConfPass: () => {},
  setFullname: () => {},
  handleRegister: () => {},
};

CardSignUp.propTypes = {
  toLogin: PropTypes.func,
  setPass: PropTypes.func,
  setEmail: PropTypes.func,
  setPhone: PropTypes.func,
  valuePass: PropTypes.string,
  valuePhone: PropTypes.string,
  valueEmail: PropTypes.string,
  setConfPass: PropTypes.func,
  setFullname: PropTypes.func,
  valueConfPass: PropTypes.string,
  valueFullname: PropTypes.string,
  validationPass: PropTypes.bool,
  handleRegister: PropTypes.func,
  validationEmail: PropTypes.bool,
  validationPhone: PropTypes.bool,
  validationFullname: PropTypes.bool,
};

export default CardSignUp;
