import { React, View, PropTypes } from 'libraries';
import { Navbar } from 'components';
import {
  setToken,
  getListKey,
  getUserBid,
  getProfile,
  setAllRoom,
  getUserKey,
  getLiveRoom,
  getWaitingRoom,
  changeModalLoading,
  clearListRoom,
  getEndRoom,
} from 'config';
import { StackActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import { func } from 'utils';
import _ from 'lodash';
import { config } from 'config/API/url';
import SocketIOClient from 'socket.io-client';
import Home from './Home';
import Store from './Store';
import Profile from './Profile';

class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      avatar: '',
      refreshHome: false,
    };
  }

  async componentDidMount() {
    const { reqChangeModalLoading } = this.props;
    const { handlerSetToken, getProfileDetail, setFirstArrayLiveRoom } = this;
    try {
      await handlerSetToken();
      await getProfileDetail();
      await setFirstArrayLiveRoom();
    } catch (error) {
      reqChangeModalLoading(false);
      console.log(error);
    }
  }

  onChangePage = type => {
    this.setState({ page: type });
  };

  setFirstArrayLiveRoom = () => {
    const { userBid, listRoom, reqSetAllRoom } = this.props;
    const alreadyBid = _.isEmpty(userBid);
    if (alreadyBid) return null;
    const oldIndex = listRoom.indexOf(x => x.id === userBid.StoreId);
    const newIndex = 0;

    if (newIndex >= listRoom.length) {
      let k = newIndex - listRoom.length + 1;
      // eslint-disable-next-line no-plusplus
      while (k--) {
        listRoom.push(undefined);
      }
    }
    listRoom.splice(0, oldIndex, listRoom.splice(newIndex, 1)[0]);

    return reqSetAllRoom(listRoom);
  };

  getProfileDetail = async () => {
    const {
      reqGetProfile,
      reqClearListRoom,
      reqGetUserBid,
      reqGetListKey,
      reqGetUserKey,
      reqGetEndRoom,
      reqGetLiveRoom,
      reqGetWaitingRoom,
      reqChangeModalLoading,
    } = this.props;
    reqChangeModalLoading(true);
    try {
      await reqClearListRoom();
      const res = await reqGetProfile();
      if (res.success) {
        this.setState({ avatar: res.data.avatar });
      }
      await reqGetListKey();
      await reqGetUserKey();
      await reqGetUserBid();
      await reqGetLiveRoom();
      // await reqGetEndRoom();
      await reqGetWaitingRoom();
      reqChangeModalLoading(false);
    } catch (error) {
      reqChangeModalLoading(false);
    }
  };

  handlerSetToken = async () => {
    const { reqSetToken } = this.props;
    try {
      const data = await func.getProfileFromLocalStorage();
      reqSetToken(data.token);
    } catch (error) {
      console.log(error);
    }
  };

  toDetailRoom = data => {
    const { navigation } = this.props;
    navigation.navigate('RESERVATION', { id: data.id });
  };

  toBidRoom = id => {
    const { navigation } = this.props;
    navigation.navigate('BIDROOM', { id });
  };

  toLogout = () => {
    const { navigation } = this.props;
    func.clearAllDataFromLocalStorage();
    return navigation.dispatch(StackActions.replace('LOGIN'));
  };

  toEditProfile = () => {
    const { navigation } = this.props;
    navigation.navigate('EDITPROFILE');
  };

  toNotification = () => {
    const { navigation } = this.props;
    navigation.navigate('NOTIFICATION');
  };

  toCheckout = () => {
    const { navigation } = this.props;
    navigation.navigate('CHECKOUTKEY');
  };

  toCart = () => {
    const { navigation } = this.props;
    navigation.navigate('CART');
  };

  render() {
    const {
      onChangePage,
      toDetailRoom,
      getProfileDetail,
      toEditProfile,
      toBidRoom,
      toLogout,
      toNotification,
      toCheckout,
      toCart,
    } = this;
    const { page, avatar, refreshHome } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Profile
            isShow={page}
            avatar={avatar}
            toLogout={toLogout}
            toEditProfile={toEditProfile}
          />
          <Store
            isShow={page}
            getProfileDetail={getProfileDetail}
            toCheckout={toCheckout}
          />
          <Home
            toCart={toCart}
            isShow={page}
            refresh={refreshHome}
            toBidRoom={toBidRoom}
            onRefresh={getProfileDetail}
            toDetailRoom={toDetailRoom}
            toNotification={toNotification}
          />
        </View>
        <Navbar onChangePage={onChangePage} />
      </View>
    );
  }
}

MainMenu.defaultProps = {
  userBid: {},
  listRoom: [],
  reqSetToken: () => {},
  reqGetUserBid: () => {},
  reqGetListKey: () => {},
  reqGetProfile: () => {},
  reqGetUserKey: () => {},
  reqSetAllRoom: () => {},
  reqGetLiveRoom: () => {},
  reqClearListRoom: () => {},
  reqGetWaitingRoom: () => {},
  reqChangeModalLoading: () => {},
};

MainMenu.propTypes = {
  userBid: PropTypes.object,
  listRoom: PropTypes.array,
  reqSetToken: PropTypes.func,
  reqGetUserBid: PropTypes.func,
  reqGetListKey: PropTypes.func,
  reqSetAllRoom: PropTypes.func,
  reqGetProfile: PropTypes.func,
  reqGetUserKey: PropTypes.func,
  reqGetLiveRoom: PropTypes.func,
  reqClearListRoom: PropTypes.func,
  reqGetWaitingRoom: PropTypes.func,
  reqChangeModalLoading: PropTypes.func,
};

const mapStateToProps = state => ({
  userBid: state.profile.userBid,
  listRoom: state.room.listRoom,
});

const mapDispatchToProps = dispatch => ({
  reqSetToken: p => dispatch(setToken(p)),
  reqGetProfile: () => dispatch(getProfile()),
  reqSetAllRoom: p => dispatch(setAllRoom(p)),
  reqGetEndRoom: () => dispatch(getEndRoom()),
  reqGetListKey: () => dispatch(getListKey()),
  reqGetUserBid: () => dispatch(getUserBid()),
  reqGetUserKey: () => dispatch(getUserKey()),
  reqGetLiveRoom: () => dispatch(getLiveRoom()),
  reqClearListRoom: () => dispatch(clearListRoom()),
  reqGetWaitingRoom: () => dispatch(getWaitingRoom()),
  reqChangeModalLoading: p => dispatch(changeModalLoading(p)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
