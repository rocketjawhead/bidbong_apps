import {React, View, PropTypes} from 'libraries';
import {Text, Image} from 'components/atoms';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from './styles';

const ListAccount = ({onPressAction, data, keyId}) => (
  <View style={styles.container} key={keyId}>
    <View style={styles.header}>
      <View style={styles.square}>
        <Text translate={false}>{keyId + 1}</Text>
      </View>
      <View style={styles.contentIcon}>
        <TouchableOpacity onPress={() => onPressAction('edit', data)}>
          <Image
            contentIcon
            source="ic-edit"
            style={styles.iconAction}
            imgWidth={25}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressAction('delete', data)}>
          <Image
            contentIcon
            source="ic-trash"
            style={styles.iconAction}
            imgWidth={25}
          />
        </TouchableOpacity>
      </View>
    </View>
    <View>
      <View style={styles.containField}>
        <Text style={styles.titleField}>AdminAccount.text.fullname</Text>
        <Text translate={false}>{`${data.first} ${data.last}`}</Text>
      </View>
      <View style={styles.containField}>
        <Text style={styles.titleField}>AdminAccount.text.email</Text>
        <Text translate={false}>{`${data.email}`}</Text>
      </View>
      <View style={styles.containField}>
        <Text style={styles.titleField}>AdminAccount.text.phonenumber</Text>
        <Text translate={false}>{`${data.phone}`}</Text>
      </View>
    </View>
  </View>
);

ListAccount.defaultProps = {
  keyId: 0,
  data: {},
  onPressAction: () => {},
};

ListAccount.propTypes = {
  keyId: PropTypes.number,
  data: PropTypes.object,
  onPressAction: PropTypes.func,
};

export default React.memo(ListAccount);
