import { React, Fragment, PropTypes } from 'libraries';
import { ListAdminAccountView, ModalActionListAdmin } from 'components';
import { getListUsers, deleteUser } from 'config';
import { connect } from 'react-redux';

class ListAdminAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAction: false,
      type: 'delete',
      selectedUser: {},
    };
  }

  componentDidMount() {
    const { reqGetListUsers } = this.props;
    reqGetListUsers();
  }

  /**
   * function onpress button action
   * @param {*} type
   * @param {*} data
   */
  onPressAction = (type = '', data) => {
    const { modalAction } = this.state;
    const { navigation } = this.props;
    if (type === 'edit') {
      return navigation.navigate('EDITPROFILEADMIN', { data });
    }
    this.setState({ modalAction: !modalAction, type, selectedUser: data });
  };

  /**
   * function for request delete user admin
   * @param {*} id
   */
  handlerDeleteUser = async id => {
    const { reqDeleteUser, listUser, profile, reqGetListUsers } = this.props;
    const lengListUser = listUser.length;
    const isSameId = id === profile.id;
    if (isSameId) return this.setState({ type: 'same' });
    if (lengListUser === 1) return this.setState({ type: 'cant' });
    const payload = {
      url: id,
    };
    this.setState({ modalAction: false });
    try {
      const res = await reqDeleteUser(payload);
      if (res.success) {
        reqGetListUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * navigation to edit profile
   * @param {} data
   */
  toEditProfile = data => {
    const { navigation } = this.props;
    navigation.navigate('EDITPROFILEADMIN', { data });
  };

  /**
   * rendering page
   */
  render() {
    const { modalAction, type, selectedUser } = this.state;
    const { onPressAction, handlerDeleteUser, toEditProfile } = this;
    const { listUser } = this.props;
    const totalAdminUser = listUser.filter(x => x.id === 1).length;
    return (
      <Fragment>
        <ListAdminAccountView
          onPressAction={onPressAction}
          listUser={listUser}
          totalUser={totalAdminUser}
        />
        <ModalActionListAdmin
          visible={modalAction}
          type={type}
          reqClose={onPressAction}
          handlerDeleteUser={handlerDeleteUser}
          selectedUser={selectedUser}
        />
      </Fragment>
    );
  }
}

ListAdminAccount.defaultProps = {
  listUser: [],
  profile: {},
  reqGetListUsers: () => {},
  reqDeleteUser: () => {},
};

ListAdminAccount.propTypes = {
  listUser: PropTypes.array,
  profile: PropTypes.object,
  reqGetListUsers: PropTypes.func,
  reqDeleteUser: PropTypes.func,
};

const mapStateToProps = state => ({
  listUser: state.user.listUsers,
  profile: state.auth.profile,
});

const mapDispatchToProps = dispatch => ({
  reqGetListUsers: () => dispatch(getListUsers()),
  reqDeleteUser: p => dispatch(deleteUser(p)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListAdminAccount);
