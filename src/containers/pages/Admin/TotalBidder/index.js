import { React, PropTypes } from 'libraries';
import { TotalBidderView } from 'components';
import { connect } from 'react-redux';
import { getListBidder, getLastwinner } from 'config';
import styles from './styles';

class TotalBidder extends React.Component {
  async componentDidMount() {
    const { reqGetListBidder, reqGetLastwinner } = this.props;
    reqGetListBidder();
    reqGetLastwinner();
  }

  render() {
    const { listBidder, lastWinner } = this.props;
    const totalListBidder = listBidder.length;
    const totalLastWinner = lastWinner.length;
    return (
      <TotalBidderView
        lastWinner={lastWinner}
        listBidder={listBidder}
        totalLastWinner={totalLastWinner}
        totalListBidder={totalListBidder}
      />
    );
  }
}

TotalBidder.defaultProps = {
  listBidder: [],
  lastWinner: [],
  reqGetListBidder: () => {},
  reqGetLastwinner: () => {},
};

TotalBidder.propTypes = {
  listBidder: PropTypes.array,
  lastWinner: PropTypes.array,
  reqGetListBidder: PropTypes.func,
  reqGetLastwinner: PropTypes.func,
};

const mapStateToProps = state => ({
  lastWinner: state.bidding.lastWinner,
  listBidder: state.bidding.listBidder,
});

const mapDispatchToProps = dispatch => ({
  reqGetListBidder: () => dispatch(getListBidder()),
  reqGetLastwinner: () => dispatch(getLastwinner()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TotalBidder);
