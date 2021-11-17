import {React, View, PropTypes, TouchableOpacity} from 'libraries';
import {Image, Text} from 'components/atoms';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';

const _renderTitle = title => {
  if (title) {
    return (
      <Text h3 style={styles.text}>
        {title}
      </Text>
    );
  }

  return null;
};

const NavigationHeaderAdmin = ({title, icon, onPress}) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        style={styles.content}
        onPress={() => navigation.goBack()}>
        <Icon name={icon} style={styles.icon} />
      </TouchableOpacity>
      {_renderTitle(title)}
    </View>
  );
};

NavigationHeaderAdmin.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  onPress: PropTypes.func,
};

NavigationHeaderAdmin.defaultProps = {
  icon: '',
  title: '',
  onPress: () => {},
};

export default NavigationHeaderAdmin;
