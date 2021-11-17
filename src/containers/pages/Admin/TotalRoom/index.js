import { React, View, PropTypes } from 'libraries';
import { TotalRoomView } from 'components';
import { connect } from 'react-redux';
import styles from './styles';

class TotalRoom extends React.Component {
  render() {
    const { listRoom } = this.props;
    return <TotalRoomView listRoom={listRoom} />;
  }
}

TotalRoom.defaultProps = {
  listRoom: [],
};

TotalRoom.propTypes = {
  listRoom: PropTypes.array,
};

const mapStateToProps = state => ({
  listRoom: state.room.listRoom,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TotalRoom);
