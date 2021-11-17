/* eslint-disable import/no-cycle */
import {
  React,
  View,
  SafeAreaView,
  ScrollView,
  PropTypes,
  TouchableOpacity,
} from 'libraries';
import { NavigationHeader, Text, FormInputText, Button } from 'components';
import Icon from 'react-native-vector-icons/Entypo';

import { Validator } from 'utils';
import _ from 'lodash';
import styles from './styles';

class EditProfileView extends React.PureComponent {
  validationForm = () => {
    const {
      fullname,
      password,
      email,
      phone,
      city,
      state,
      address,
      zipPostCode,
      shipping,
    } = this.props;

    const isEmail = new Validator(email).isRequired().isEmail();

    const isPhone = new Validator(phone).isRequired().numberOnly();
    const isFullname = new Validator(fullname).isRequired().alphabetOnly();

    if (
      !_.isEmpty(isEmail.error) ||
      !_.isEmpty(isPhone.error) ||
      !_.isEmpty(isFullname.error) ||
      _.isEmpty(email) ||
      _.isEmpty(phone) ||
      _.isEmpty(fullname) ||
      _.isEmpty(city) ||
      _.isEmpty(address) ||
      _.isEmpty(state) ||
      _.isEmpty(zipPostCode) ||
      _.isEmpty(shipping)
    ) {
      return true;
    }
    return false;
  };

  _renderButtonCountry = () => {
    const { shipping } = this.props;
    const isEmpty = _.isEmpty(shipping);
    if (isEmpty) {
      return <Text style={styles.placeholder}>checkout.input.country</Text>;
    }

    return (
      <Text style={styles.placeholder} translate={false}>
        {shipping.country}
      </Text>
    );
  };

  render() {
    const {
      fullname,
      password,
      email,
      phone,
      onChangePhone,
      onChangePassword,
      onChangeFullname,
      onChangeEmail,
      isShow,
      showPass,
      onPress,
      handlerModal,
      address,
      city,
      zipPostCode,
      country,
      state,
      onChangeAddress,
    } = this.props;
    return (
      <SafeAreaView style={styles.background}>
        <View style={{ marginLeft: 24, marginTop: 24 }}>
          <NavigationHeader />
          <Text h3 style={styles.title}>
            editProfile.title
          </Text>
        </View>
        <ScrollView containerStyle={{ flexGrow: 1, flex: 1 }}>
          <View style={styles.card}>
            <View style={styles.content.header}>
              <View style={styles.square}>
                <Text bold style={styles.text.number} translate={false}>
                  1
                </Text>
              </View>
              <Text style={styles.text.subtitle}>editProfile.subtitle</Text>
            </View>
            <FormInputText
              translatePlaceholder={false}
              labelStyle={styles.input.label}
              value={fullname}
              onChangeText={onChangeFullname}
              validate={() => new Validator(fullname).alphabetOnly()}
              label="editProfile.placeholder.firstname"
              containerStyle={styles.input.container}
            />
            <FormInputText
              translatePlaceholder={false}
              labelStyle={styles.input.label}
              value={email}
              onChangeText={onChangeEmail}
              validate={() => new Validator(email).isEmail()}
              label="editProfile.placeholder.email"
              containerStyle={styles.input.container}
            />
            <View style={styles.input.password}>
              <FormInputText
                translatePlaceholder={false}
                labelStyle={styles.input.label}
                value={password}
                onChangeText={onChangePassword}
                validate={() => new Validator(password).isPassword()}
                label="editProfile.placeholder.password"
                containerStyle={{ flex: 1 }}
                noBorder
                isPassword={isShow}
              />
              <TouchableOpacity onPress={showPass}>
                <Text style={styles.button.show}>editProfile.button.show</Text>
              </TouchableOpacity>
            </View>
            <FormInputText
              translatePlaceholder={false}
              labelStyle={styles.input.label}
              value={phone}
              onChangeText={onChangePhone}
              validate={() => new Validator(phone).numberOnly()}
              label="editProfile.placeholder.phone"
              containerStyle={styles.input.container}
            />
          </View>
          <View style={styles.card}>
            <View style={styles.content.header}>
              <View style={styles.square}>
                <Text bold style={styles.text.number} translate={false}>
                  2
                </Text>
              </View>
              <Text style={styles.text.subtitle}>checkout.text.shipping</Text>
            </View>
            <FormInputText
              labelStyle={styles.input.label}
              placeholder="checkout.input.address"
              containerStyle={styles.input.container}
              type="address"
              maxLength={50}
              value={address}
              onChangeText={onChangeAddress}
              validate={() => new Validator(address).isRequired()}
            />
            <FormInputText
              labelStyle={styles.input.label}
              placeholder="checkout.input.city"
              containerStyle={styles.input.container}
              type="city"
              value={city}
              maxLength={20}
              onChangeText={onChangeAddress}
              validate={() => new Validator(city).isRequired()}
            />
            <FormInputText
              labelStyle={styles.input.label}
              placeholder="checkout.input.state"
              containerStyle={styles.input.container}
              type="state"
              value={state}
              maxLength={25}
              onChangeText={onChangeAddress}
              validate={() => new Validator(state).isRequired()}
            />
            <FormInputText
              labelStyle={styles.input.label}
              placeholder="checkout.input.zipcode"
              containerStyle={styles.input.container}
              type="zipPostCode"
              value={zipPostCode}
              maxLength={10}
              keyboardType="numeric"
              onChangeText={onChangeAddress}
              validate={() => new Validator(zipPostCode).isRequired()}
            />
            <TouchableOpacity
              style={styles.btnSelectCountry}
              onPress={handlerModal}>
              {this._renderButtonCountry()}
              <Icon name="chevron-small-down" style={styles.iconDown} />
            </TouchableOpacity>
            <View style={{ height: 75 }}>
              <Button
                title="editProfile.button.save"
                disabled={this.validationForm()}
                onPress={onPress}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

EditProfileView.defaultProps = {
  fullname: '',
  phone: '',
  password: '',
  email: '',
  isShow: false,
  shipping: {},
  onPress: () => {},
  showPass: () => {},
  address: '',
  handlerModal: () => {},
  city: '',
  zipPostCode: '',
  country: '',
  state: '',
  onChangeAddress: () => {},
  onChangeFullname: () => {},
  onChangeEmail: () => {},
  onChangePassword: () => {},
  onChangePhone: () => {},
};

EditProfileView.propTypes = {
  fullname: PropTypes.string,
  onPress: PropTypes.func,
  phone: PropTypes.string,
  shipping: PropTypes.object,
  password: PropTypes.string,
  email: PropTypes.string,
  address: PropTypes.string,
  city: PropTypes.string,
  onChangeAddress: PropTypes.func,
  handlerModal: PropTypes.func,
  zipPostCode: PropTypes.string,
  country: PropTypes.string,
  state: PropTypes.string,
  isShow: PropTypes.bool,
  showPass: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangeFullname: PropTypes.func,
  onChangePassword: PropTypes.func,
  onChangePhone: PropTypes.func,
};

export default EditProfileView;
