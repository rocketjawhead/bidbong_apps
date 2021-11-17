import { Button, FormInputText } from 'components';
import { PropTypes, React, View } from 'libraries';
import { Validator } from 'utils';
import _ from 'lodash';
import styles from './styles';

const CardResetPassword = ({
  password,
  confirmPassword,
  onChangeText,
  handlerSetPassword,
}) => {
  const isDisabled = password !== confirmPassword || _.isEmpty(password);
  return (
    <View style={styles.card}>
      <FormInputText
        placeholder="login.input.password"
        leftIcon="ic-lock"
        iconLeftStyle={styles.leftIcon}
        containerStyle={styles.input}
        value={password}
        isPassword
        type="password"
        validate={() => new Validator(password).isRequired().isPassword()}
        onChangeText={onChangeText}
      />
      <FormInputText
        placeholder="login.input.password"
        leftIcon="ic-lock"
        isPassword
        type="confpass"
        iconLeftStyle={styles.leftIcon}
        containerStyle={styles.input}
        onChangeText={onChangeText}
        value={confirmPassword}
        validate={() =>
          new Validator(confirmPassword).isRequired().isPassword()
        }
      />
      <View style={{ height: 80 }}>
        <Button
          title="resetPassword.button"
          onPress={handlerSetPassword}
          disabled={isDisabled}
        />
      </View>
    </View>
  );
};

CardResetPassword.defaultProps = {
  password: '',
  confirmPassword: '',
  onChangeText: () => {},
  handlerSetPassword: () => {},
};

CardResetPassword.propTypes = {
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
  onChangeText: PropTypes.func,
  handlerSetPassword: PropTypes.func,
};

export default React.memo(CardResetPassword);
