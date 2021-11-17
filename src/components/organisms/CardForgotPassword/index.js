/* eslint-disable import/no-cycle */
import { React, View, PropTypes } from 'libraries';
import { Text, Input } from 'components/atoms';
import { Validator } from 'utils';
import { Button } from 'components/molecules';
import _ from 'lodash';
import styles from './styles';

class CardForgotPassword extends React.Component {
  render() {
    const { onPress, email, onChangeEmail } = this.props;
    const isValid = new Validator(email).isRequired().isEmail();
    return (
      <View style={styles.content}>
        <Text style={styles.txtLogin} light animated>
          forgotPassword.title
        </Text>
        <Text style={styles.txtLogin} bold animated>
          forgotPassword.subtitle
        </Text>
        <View style={styles.carding}>
          <View style={{ marginTop: 10 }}>
            <Input
              placeholder="forgotPassword.input.email"
              leftIcon="ic-mail"
              iconLeftStyle={styles.leftIcon}
              containerStyle={styles.input}
              value={email}
              onChangeText={onChangeEmail}
              validate={isValid}
            />
          </View>
          <View style={{ height: 80 }}>
            <Button
              title="forgotPassword.button.send"
              textStyles={styles.buttonText}
              onPress={onPress}
              disabled={isValid.error.length > 0}
            />
          </View>
        </View>
      </View>
    );
  }
}

CardForgotPassword.defaultProps = {
  email: '',
  onPress: () => {},
  onChangeEmail: () => {},
};

CardForgotPassword.propTypes = {
  email: PropTypes.string,
  onPress: PropTypes.func,
  onChangeEmail: PropTypes.func,
};

export default CardForgotPassword;
