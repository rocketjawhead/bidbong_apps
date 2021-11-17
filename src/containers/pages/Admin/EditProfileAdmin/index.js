import { React, View, PropTypes } from 'libraries';
import { EditProfileAdminView } from 'components';
import { updateUser } from 'config';
import { connect } from 'react-redux';

class EditProfileAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        id: '',
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

  componentDidMount() {
    const { data } = this.props;
    const name = `${data.first} ${data.last}`;
    this.setState({
      form: {
        id: data.id,
        fullname: name,
        phone: data.phone,
        email: data.email,
      },
    });
  }

  /**
   * function for reqeust update profile
   */
  handlerUpdateProfile = async () => {
    const { form } = this.state;
    const { phone, email, password, fullname } = form;
    const { reqUpdateUser } = this.props;
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
        roleId: 1,
      },
    };
    const res = await reqUpdateUser(payload);
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
   * navigation to list account
   */
  toListAccounst = () => {
    const { navigation } = this.props;
    return navigation.reset({
      index: 0,
      routes: [{ name: 'LISTADMINACCOUNT' }],
    });
  };

  /**
   * for change text
   * @param {*} value
   * @param {*} type
   */
  onChangeText = (value, type) => {
    const { form } = { ...this.state };
    form[type] = value;
    return this.setState({ form });
  };

  /**
   * rendering page
   */
  render() {
    const { toListAccounst, onChangeText, handlerUpdateProfile } = this;
    const { form, validation } = this.state;
    const { phone, email, password, fullname, passwordConfirmation } = form;
    return (
      <EditProfileAdminView
        toListAccounst={toListAccounst}
        onChangeText={onChangeText}
        handlerUpdateProfile={handlerUpdateProfile}
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

EditProfileAdmin.defaultProps = {
  data: {},
  reqUpdateUser: () => {},
};

EditProfileAdmin.propTypes = {
  data: PropTypes.object,
  reqUpdateUser: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  data: props.route.params.data,
});

const mapDispatchToProps = dispatch => ({
  reqUpdateUser: p => dispatch(updateUser(p)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileAdmin);
