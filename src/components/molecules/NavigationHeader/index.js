import { React, View, PropTypes, TouchableOpacity } from 'libraries';
import { Text } from 'components/atoms';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const NavigationHeader = ({ bold, title }) => {
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity
        style={styles.content}
        onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" style={styles.icon} />
      </TouchableOpacity>
      {title ? (
        <Text bold={bold} style={styles.text}>
          {title}
        </Text>
      ) : null}
    </View>
  );
};

NavigationHeader.defaultProps = {
  bold: false,
  title: '',
};

NavigationHeader.propTypes = {
  bold: PropTypes.bool,
  title: PropTypes.string,
};

export default React.memo(NavigationHeader);
