import { CardResetPassword, Image, Text } from 'components';
import { React, SafeAreaView, View, PropTypes } from 'libraries';
import styles from './styles';

class ResetPassword extends React.Component {
  render() {
    const {
      password,
      confirmPassword,
      onChangeText,
      handlerSetPassword,
    } = this.props;
    return (
      <Image source="img-OTP" style={styles.imageBackground} imageBackground>
        <SafeAreaView style={styles.container}>
          <View style={styles.textWrapper}>
            <Text style={styles.title}>resetPassword.title</Text>
            <Text style={styles.subtitle}>resetPassword.subtitle</Text>
          </View>
          <CardResetPassword
            password={password}
            confirmPassword={confirmPassword}
            onChangeText={onChangeText}
            handlerSetPassword={handlerSetPassword}
          />
        </SafeAreaView>
      </Image>
    );
  }
}

ResetPassword.defaultProps = {
  password: '',
  confirmPassword: '',
  onChangeText: () => {},
  handlerSetPassword: () => {},
};

ResetPassword.propTypes = {
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
  onChangeText: PropTypes.func,
  handlerSetPassword: PropTypes.func,
};

export default ResetPassword;
