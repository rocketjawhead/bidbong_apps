/* eslint-disable import/no-cycle */
import {
  React,
  View,
  SafeAreaView,
  ScrollView,
  Animated,
  PropTypes,
} from 'libraries';
import {Text, NavigationBar, NavigationHeaderAdmin} from 'components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FormInputText} from 'components/atoms';
import {Button} from 'components/molecules';
import {TouchableOpacity} from 'react-native-gesture-handler';
import _ from 'lodash';
import {Validator} from 'utils';
import styles from './styles';

const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 0;

class EditProdileAdminView extends React.Component {
  constructor(props) {
    super(props);
    this.scrollYAnimatedValue = new Animated.Value(0);
  }

  validationForm = () => {
    const {valueEmail, valuePhone, valueFullname} = this.props;

    const isEmail = new Validator(valueEmail).isRequired().isEmail();
    const isPhone = new Validator(valuePhone).isRequired().numberOnly();
    const isFullname = new Validator(valueFullname).isRequired().alphabetOnly();

    if (
      !_.isEmpty(isEmail.error) ||
      !_.isEmpty(isPhone.error) ||
      !_.isEmpty(isFullname.error) ||
      _.isEmpty(valueEmail) ||
      _.isEmpty(valuePhone) ||
      _.isEmpty(valueFullname)
    ) {
      return true;
    }
    return false;
  };

  render() {
    /**
     * =========================
     * CONST FOR ANIMATION
     * =========================
     */
    const headerHeight = this.scrollYAnimatedValue.interpolate({
      inputRange: [0, 10],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const padding = this.scrollYAnimatedValue.interpolate({
      inputRange: [0, 10],
      outputRange: [-50, 0],
      extrapolate: 'clamp',
    });

    const headerBackgroundColor = this.scrollYAnimatedValue.interpolate({
      inputRange: [0, 10],
      outputRange: ['rgba(255,255,255,0)', '#000'],
    });

    const {
      onChangeText,
      valueEmail,
      valuePhone,
      valueFullname,
      validationPhone,
      validationFullname,
      validationEmail,
      handlerUpdateProfile,
    } = this.props;

    const {validationForm} = this;

    return (
      <View style={styles.bg}>
        <SafeAreaView>
          <ScrollView
            contentContainerStyle={{
              paddingTop: HEADER_MAX_HEIGHT,
            }}
            scrollEventThrottle={16}
            onScroll={Animated.event([
              {nativeEvent: {contentOffset: {y: this.scrollYAnimatedValue}}},
            ])}>
            <View style={styles.mainContainer}>
              <NavigationHeaderAdmin title="editProfileAdmin.title" icon="x" />
              <View style={styles.card}>
                <Text bold>editProfileAdmin.text.fillItem</Text>
                <FormInputText
                  translatePlaceholder={false}
                  label="editProfileAdmin.input.fullname"
                  containerStyle={styles.input}
                  labelStyle={styles.labelStyle}
                  maxLength={40}
                  type="fullname"
                  onChangeText={onChangeText}
                  value={valueFullname}
                  validation={validationFullname}
                  validate={() => new Validator(valueFullname).alphabetOnly()}
                />
                <FormInputText
                  translatePlaceholder={false}
                  label="editProfileAdmin.input.phone"
                  labelStyle={styles.labelStyle}
                  containerStyle={styles.input}
                  keyboardType="numeric"
                  maxLength={14}
                  onChangeText={onChangeText}
                  type="phone"
                  value={valuePhone}
                  validation={validationPhone}
                  validate={() => new Validator(valuePhone).numberOnly()}
                />
                <FormInputText
                  translatePlaceholder={false}
                  label="editProfileAdmin.input.email"
                  labelStyle={styles.labelStyle}
                  containerStyle={styles.input}
                  maxLength={50}
                  onChangeText={onChangeText}
                  type="email"
                  value={valueEmail}
                  validation={validationEmail}
                  validate={() => new Validator(valueEmail).isEmail()}
                />
                <View style={styles.buttonContainer}>
                  <Button
                    title="editProfileAdmin.button.save"
                    disabled={validationForm()}
                    onPress={handlerUpdateProfile}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
          <NavigationBar
            title="Create Admin Account"
            padding={padding}
            height={headerHeight}
            backgroundColor={headerBackgroundColor}
          />
        </SafeAreaView>
      </View>
    );
  }
}

EditProdileAdminView.defaultProps = {
  valuePass: '',
  valuePhone: '',
  valueEmail: '',
  valueConfPass: '',
  valueFullname: '',
  validationPass: false,
  validationEmail: false,
  validationPhone: false,
  validationFullname: false,
  onChangeText: () => {},
  toListAccounst: () => {},
  handlerUpdateProfile: () => {},
};

EditProdileAdminView.propTypes = {
  valuePass: PropTypes.string,
  valuePhone: PropTypes.string,
  valueEmail: PropTypes.string,
  valueConfPass: PropTypes.string,
  valueFullname: PropTypes.string,
  validationPass: PropTypes.bool,
  validationEmail: PropTypes.bool,
  validationPhone: PropTypes.bool,
  validationFullname: PropTypes.bool,
  onChangeText: PropTypes.func,
  toListAccounst: PropTypes.func,
  handlerUpdateProfile: PropTypes.func,
};

export default EditProdileAdminView;
