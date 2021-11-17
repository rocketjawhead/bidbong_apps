import { React, Fragment, PropTypes } from 'libraries';
import {
  DetailBidRoomView,
  ModalBidderWinner,
  ModalChooseAction,
  ModalListBidder,
} from 'components';
import {
  setPopUp,
  clearListRoom,
  setWinnerBidder,
  getAdminEndRoom,
  getAdminLiveRoom,
  updateStatusOrder,
  changeModalLoading,
  getDetailAdminRoom,
  getAdminWaitingRoom,
} from 'config';
import { connect } from 'react-redux';
import moment from 'moment';

class DetailBidRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bidderVisible: false,
      modalVisible: false,
      modalVisibleAction: false,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      statusRoom: '',
      selectedUser: {},
      listBidder: [],
      awbNumber: '',
      courierName: '',
    };
    this.interval = null;
  }

  async componentDidMount() {
    const { countdown, handlerGetDetailRoom } = this;
    const { statusRoom } = this.props;
    this.setState({ statusRoom });
    await handlerGetDetailRoom();
    if (statusRoom !== 'end') countdown();
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  /**
   * for clear timer
   */
  clearTimer = () => {
    clearInterval(this.interval);
    this.interval = null;
  };

  /**
   * for setting countdown
   */
  countdown = () => {
    const { detailRoom, statusRoom } = this.props;
    this.interval = setInterval(() => {
      const isWaiting = statusRoom === 'waiting';
      const date1 = moment()
        .utc('+0200')
        .format('x');
      const date2 = isWaiting
        ? new Date(detailRoom.startBid)
        : new Date(detailRoom.endBid);
      const difference1 = date2.getTime() - date1;
      return this.setState({
        days: moment.duration(difference1).get('days'),
        hours: moment.duration(difference1).get('hours'),
        minutes: moment.duration(difference1).get('minutes'),
        seconds: moment.duration(difference1).get('seconds'),
      });
    }, 1000);
  };

  /**
   * function for sorting bidder from highes bidding
   * @param {*} property
   * @param {*} order
   */
  sortingBidder = (property, order) => {
    let sortOrder = 1;
    if (order === 'desc') {
      sortOrder = -1;
    }
    return function(a, b) {
      // a should come before b in the sorted order
      if (a[property] < b[property]) {
        return -1 * sortOrder;
        // a should come after b in the sorted order
      }
      if (a[property] > b[property]) {
        return 1 * sortOrder;
        // a and b are the same
      }
      return 0 * sortOrder;
    };
  };

  /**
   * =============================
   * HANLDER SHOW MODAL
   * =============================
   */
  handlerShowModal = () => {
    const { modalVisible } = this.state;
    this.setState({ modalVisible: !modalVisible });
  };

  handlerShowModalAction = x => {
    const { modalVisibleAction } = this.state;
    this.setState({ modalVisibleAction: !modalVisibleAction, selectedUser: x });
  };

  handlerAllModal = () => {
    const { modalVisibleAction, modalVisible } = this.state;
    this.setState({
      modalVisibleAction: !modalVisibleAction,
      modalVisible: !modalVisible,
    });
  };

  handlerShowModalBidder = () => {
    const { bidderVisible } = this.state;
    this.setState({ bidderVisible: !bidderVisible });
  };

  /**
   * for getting data detail room
   */
  handlerGetDetailRoom = async () => {
    const { reqGetDetailAdminRoom, roomId } = this.props;
    const { handlerListBidder } = this;
    const payload = {
      url: roomId,
    };
    await reqGetDetailAdminRoom(payload);
    return handlerListBidder();
  };

  /**
   * for getting list bidder and set to state
   */
  handlerListBidder = () => {
    const { detailRoom } = this.props;
    const fixList = detailRoom.listBidders.sort(
      this.sortingBidder('nominal', 'desc'),
    );
    this.setState({ listBidder: fixList });
  };

  /**
   * function for request winner of bidder
   */
  handlerSetWinner = async () => {
    const {
      reqSetWinnerBidder,
      reqChangeModalLoading,
      detailRoom,
      reqSetPopup,
    } = this.props;
    const { handlerGetDetailRoom, handlerUpdateListRoom } = this;
    const { selectedUser } = this.state;
    const payload = {
      body: {
        id: detailRoom.id,
        userId: selectedUser.buyerId,
      },
    };
    try {
      this.handlerShowModal();
      reqChangeModalLoading(true);
      await reqSetWinnerBidder(payload);
      await handlerGetDetailRoom();
      this.setState({ statusRoom: 'end' });
      handlerUpdateListRoom(detailRoom.id);
      reqChangeModalLoading(false);
    } catch (err) {
      reqChangeModalLoading(false);
      console.log(err);
      reqSetPopup({
        isShow: true,
      });
    }
  };

  /**
   * for updating list room
   */
  handlerUpdateListRoom = async () => {
    const {
      reqClearListRoom,
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
   * funcrion for request update payment confirmation
   * @param {} status
   */
  handlerPaymentConfirmation = async status => {
    const { detailRoom, reqUpdateStatusOrder, reqSetPopup } = this.props;
    const { awbNumber, courierName } = this.state;
    const { id } = detailRoom.winner[0];
    let payload = {};
    if (status === 31) {
      payload = {
        body: {
          id,
          status,
          tracking_code: awbNumber,
          courier_name: courierName,
        },
      };
    } else {
      payload = {
        body: {
          id,
          status,
        },
      };
    }
    try {
      await reqUpdateStatusOrder(payload);
      await this.handlerGetDetailRoom();
    } catch (err) {
      reqSetPopup();
    }
  };

  /**
   * for rendering page
   */
  render() {
    const {
      handlerShowModal,
      handlerShowModalAction,
      handlerAllModal,
      handlerSetWinner,
      handlerShowModalBidder,
      handlerPaymentConfirmation,
    } = this;

    const {
      modalVisible,
      modalVisibleAction,
      hours,
      minutes,
      days,
      seconds,
      bidderVisible,
      listBidder,
      awbNumber,
      courierName,
    } = this.state;

    const { detailRoom } = this.props;
    const { selectedUser, statusRoom } = this.state;
    return (
      <Fragment>
        <DetailBidRoomView
          handlerShowModal={handlerShowModalAction}
          detailRoom={detailRoom}
          statusRoom={statusRoom}
          handlerShowModalBidder={handlerShowModalBidder}
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          listBidder={listBidder}
          handlerPaymentConfirmation={handlerPaymentConfirmation}
          // send awb
          onChangeAWB={value => this.setState({ awbNumber: value })}
          onChangeCourierName={value => this.setState({ courierName: value })}
        />
        <ModalChooseAction
          visible={modalVisibleAction}
          onPress={handlerShowModalAction}
          onPressTop={handlerAllModal}
        />
        <ModalListBidder
          visible={bidderVisible}
          closeModal={handlerShowModalBidder}
          transaction={detailRoom.listBidders}
          statusRoom={statusRoom}
          isAdmin
        />
        <ModalBidderWinner
          data={selectedUser}
          visible={modalVisible}
          onPress={handlerSetWinner}
          reqClose={handlerShowModal}
        />
      </Fragment>
    );
  }
}

DetailBidRoom.defaultProps = {
  roomId: 0,
  statusRoom: 'null',
  detailRoom: {},
  reqSetPopup: () => {},
  reqClearListRoom: () => {},
  reqGetAdminEndRoom: () => {},
  reqSetWinnerBidder: () => {},
  reqGetAdminLiveRoom: () => {},
  reqUpdateStatusOrder: () => {},
  reqChangeModalLoading: () => {},
  reqGetDetailAdminRoom: () => {},
  reqGetAdminWaitingRoom: () => {},
};

DetailBidRoom.propTypes = {
  roomId: PropTypes.number,
  statusRoom: PropTypes.string,
  detailRoom: PropTypes.object,
  reqSetPopup: PropTypes.func,
  reqSetWinnerBidder: PropTypes.func,
  reqGetAdminEndRoom: PropTypes.func,
  reqGetAdminLiveRoom: PropTypes.func,
  reqUpdateStatusOrder: PropTypes.func,
  reqChangeModalLoading: PropTypes.func,
  reqGetDetailAdminRoom: PropTypes.func,
  reqGetAdminWaitingRoom: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  roomId: props.route.params.data.id,
  listRoom: state.room.listRoom,
  statusRoom: props.route.params.data.statusRoom,
  detailRoom: state.room.detailRoom,
});

const mapDispatchToProps = dispatch => ({
  reqSetPopup: p => dispatch(setPopUp(p)),
  reqClearListRoom: () => dispatch(clearListRoom()),
  reqSetWinnerBidder: p => dispatch(setWinnerBidder(p)),
  reqGetAdminEndRoom: () => dispatch(getAdminEndRoom()),
  reqGetAdminLiveRoom: () => dispatch(getAdminLiveRoom()),
  reqUpdateStatusOrder: p => dispatch(updateStatusOrder(p)),
  reqChangeModalLoading: p => dispatch(changeModalLoading(p)),
  reqGetDetailAdminRoom: p => dispatch(getDetailAdminRoom(p)),
  reqGetAdminWaitingRoom: () => dispatch(getAdminWaitingRoom()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailBidRoom);
