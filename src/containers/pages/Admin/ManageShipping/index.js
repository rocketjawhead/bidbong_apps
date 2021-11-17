import { React, PropTypes } from 'libraries';
import { ManageShippingView } from 'components';
import { connect } from 'react-redux';
import {
  getShipping,
  updateShipping,
  changeModalLoading,
  setPopUp,
  getCountries,
  getSearchCountry,
} from 'config';

class ManageShipping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      price: '',
      search: false,
      totalPage: 0,
      currentPage: 1,
      searchCountry: '',
      searchListShipping: [],
    };
  }

  componentDidMount() {
    const { handlerGetShipping } = this;
    const { getCountries } = this.props;
    // getCountries();
    handlerGetShipping();
  }

  /**
   * for delete all data on state
   */
  cleareState = () => {
    this.setState({ id: '', price: '' });
  };

  /**
   * for getting list of country and price delivery
   * @param {} newPage
   * @param {*} type
   */
  handlerGetShipping = async (newPage = 0, type = 'next') => {
    const { reqGetShipping, reqChangeModalLoading, reqSetPopup } = this.props;
    const { currentPage } = this.state;
    try {
      await reqChangeModalLoading(true);
      const typePage =
        type === 'next' ? currentPage + newPage : currentPage - newPage;
      const page = newPage ? typePage : currentPage;
      const response = await reqGetShipping({ url: page });
      if (response.success) {
        this.setState({ totalPage: response.data.pages, currentPage: page });
      }
      await reqChangeModalLoading(false);
    } catch (error) {
      await reqChangeModalLoading(false);
      reqSetPopup({
        isShow: true,
        leftButtonTitle: 'popup.button.ok',
      });
    }
  };

  /**
   * for request update shipping price
   */
  handlerUpdateShipping = async () => {
    const { price, id } = this.state;
    const { cleareState, handlerGetShipping } = this;
    const {
      reqUpdateShipping,
      reqChangeModalLoading,
      reqSetPopup,
    } = this.props;
    try {
      const payload = {
        body: {
          price,
          id,
        },
      };
      await reqChangeModalLoading(true);
      await reqUpdateShipping(payload);
      cleareState();
      await handlerGetShipping();
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
   * @param {} price
   * @param {*} type
   */
  onChangePrice = (price, type) => {
    this.setState({ id: type, price });
  };

  /**
   * for change input search
   * @param {*} v
   */
  onChangeText = v => {
    const { searchCountry } = this.state;
    if (searchCountry.length > 0) return this.setState({ searchCountry: v });
    return this.setState({ searchCountry: v, search: false });
  };

  /**
   * for request search shipping by country
   */
  handlerSearchCountry = async () => {
    const { searchCountry } = this.state;
    const { reqGetSearchCountry } = this.props;
    try {
      const payload = {
        url: searchCountry,
      };
      const res = await reqGetSearchCountry(payload);
      if (res.success) {
        if (res.data.length > 0) {
          return this.setState({ searchListShipping: res.data, search: true });
        }
        return this.setState({ searchListShipping: [], search: true });
      }
    } catch {
      this.setState({ search: false });
    }
  };

  /**
   * for rendering page
   */
  render() {
    const {
      id,
      price,
      totalPage,
      currentPage,
      searchCountry,
      search,
      searchListShipping,
    } = this.state;
    const {
      onChangePrice,
      handlerUpdateShipping,
      handlerGetShipping,
      onChangeText,
      handlerSearchCountry,
    } = this;
    const { shipping } = this.props;
    const listShipping = search ? searchListShipping : shipping;
    return (
      <ManageShippingView
        id={id}
        price={price}
        totalPage={totalPage}
        searchMode={search}
        currentPage={currentPage}
        listShipping={listShipping}
        onChangePrice={onChangePrice}
        searchShipping={searchCountry}
        onChangeText={onChangeText}
        handlerGetShipping={handlerGetShipping}
        handlerSearchCountry={handlerSearchCountry}
        handlerUpdateShipping={handlerUpdateShipping}
      />
    );
  }
}

ManageShipping.defaultProps = {
  shipping: [],
  reqSetPopup: () => {},
  reqGetShipping: () => {},
  reqUpdateShipping: () => {},
  reqGetSearchCountry: () => {},
  reqChangeModalLoading: () => {},
};

ManageShipping.propTypes = {
  shipping: PropTypes.array,
  reqSetPopup: PropTypes.func,
  reqGetShipping: PropTypes.func,
  reqUpdateShipping: PropTypes.func,
  reqGetSearchCountry: PropTypes.func,
  reqChangeModalLoading: PropTypes.func,
};

const mapStateToProps = state => ({
  allState: state,
  listKey: state.keyRoom.list,
  shipping: state.shipping.shippingList,
});

const mapDispatchToProps = dispatch => ({
  reqSetPopup: p => dispatch(setPopUp(p)),
  reqUpdateShipping: p => dispatch(updateShipping(p)),
  reqGetShipping: p => dispatch(getShipping(p)),
  reqChangeModalLoading: p => dispatch(changeModalLoading(p)),
  getCountries: () => dispatch(getCountries()),
  reqGetSearchCountry: p => dispatch(getSearchCountry(p)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageShipping);
