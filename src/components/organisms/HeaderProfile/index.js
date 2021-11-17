import {React, View, TouchableOpacity, PropTypes} from 'libraries';
import {Text, Image} from 'components/atoms';
import styles from './styles';

class HeaderProfile extends React.Component {
  render() {
    const {onPress, profile, openCamera, uri} = this.props;
    return (
      <View>
        <View style={styles.navbar}>
          <Text bold style={styles.text.titlePage}>
            profile.title
          </Text>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.text.editProfile}>profile.subtitle</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container.profile}>
          <TouchableOpacity onPress={openCamera}>
            <Image source={{uri}} style={styles.img} />
          </TouchableOpacity>
          <Text bold style={styles.text.name} translate={false}>
            {`${profile.first} ${profile.last}`}
          </Text>
          <Text style={styles.text.email} translate={false}>
            {`${profile.email}`}
          </Text>
        </View>
      </View>
    );
  }
}

HeaderProfile.defaultProps = {
  uri: '',
  profile: {},
  onPress: () => {},
  openCamera: () => {},
};

HeaderProfile.propTypes = {
  uri: PropTypes.string,
  profile: PropTypes.object,
  onPress: PropTypes.func,
  openCamera: PropTypes.func,
};

export default HeaderProfile;
