import { React, PropTypes } from 'libraries';
import { EditProfileView, ModalListShipping } from 'components';
import {
  postUpdateProfile,
  setSehipping,
  getShippingUser,
  getProfile,
} from 'config';
import { connect } from 'react-redux';

class EditProfile extends React.Component {
  state = {
    visible: false,
    shipping: {},
  };

  componentDidMount() {
    const { initialState } = this;
    const { reqGetShipping } = this.props;
    initialState();
    reqGetShipping();
  }

  initialState = () => {
    const { profile } = this.props;
    this.setState({
      id: profile.id,
      fullname: profile.first + profile.last,
      email: profile.email,
      password: profile.password || '',
      phone: profile.phone,
      isShow: true,
      address: profile.address || '',
      city: profile.city || '',
      zipPostCode: profile.zipcode || '',
      country: profile.country || '',
      state: profile.state || '',
    });
  };

  /**
   * function for request update profile
   */
  handlerUpdateProfile = async () => {
    const {
      phone,
      email,
      password,
      fullname,
      id,
      shipping,
      address,
      city,
      state,
      zipPostCode,
    } = this.state;
    const { reqPostUpdateProfile, reqGetProfile } = this.props;
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
    let payload = {
      body: {
        id,
        first: firstname,
        last: lastname,
        email,
        phone,
        address,
        city,
        state,
        zipPostCode,
        roleId: 5,
        country: shipping.shippingCode,
        shippingType: shipping.id,
      },
    };

    if (password) {
      payload = {
        body: {
          id,
          first: firstname,
          last: lastname,
          email,
          phone,
          address,
          city,
          state,
          zipPostCode,
          password,
          roleId: 5,
          country: shipping.shippingCode,
          shippingType: shipping.id,
        },
      };
    }
    const res = await reqPostUpdateProfile(payload);
    if (res.success) {
      reqGetProfile();
    }
  };

  /**
   * for change address form
   * @param {} value
   * @param {*} type
   */
  onChangeAddress = (value, type) => {
    switch (type) {
      case 'address':
        return this.setState({ address: value });
      case 'city':
        return this.setState({ city: value });
      case 'state':
        return this.setState({ state: value });
      case 'zipPostCode':
        return this.setState({ zipPostCode: value });
      default:
        return null;
    }
  };

  /**
   * function for set selected shipping
   * @param {} id
   */
  handlerChooseShipping = id => {
    const { listShipping } = this.props;
    const data = listShipping.filter(x => x.id === id);
    this.setState({ shipping: data[0], visible: false });
  };

  /**
   * function for showing modal
   */
  handlerModal = () => {
    const { visible } = this.state;
    this.setState({ visible: !visible });
  };

  /**
   * rendering page
   */
  render() {
    const {
      fullname,
      lastname,
      email,
      password,
      phone,
      isShow,
      address,
      city,
      zipPostCode,
      country,
      state,
      visible,
      shipping,
    } = this.state;
    const {
      handlerUpdateProfile,
      onChangeAddress,
      handlerChooseShipping,
      handlerModal,
    } = this;
    const { listShipping } = this.props;
    return (
      <React.Fragment>
        <EditProfileView
          onChangeFullname={v => this.setState({ fullname: v })}
          onChangeLastname={v => this.setState({ lastname: v })}
          onChangeEmail={v => this.setState({ email: v })}
          onChangePassword={v => this.setState({ password: v })}
          onChangePhone={v => this.setState({ phone: v })}
          showPass={() => this.setState({ isShow: !isShow })}
          onPress={handlerUpdateProfile}
          fullname={fullname}
          lastname={lastname}
          email={email}
          password={password}
          phone={phone}
          handlerModal={handlerModal}
          isShow={isShow}
          address={address}
          city={city}
          zipPostCode={zipPostCode}
          shipping={shipping}
          country={country}
          state={state}
          onChangeAddress={onChangeAddress}
        />
        <ModalListShipping
          visible={visible}
          onPress={handlerChooseShipping}
          reqClose={handlerModal}
          listShipping={listShipping}
        />
      </React.Fragment>
    );
  }
}

EditProfile.defaultProps = {
  profile: {},
  listShipping: [],
  reqGetShipping: () => {},
  reqPostUpdateProfile: () => {},
};

EditProfile.propTypes = {
  profile: PropTypes.object,
  listShipping: PropTypes.array,
  reqGetProfile: PropTypes.func,
  reqGetShipping: PropTypes.func,
  reqPostUpdateProfile: PropTypes.func,
};

const mapStateToProps = state => ({
  profile: state.auth.profile,
  listShipping: state.shipping.shippingList,
});

const mapDispatchToProps = dispatch => ({
  reqGetProfile: () => dispatch(getProfile()),
  reqSetSehipping: p => dispatch(setSehipping(p)),
  reqGetShipping: p => dispatch(getShippingUser(p)),
  reqPostUpdateProfile: p => dispatch(postUpdateProfile(p)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
