import { React, View, PropTypes } from 'libraries';
import { CreateUserView } from 'components';
import { postRegister } from 'config';
import { connect } from 'react-redux';

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        fullname: '',
        phone: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      },
      validation: {
        phone: false,
        email: false,
        password: false,
        fullname: false,
        passwordConfirmation: false,
      },
    };
  }

  /**
   * for seding data to action
   */
  handlerRegister = async () => {
    const { form } = this.state;
    const { phone, email, password, fullname } = form;
    const { reqPostSignUp } = this.props;
    const lengthName = fullname.split(' ').length;
    const firstname =
      lengthName === 1
        ? fullname
        : fullname
            .split(' ')
            .slice(0, -1)
            .join(' ');
    const lastname = fullname
      .split(' ')
      .slice(-1)
      .join(' ');

    const payload = {
      body: {
        first: firstname,
        last: lastname,
        email,
        phone,
        password,
        roleId: 1,
      },
    };
    const res = await reqPostSignUp(payload);
    if (res.success) {
      return this.setState({
        form: {
          fullname: '',
          phone: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        },
      });
    }
  };

  /**
   * navigation to page list account
   */
  toListAccounst = () => {
    const { navigation } = this.props;
    navigation.navigate('LISTADMINACCOUNT');
  };

  /**
   * for change input text
   * @param {*} value
   * @param {*} type
   */
  onChangeText = (value, type) => {
    const { form } = { ...this.state };
    form[type] = value;
    return this.setState({ form });
  };

  /**
   * for rendering page
   */
  render() {
    const { toListAccounst, onChangeText, handlerRegister } = this;
    const { form, validation } = this.state;
    const { phone, email, password, fullname, passwordConfirmation } = form;
    return (
      <CreateUserView
        toListAccounst={toListAccounst}
        onChangeText={onChangeText}
        handlerRegister={handlerRegister}
        valuePass={password}
        valueEmail={email}
        valuePhone={phone}
        valueConfPass={passwordConfirmation}
        valueFullname={fullname}
        validationFullname={validation.fullname}
        validationPass={validation.password}
        validationEmail={validation.email}
        validationPhone={validation.phone}
        validationConfPass={validation.passwordConfirmation}
      />
    );
  }
}

CreateUser.defaultProps = {
  reqPostSignUp: () => {},
};

CreateUser.propTypes = {
  reqPostSignUp: PropTypes.func,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  reqPostSignUp: p => dispatch(postRegister(p)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
