import { useNavigation } from '@react-navigation/native';
import { Animated, PropTypes, React, View } from 'libraries';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';
import styles from './styles';

const NavigationBar = ({
  title,
  onPress,
  height,
  backgroundColor,
  padding,
  withoutIcon,
}) => {
  const navigation = useNavigation();
  return (
    <Animated.View style={[styles.container, { height }]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Animated.View style={{ marginTop: padding }}>
          {withoutIcon ? null : (
            <Icon name="chevron-left" style={[styles.icon]} />
          )}
        </Animated.View>
      </TouchableOpacity>
      <Animated.Text style={[styles.text, { color: backgroundColor }]}>
        {title}
      </Animated.Text>
      <View />
    </Animated.View>
  );
};

NavigationBar.defaultProps = {
  title: 'header',
  height: 0,
  padding: 0,
  withoutIcon: false,
  backgroundColor: '',
  onPress: () => {},
};

NavigationBar.propTypes = {
  title: PropTypes.string,
  height: PropTypes.any,
  padding: PropTypes.any,
  withoutIcon: PropTypes.bool,
  backgroundColor: PropTypes.any,
  onPress: PropTypes.func,
};

export default React.memo(NavigationBar);
