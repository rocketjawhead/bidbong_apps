import {React, View, TouchableOpacity, PropTypes} from 'libraries';
// eslint-disable-next-line import/no-cycle
import {Text, Image} from 'components';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './styles';

class CardProfile extends React.Component {
  render() {
    const {logout} = this.props;
    return (
      <View style={styles.container.main}>
        <Image
          source="img-banner-profile"
          style={styles.img}
          resizeMode="stretch"
          imageBackground>
          <Text style={styles.text.totalWin}>profile.text.totalWin</Text>
          <Text bold style={styles.text.amount} translate={false}>
            12
          </Text>
        </Image>
        <View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text.title}>profile.text.tandc</Text>
            <Entypo name="chevron-right" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text.title}>profile.text.help</Text>
            <Entypo name="chevron-right" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={logout}>
            <Text style={styles.text.logout}>profile.button.logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

CardProfile.defaultProps = {
  logout: () => {},
};

CardProfile.propTypes = {
  logout: PropTypes.func,
};

export default CardProfile;
