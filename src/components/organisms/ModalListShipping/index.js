/* eslint-disable react/no-did-update-set-state */
/* eslint-disable import/no-cycle */
/* eslint-disable prefer-destructuring */
import {
  React,
  Modal,
  PropTypes,
  View,
  TouchableOpacity,
  FlatList,
} from 'libraries';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Text, Input, Button } from 'components';
import _ from 'lodash';
import styles from './styles';

class ModalListShipping extends React.PureComponent {
  state = {
    selected: 0,
    listShipping: [],
    search: '',
  };

  componentDidMount() {
    const { listShipping } = this.props;
    console.log('listShipping', listShipping);
    this.setState({ listShipping });
  }

  componentDidUpdate(prevProps) {
    const { listShipping } = this.props;
    if (prevProps.listShipping !== listShipping) {
      this.setState({ listShipping });
    }
  }

  handleChange = index => {
    this.setState({ selected: index });
  };

  handleSearch = text => {
    const { listShipping } = this.props;
    const newData = listShipping.filter(item => {
      const itemData = `${item.country.toUpperCase()}   
      ${item.country.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    this.setState({ listShipping: newData, search: text });
  };

  contains = (list, query) => {
    const { country } = list;
    if (country.includes(query)) {
      return true;
    }
    return false;
  };

  _renderCardCountry = ({ item }) => {
    const { selected } = this.state;
    const isActive = item.id === selected;
    return (
      <TouchableOpacity
        style={styles.buttonCountry(isActive)}
        onPress={() => this.handleChange(item.id)}>
        <Text
          style={styles.textCountry(isActive)}
          translate={false}
          numberOfLines={1}>
          {item.country}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { visible, onPress, reqClose } = this.props;
    const { selected, listShipping, search } = this.state;
    return (
      <Modal animationType="slide" transparent visible={visible}>
        <View style={styles.background}>
          <View style={styles.container.main}>
            <View style={styles.container.header}>
              <TouchableOpacity onPress={reqClose}>
                <AntDesign name="close" style={styles.icon.close} />
              </TouchableOpacity>
              <Text bold style={styles.text.header}>
                checkout.modal.shipping
              </Text>
            </View>
            <Input
              isIcon
              containerStyle={styles.inputSearch}
              placeholder="manageShipping.input.search"
              rightIcon="search1"
              onChangeText={this.handleSearch}
              value={search}
              noBorder
              iconRightStyle={styles.iconSearch}
              // onSubmit={handlerSearchCountry}
              go
            />
            <FlatList
              data={listShipping}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={this._renderCardCountry}
            />
            <View style={{ marginTop: 50, margin: 12 }}>
              <Button
                title="checkout.button.select"
                onPress={() => onPress(selected)}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

ModalListShipping.defaultProps = {
  visible: false,
  listShipping: [],
  onPress: () => {},
  reqClose: () => {},
  onPressTop: () => {},
};

ModalListShipping.propTypes = {
  visible: PropTypes.bool,
  onPress: PropTypes.func,
  reqClose: PropTypes.func,
  onPressTop: PropTypes.func,
  listShipping: PropTypes.array,
};

export default ModalListShipping;
