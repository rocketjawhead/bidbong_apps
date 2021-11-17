/* eslint-disable eqeqeq */
/* eslint-disable import/no-cycle */
import {
  SafeAreaView,
  React,
  ScrollView,
  View,
  TouchableOpacity,
  PropTypes,
} from 'libraries';
import {Text, NavigationHeader, Input, Price} from 'components';
import styles from './styles';

class ManageKeyView extends React.Component {
  _renderListKey = () => {
    const {listKey, id, price, onChangePrice, handlerUpdateKey} = this.props;
    return listKey.map((x, i) => {
      const isActive = x.id == id && price;
      const isValue = x.id == id ? price : null;
      return (
        <View style={styles.card} key={i}>
          <View style={styles.header}>
            <View style={styles.square}>
              <Text translate={false} style={styles.number}>
                {x.id}
              </Text>
            </View>
            <Text style={styles.key} translate={false}>
              {x.name}
            </Text>
          </View>
          <View style={styles.content}>
            <Price
              theme="green"
              title="component.currentPrice"
              titleBold
              titleStyle={styles.currentPrice}
              amount={x.price}
            />
            <Input
              isIcon
              type={x.id}
              typeIcon="Fontisto"
              leftIcon="euro"
              value={isValue}
              onChangeText={onChangePrice}
              containerStyle={styles.input}
              translatePlaceholder={false}
              label="manageKey.input.price"
              labelStyle={styles.labelStyle}
            />
          </View>
          {isActive ? (
            <TouchableOpacity style={styles.button} onPress={handlerUpdateKey}>
              <Text style={styles.txtSave}>manageKey.button.save</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      );
    });
  };

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <NavigationHeader />
            <Text h2 style={styles.title}>
              manageKey.title
            </Text>
            {this._renderListKey()}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

ManageKeyView.defaultProps = {
  id: '',
  price: '',
  listKey: [],
  onChangePrice: () => {},
  handlerUpdateKey: () => {},
};

ManageKeyView.propTypes = {
  id: PropTypes.string,
  price: PropTypes.string,
  listKey: PropTypes.array,
  onChangePrice: PropTypes.func,
  handlerUpdateKey: PropTypes.func,
};

export default ManageKeyView;
