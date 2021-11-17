/* eslint-disable import/no-cycle */
import { React, View, PropTypes } from 'libraries';
import { Text, Button } from 'components';
import OtpInputs from 'react-native-otp-inputs';
import styles from './styles';

class CardOTP extends React.Component {
  render() {
    const { onPress, onChangeOTP, OTP } = this.props;
    const isDisabled = OTP.length !== 4;
    return (
      <View style={styles.content}>
        <Text style={styles.txtLogin} light animated>
          OTP.title
        </Text>
        <Text style={styles.txtLogin} bold animated>
          OTP.subtitle
        </Text>
        <View style={styles.carding}>
          <OtpInputs
            ref={this.otpRef}
            handleChange={code => onChangeOTP(code)}
            numberOfInputs={4}
            inputStyles={styles.OTP}
          />
          <View style={{ height: 75 }}>
            <Button
              disabled={isDisabled}
              title="OTP.button.send"
              textStyles={styles.buttonText}
              onPress={onPress}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={styles.dontHaveAccount}>OTP.text.dontReceiveCode</Text>
            <Text bold style={styles.dontHaveAccount}>
              OTP.button.resend
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

CardOTP.defaultProps = {
  OTP: '',
  onPress: () => {},
  onChangeOTP: () => {},
};

CardOTP.propTypes = {
  OTP: PropTypes.string,
  onPress: PropTypes.func,
  onChangeOTP: PropTypes.func,
};

export default CardOTP;
