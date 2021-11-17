import { React, View, PropTypes } from 'libraries';
import { ManageKeyView } from 'components';
import { connect } from 'react-redux';
import {
  getKey,
  updateKey,
  createKey,
  changeModalLoading,
  setPopUp,
} from 'config';
import styles from './styles';

class ManageKey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listKey: [],
      id: '',
      price: '',
    };
  }

  componentDidMount() {
    const { handlerGetKey } = this;
    handlerGetKey();
  }

  /**
   * for request get data key
   */
  handlerGetKey = async () => {
    const { reqGetKey } = this.props;

    try {
      const res = await reqGetKey();
      this.setState({ listKey: res.data });
    } catch (error) {
      console.log('error', error);
    }
  };

  /**
   * for request update key
   */
  handlerUpdateKey = async () => {
    const { price, id } = this.state;
    const { reqUpdateKey, reqChangeModalLoading, reqSetPopup } = this.props;
    const { handlerGetKey } = this;
    try {
      const payload = {
        body: {
          price,
          id,
        },
      };
      await reqChangeModalLoading(true);
      await reqUpdateKey(payload);
      await handlerGetKey();
      await reqChangeModalLoading(false);
      await reqSetPopup({});
    } catch {
      reqChangeModalLoading(false);
      reqSetPopup({
        isShow: true,
      });
    }
  };

  /**
   * for change price
   * @param {*} price
   * @param {*} type
   */
  onChangePrice = (price, type) => {
    this.setState({ id: type, price });
  };

  render() {
    const { listKey, id, price } = this.state;
    const { onChangePrice, handlerUpdateKey } = this;
    return (
      <ManageKeyView
        listKey={listKey}
        id={id}
        price={price}
        onChangePrice={onChangePrice}
        handlerUpdateKey={handlerUpdateKey}
      />
    );
  }
}

ManageKey.defaultProps = {
  reqGetKey: () => {},
  reqSetPopup: () => {},
  reqUpdateKey: () => {},
  reqChangeModalLoading: () => {},
};

ManageKey.propTypes = {
  reqGetKey: PropTypes.func,
  reqSetPopup: PropTypes.func,
  reqUpdateKey: PropTypes.func,
  reqChangeModalLoading: PropTypes.func,
};

const mapStateToProps = state => ({
  allState: state,
  listKey: state.keyRoom.list,
});

const mapDispatchToProps = dispatch => ({
  reqGetKey: () => dispatch(getKey()),
  reqSetPopup: p => dispatch(setPopUp(p)),
  reqUpdateKey: p => dispatch(updateKey(p)),
  reqChangeModalLoading: p => dispatch(changeModalLoading(p)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageKey);
