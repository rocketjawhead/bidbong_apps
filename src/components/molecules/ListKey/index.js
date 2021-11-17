import { React, View, PropTypes } from 'libraries';
import { Text, Image } from 'components/atoms';
import { typeOf } from 'utils/functions/fn';
import styles from './styles';

class ListKey extends React.PureComponent {
  getImage = x => {
    switch (x) {
      case 1:
        return 'ic-wood-key';
      case 2:
        return 'ic-silver-key';
      case 3:
        return 'ic-gold-key';
      default:
        return 'ic-diamond-key';
    }
  };

  getKeyName = x => {
    switch (x) {
      case 1:
        return 'key.wood';
      case 2:
        return 'key.silver';
      case 3:
        return 'key.gold';
      default:
        return 'key.diamond';
    }
  };

  _renderListKey = () => {
    const { listKey } = this.props;
    const list = Object.keys(listKey);
    const { getImage, getKeyName } = this;
    return list.map((x, i) => (
      <View style={styles.content.key} key={i}>
        <View
          style={{
            backgroundColor: '#fff',
            width: 43,
            height: 43,
            borderRadius: 21.5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={getImage(listKey[x].keyId)}
            imgWidth={40}
            contentIcon
          />
        </View>
        <Text style={styles.text.typeKey}>{getKeyName(listKey[x].keyId)}</Text>
        <Text bold style={styles.text.totalKey} translate={false}>
          {`${listKey[x].count}x`}
        </Text>
      </View>
    ));
  };

  render() {
    return <View style={styles.container.key}>{this._renderListKey()}</View>;
  }
}

ListKey.defaultProps = {
  listKey: [],
};

ListKey.propTypes = {
  listKey: PropTypes.array,
};

export default ListKey;
