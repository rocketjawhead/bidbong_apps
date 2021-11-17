/* eslint-disable prettier/prettier */
import { StackActions } from '@react-navigation/native';
import { DashboardView, ModalActionRoom } from 'components';
import {
  changeModalLoading,
  clearListRoom,
  deleteProduct,
  deleteRoom,
  getAdminEndRoom,
  getAdminLiveRoom,
  getAdminWaitingRoom,
  getReportChart,
  setToken,
} from 'config';
import { PropTypes, React } from 'libraries';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { func } from 'utils';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: {},
    };
  }

  async componentDidMount() {
    const { handlerGetDetailDashboard, handlerSetToken } = this;
    try {
      await handlerSetToken();
      handlerGetDetailDashboard();
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * for setting token
   */
  handlerSetToken = async () => {
    const { reqSetToken } = this.props;
    try {
      const data = await func.getProfileFromLocalStorage();
      reqSetToken(data.token);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * handler for getting all data needed for dashboard admin
   */
  handlerGetDetailDashboard = async () => {
    const {
      reqClearListRoom,
      reqGetReportChart,
      reqGetAdminEndRoom,
      reqGetAdminLiveRoom,
      reqChangeModalLoading,
      reqGetAdminWaitingRoom,
    } = this.props;
    reqChangeModalLoading(true);
    await reqGetReportChart();
    await reqClearListRoom();
    await reqGetAdminLiveRoom();
    await reqGetAdminWaitingRoom();
    await reqGetAdminEndRoom();
    reqChangeModalLoading(false);
  };

  /**
   * =============================================
   * LIST OF NAVIGATION FUNCTION
   * =============================================
   */
  toLogout = () => {
    const { navigation } = this.props;
    func.clearAllDataFromLocalStorage();
    return navigation.dispatch(StackActions.replace('LOGIN'));
  };

  handlerModal = (data = '') => {
    const { visible } = this.state;
    this.setState({ visible: !visible, data });
  };

  toCreateRoom = () => {
    const { navigation } = this.props;
    navigation.navigate('CREATEPOST');
  };

  toUpdateRoom = () => {
    const { navigation } = this.props;
    const { data, visible } = this.state;
    if (visible) this.setState({ visible: false });
    navigation.navigate('CREATEPOST', { data });
  };

  toTotalRoom = () => {
    const { navigation } = this.props;
    navigation.navigate('TOTALROOM');
  };

  toTotalBid = () => {
    const { navigation } = this.props;
    navigation.navigate('TOTALBIDDER');
  };

  toManageKey = () => {
    const { navigation } = this.props;
    navigation.navigate('MANAGEKEY');
  };

  toRoom = data => {
    const { navigation } = this.props;
    navigation.navigate('DETAILBIDROOM', { data });
  };

  toManaegeShipping = () => {
    const { navigation } = this.props;
    navigation.navigate('MANAGESHIPPING');
  };

  toCreateUser = () => {
    const { navigation } = this.props;
    navigation.navigate('CREATEUSER');
  };

  /**
   * for request deleting room
   */
  handlerDeleteRoom = async () => {
    const { data } = this.state;
    const {
      reqDeleteRoom,
      reqDeteleProduct,
      reqChangeModalLoading,
      reqClearListRoom,
      reqGetAdminLiveRoom,
      reqGetAdminWaitingRoom,
      reqGetAdminEndRoom,
    } = this.props;
    this.setState({ visible: false });
    const payloadRoom = {
      url: data.id,
      body: {
        id: data.id,
      },
    };
    const payloadProduct = {
      url: data.productId,
      body: {
        id: data.productId,
      },
    };
    try {
      reqChangeModalLoading(true);
      await reqDeleteRoom(payloadRoom);
      await reqDeteleProduct(payloadProduct);
      await reqClearListRoom();
      await reqGetAdminLiveRoom();
      await reqGetAdminWaitingRoom();
      await reqGetAdminEndRoom();
      reqChangeModalLoading(false);
    } catch (error) {
      reqChangeModalLoading(false);
      console.log(error);
    }
  };

  /**
   * for rendering page
   */
  render() {
    const {
      toLogout,
      toCreateRoom,
      toTotalRoom,
      toTotalBid,
      toManageKey,
      toRoom,
      toManaegeShipping,
      toCreateUser,
      handlerModal,
      handlerDeleteRoom,
      toUpdateRoom,
    } = this;
    const { listRoom, dataChart } = this.props;
    const { visible, data } = this.state;
    return (
      <Fragment>
        <DashboardView
          dataChart={dataChart}
          toLogout={toLogout}
          listRoom={listRoom}
          toTotalBid={toTotalBid}
          toTotalRoom={toTotalRoom}
          toCreateRoom={toCreateRoom}
          toManaegeShipping={toManaegeShipping}
          toManageKey={toManageKey}
          toRoom={toRoom}
          toCreateUser={toCreateUser}
          handlerModal={handlerModal}
        />
        <ModalActionRoom
          visible={visible}
          onPress={handlerModal}
          onPressTop={toUpdateRoom}
          onPressBottom={handlerDeleteRoom}
        />
      </Fragment>
    );
  }
}

Dashboard.defatulProps = {
  listRoom: [],
  dataChart: {},
  reqSetToken: () => {},
  reqDeleteRoom: () => {},
  reqClearListRoom: () => {},
  reqDeteleProduct: () => {},
  reqGetReportChart: () => {},
  reqGetAdminEndRoom: () => {},
  reqGetAdminLiveRoom: () => {},
  reqChangeModalLoading: () => {},
  reqGetAdminWaitingRoom: () => {},
};

Dashboard.propTypes = {
  listRoom: PropTypes.array,
  dataChart: PropTypes.object,
  reqSetToken: PropTypes.func,
  reqDeleteRoom: PropTypes.func,
  reqClearListRoom: PropTypes.func,
  reqDeteleProduct: PropTypes.func,
  reqGetReportChart: PropTypes.func,
  reqGetAdminEndRoom: PropTypes.func,
  reqGetAdminLiveRoom: PropTypes.func,
  reqChangeModalLoading: PropTypes.func,
  reqGetAdminWaitingRoom: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  listRoom: state.room.listRoom,
  dataChart: state.bidding.dataChart,
});

const mapDispatchToProps = dispatch => ({
  reqSetToken: p => dispatch(setToken(p)),
  reqDeleteRoom: p => dispatch(deleteRoom(p)),
  reqDeteleProduct: p => dispatch(deleteProduct(p)),
  reqClearListRoom: () => dispatch(clearListRoom()),
  reqGetReportChart: () => dispatch(getReportChart()),
  reqGetAdminEndRoom: () => dispatch(getAdminEndRoom()),
  reqGetAdminLiveRoom: () => dispatch(getAdminLiveRoom()),
  reqChangeModalLoading: p => dispatch(changeModalLoading(p)),
  reqGetAdminWaitingRoom: () => dispatch(getAdminWaitingRoom()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
