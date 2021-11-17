import { React, View, PropTypes, TouchableOpacity } from 'libraries';
import { Text, Image } from 'components/atoms';
import styles from './styles';
import ListKey from '../ListKey';

class HeaderHome extends React.PureComponent {
  render() {
    const { toNotification, listKey, toCart } = this.props;
    return (
      <View style={styles.container.main}>
        <View style={styles.content.welcome}>
          <View>
            <Text bold style={styles.textHeader}>
              home.title
            </Text>
            <Text light style={styles.textHeader}>
              home.subtitle
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={toCart}>
              <Image
                source="ic-cart"
                contentIcon
                imgWidth={36}
                style={{ marginRight: 25 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={toNotification}>
              <Image source="ic-notif" contentIcon imgWidth={36} />
            </TouchableOpacity>
          </View>
        </View>
        <ListKey listKey={listKey} />
      </View>
    );
  }
}

HeaderHome.defaultProps = {
  listKey: [],
  toCart: () => {},
  toNotification: () => {},
};

HeaderHome.propTypes = {
  toCart: PropTypes.func,
  listKey: PropTypes.array,
  toNotification: PropTypes.func,
};

export default HeaderHome;
