/* eslint-disable camelcase */
import { React, View, SafeAreaView, PropTypes } from 'libraries';
import { StatusBidView } from 'components';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';

import styles from './styles';

class StatusBid extends React.Component {
  state = {
    isWinner: false,
  };

  componentDidMount() {
    const { getTheWinner } = this;
    getTheWinner();
  }

  /**
   * fot getting bidder winner
   */
  getTheWinner = () => {
    const { detailRoom, profile } = this.props;
    const isWinner = detailRoom.winner[0].id === profile.id;
    this.setState({ isWinner });
  };

  /**
   * function for navigation to main manu
   */
  handlerNavigation = () => {
    const { isWinner } = this.state;
    const { navigation } = this.props;
    if (isWinner)
      return navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'MAINMENU' }, { name: 'CART' }],
        }),
      );
    return navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'MAINMENU' }],
      }),
    );
  };

  render() {
    const { detailRoom } = this.props;
    const { isWinner } = this.state;
    const { handlerNavigation } = this;
    if (detailRoom) {
      const { product_name, winner_price } = detailRoom;
      return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
          <StatusBidView
            isWinner={isWinner}
            productName={product_name}
            winnerPrice={winner_price}
            onPress={handlerNavigation}
          />
        </SafeAreaView>
      );
    }
    return null;
  }
}

StatusBid.defaultProps = {
  profile: {},
  detailRoom: {},
};
StatusBid.propTypes = {
  profile: PropTypes.object,
  detailRoom: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
  profile: state.auth.profile,
  detailRoom: props.route.params.data,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StatusBid);
